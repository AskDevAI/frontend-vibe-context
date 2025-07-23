import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, successResponse, errorResponse, supabaseAdmin, generateApiKey } from '@/lib/server-auth';
import { ApiKeyRecord, ApiKeyResponse, ApiKeyCreateRequest, ApiKeyWithSecret, MAX_API_KEYS_PER_USER, QUOTA_LIMITS } from '@/lib/server-types';

// GET /api/v1/users/me/api-keys - List user's API keys
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Get all API keys for the user
    const { data: apiKeys, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return errorResponse('Failed to retrieve API keys', 500);
    }

    if (!apiKeys || apiKeys.length === 0) {
      return successResponse([]);
    }

    // Get 30-day rolling window for usage calculation
    const thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));

    // Get total user usage across all API keys in the last 30 days
    const { count: totalUserUsage } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // Get user quota from profile
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('monthly_quota')
      .eq('id', user.id)
      .single();

    const userQuotaLimit = profile?.monthly_quota || 100;

    // Calculate real-time individual key usage for display only
    const responseData: ApiKeyResponse[] = await Promise.all(
      apiKeys.map(async (key: ApiKeyRecord) => {
        // Get usage count for this API key in the last 30 days (for individual tracking)
        const { count: keyUsageCount } = await supabaseAdmin
          .from('usage_log')
          .select('*', { count: 'exact', head: true })
          .eq('api_key_hash', key.key_hash)
          .gte('created_at', thirtyDaysAgo.toISOString());

        return {
          id: key.id,
          key_prefix: key.key_prefix,
          name: key.name,
          is_active: key.is_active,
          quota_limit: userQuotaLimit, // User-level quota, not per-key
          quota_used: totalUserUsage || 0, // Total user usage, not per-key
          individual_usage: keyUsageCount || 0, // Individual key usage for reference
          quota_reset_at: key.quota_reset_at,
          created_at: key.created_at,
          last_used_at: key.last_used_at,
        };
      })
    );

    return successResponse(responseData);
  } catch (error) {
    console.error('Error listing API keys:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}

// POST /api/v1/users/me/api-keys - Create new API key
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Parse request body
    const body: ApiKeyCreateRequest = await request.json();
    
    // Check if user already has maximum number of API keys
    const { count, error: countError } = await supabaseAdmin
      .from('api_keys')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (countError) {
      console.error('Error checking API key count:', countError);
      return errorResponse('Failed to validate API key limit', 500);
    }

    if (count && count >= MAX_API_KEYS_PER_USER) {
      return errorResponse(`Maximum of ${MAX_API_KEYS_PER_USER} API keys allowed per user`, 400);
    }

    // Get user profile to determine quota limit
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('plan_type')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching user profile:', profileError);
      return errorResponse('Failed to determine quota limit', 500);
    }

    // Determine quota limit based on plan
    const planType = profile?.plan_type || 'free';
    const quotaLimit = QUOTA_LIMITS[planType as keyof typeof QUOTA_LIMITS] || QUOTA_LIMITS.free;

    // Generate API key
    const { apiKey, keyHash, keyPrefix } = generateApiKey();

    // Set quota reset date (30 days from now)
    const quotaResetAt = new Date();
    quotaResetAt.setDate(quotaResetAt.getDate() + 30);

    // Insert new API key into database
    const { data: newKey, error: insertError } = await supabaseAdmin
      .from('api_keys')
      .insert({
        user_id: user.id,
        key_hash: keyHash,
        key_prefix: keyPrefix,
        name: body.name || null,
        is_active: true,
        quota_limit: quotaLimit,
        quota_used: 0,
        quota_reset_at: quotaResetAt.toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating API key:', insertError);
      return errorResponse('Failed to create API key', 500);
    }

    // Return the new API key with the secret (only shown once)
    const responseData: ApiKeyWithSecret = {
      id: newKey.id,
      key_prefix: newKey.key_prefix,
      name: newKey.name,
      is_active: newKey.is_active,
      quota_limit: newKey.quota_limit,
      quota_used: newKey.quota_used,
      quota_reset_at: newKey.quota_reset_at,
      created_at: newKey.created_at,
      last_used_at: newKey.last_used_at,
      api_key: apiKey, // Only included in creation response
    };

    return successResponse(responseData, 201);
  } catch (error) {
    console.error('Error creating API key:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}