import { createClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Admin/service client for server operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

// Server client that handles cookies
export async function createSupabaseServer() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // The `remove` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

// Authentication helpers
export async function getCurrentUser() {
  const supabase = await createSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

// API Key generation utilities
export function generateApiKey(): { apiKey: string; keyHash: string; keyPrefix: string } {
  // Generate a random 32-byte key
  const keyBytes = crypto.randomBytes(32);
  // Create a readable key with prefix
  const apiKey = `vibe_${keyBytes.toString('hex')}`;
  // Hash the key for storage
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
  // Get prefix for display
  const keyPrefix = apiKey.substring(0, 12) + '...';
  
  return { apiKey, keyHash, keyPrefix };
}

export function hashApiKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

// API Key validation and quota checking
export async function validateApiKeyAndCheckQuota(apiKey: string): Promise<{ 
  valid: boolean; 
  userId?: string; 
  keyId?: string;
  quotaExceeded?: boolean; 
  quotaUsed?: number; 
  quotaLimit?: number; 
  error?: string 
}> {
  try {
    if (!apiKey || !apiKey.startsWith('vibe_')) {
      return { valid: false, error: 'Invalid API key format' };
    }

    const keyHash = hashApiKey(apiKey);
    
    // Get API key from database
    const { data: apiKeyData, error: keyError } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !apiKeyData) {
      return { valid: false, error: 'API key not found or inactive' };
    }

    // Calculate usage in the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));
    
    const { count: usageCount, error: usageError } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('api_key_hash', keyHash)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (usageError) {
      console.error('Error checking API key usage:', usageError);
      return { valid: false, error: 'Failed to check quota' };
    }

    const currentUsage = usageCount || 0;
    const quotaExceeded = currentUsage >= apiKeyData.quota_limit;

    // Update last_used_at timestamp
    await supabaseAdmin
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyData.id);

    return {
      valid: true,
      userId: apiKeyData.user_id,
      keyId: apiKeyData.id,
      quotaExceeded,
      quotaUsed: currentUsage,
      quotaLimit: apiKeyData.quota_limit,
    };
  } catch (error) {
    console.error('API key validation error:', error);
    return { valid: false, error: 'Internal validation error' };
  }
}

// Auth middleware
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

// Error response helper
export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

// Success response helper
export function successResponse(data: unknown, status: number = 200) {
  return NextResponse.json(data, { status });
}

// Usage logging helper
export async function logApiUsage(params: {
  userId: string;
  apiKeyHash: string;
  endpoint: string;
  requestData?: Record<string, unknown>;
  responseData?: Record<string, unknown>;
  tokensUsed?: number;
  responseTimeMs?: number;
  statusCode?: number;
}) {
  try {
    console.log('Attempting to log API usage:', {
      userId: params.userId,
      apiKeyHash: params.apiKeyHash?.substring(0, 8) + '...',
      endpoint: params.endpoint,
      tokensUsed: params.tokensUsed,
    });

    const { data, error } = await supabaseAdmin
      .from('usage_log')
      .insert({
        user_id: params.userId,
        api_key_hash: params.apiKeyHash,
        endpoint: params.endpoint,
        request_data: params.requestData || null,
        response_data: params.responseData || null,
        tokens_used: params.tokensUsed || 1, // Default to 1 request
        response_time_ms: params.responseTimeMs || null,
        status_code: params.statusCode || 200,
        user_path_hash: null, // Optional field from schema
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Database error while logging API usage:', error);
    } else {
      console.log('Successfully logged API usage:', data);
    }
  } catch (error) {
    console.error('Failed to log API usage:', error);
    // Don't throw error here to avoid disrupting the main API flow
  }
}