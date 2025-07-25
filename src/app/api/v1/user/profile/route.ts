import { NextRequest } from 'next/server';
import { requireAuth, successResponse, errorResponse, supabaseAdmin } from '@/lib/server-auth';
import { UserProfile } from '@/lib/server-types';

// GET /api/v1/user/profile - Get user profile
export async function GET(_request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Get user profile from user_profiles table
    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create default one
      const defaultProfile = {
        id: user.id,
        plan_type: 'free',
        credits_remaining: 100,
        credits_used_this_month: 0,
        monthly_quota: 1000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: newProfile, error: createError } = await supabaseAdmin
        .from('user_profiles')
        .insert(defaultProfile)
        .select()
        .single();

      if (createError) {
        console.error('Error creating user profile:', createError);
        return errorResponse('Failed to create user profile', 500);
      }

      return successResponse(newProfile);
    }

    if (error) {
      console.error('Database error:', error);
      return errorResponse('Failed to retrieve user profile', 500);
    }

    return successResponse(profile);
  } catch (error) {
    console.error('Error getting user profile:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}

// PUT /api/v1/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    // Parse request body
    const body: Partial<UserProfile> = await request.json();
    
    // Validate allowed fields for user updates
    const allowedFields = ['billing_customer_id'];
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (body[field as keyof UserProfile] !== undefined) {
        updateData[field] = body[field as keyof UserProfile];
      }
    }

    // Update user profile
    const { data: updatedProfile, error } = await supabaseAdmin
      .from('user_profiles')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return errorResponse('Failed to update user profile', 500);
    }

    return successResponse(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}