import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, successResponse, errorResponse, supabaseAdmin } from '@/lib/server-auth';

// DELETE /api/v1/users/me/api-keys/[keyId] - Delete an API key
export async function DELETE(
  request: NextRequest,
  { params }: { params: { keyId: string } }
) {
  try {
    const user = await requireAuth();
    const { keyId } = params;

    if (!keyId) {
      return errorResponse('API key ID is required', 400);
    }

    // Check if the API key exists and belongs to the user
    const { data: existingKey, error: fetchError } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('id', keyId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingKey) {
      return errorResponse('API key not found', 404);
    }

    // Delete the API key
    const { error: deleteError } = await supabaseAdmin
      .from('api_keys')
      .delete()
      .eq('id', keyId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting API key:', deleteError);
      return errorResponse('Failed to delete API key', 500);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting API key:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}

// PUT /api/v1/users/me/api-keys/[keyId] - Update an API key
export async function PUT(
  request: NextRequest,
  { params }: { params: { keyId: string } }
) {
  try {
    const user = await requireAuth();
    const { keyId } = params;

    if (!keyId) {
      return errorResponse('API key ID is required', 400);
    }

    // Parse request body
    const body: { name?: string; is_active?: boolean } = await request.json();

    // Validate input
    if (body.name !== undefined && typeof body.name !== 'string') {
      return errorResponse('Name must be a string', 400);
    }
    if (body.is_active !== undefined && typeof body.is_active !== 'boolean') {
      return errorResponse('is_active must be a boolean', 400);
    }

    // Check if the API key exists and belongs to the user
    const { data: existingKey, error: fetchError } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('id', keyId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingKey) {
      return errorResponse('API key not found', 404);
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (body.name !== undefined) {
      updateData.name = body.name || null;
    }
    if (body.is_active !== undefined) {
      updateData.is_active = body.is_active;
    }

    // Update the API key
    const { data: updatedKey, error: updateError } = await supabaseAdmin
      .from('api_keys')
      .update(updateData)
      .eq('id', keyId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating API key:', updateError);
      return errorResponse('Failed to update API key', 500);
    }

    // Return updated key data (without secret)
    const responseData = {
      id: updatedKey.id,
      key_prefix: updatedKey.key_prefix,
      name: updatedKey.name,
      is_active: updatedKey.is_active,
      quota_limit: updatedKey.quota_limit,
      quota_used: updatedKey.quota_used,
      quota_reset_at: updatedKey.quota_reset_at,
      created_at: updatedKey.created_at,
      last_used_at: updatedKey.last_used_at,
    };

    return successResponse(responseData);
  } catch (error) {
    console.error('Error updating API key:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}