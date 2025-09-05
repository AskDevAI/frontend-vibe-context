import { NextRequest } from 'next/server';
import { requireAuth, successResponse, errorResponse } from '@/lib/server-auth';

// POST /api/v1/user/track-usage - Track API usage with Autumn
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    
    const { 
      feature_id = 'api_requests',
      value = 1,
      event_name,
      properties = {},
      idempotency_key: _
    } = body;

    // This endpoint is now handled by Autumn's frontend hooks
    // The backend API handler at /api/autumn/[...all] manages the actual tracking
    
    console.log('Usage tracking request received:', {
      userId: user.id,
      featureId: feature_id,
      value,
      eventName: event_name,
      properties
    });

    return successResponse({
      tracked: true,
      message: 'Usage tracking is handled by Autumn frontend hooks',
      feature_id,
      value,
    });

  } catch (error) {
    console.error('Error tracking usage:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    
    // If Autumn is not configured, fall back gracefully
    if (error instanceof Error && error.message.includes('secret_key')) {
      console.warn('Autumn not configured, skipping usage tracking');
      return successResponse({
        tracked: false,
        message: 'Usage tracking not configured'
      });
    }
    
    return errorResponse('Failed to track usage', 500);
  }
}

// GET /api/v1/user/track-usage/check - Check feature entitlement
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get('feature_id') || 'api_requests';
    const requiredQuantity = parseInt(searchParams.get('required_quantity') || '1');

    // This endpoint is now handled by Autumn's frontend hooks
    // The backend API handler at /api/autumn/[...all] manages the actual checking
    
    console.log('Usage check request received:', {
      userId: user.id,
      featureId,
      requiredQuantity
    });

    return successResponse({
      message: 'Usage checking is handled by Autumn frontend hooks',
      feature_id: featureId,
      required_quantity: requiredQuantity,
    });

  } catch (error) {
    console.error('Error checking feature entitlement:', error);
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    
    // If Autumn is not configured, fall back to database check
    if (error instanceof Error && error.message.includes('secret_key')) {
      console.warn('Autumn not configured, falling back to database check');
      
      // Fall back to existing usage check logic
      try {
        const { apiService } = await import('@/lib/api');
        const usage = await apiService.getUsageStats();
        
        return successResponse({
          allowed: usage.quota_remaining > 0,
          balance: usage.quota_remaining,
          feature_id: 'api_requests',
          fallback: true,
        });
      } catch {
        return errorResponse('Failed to check entitlement', 500);
      }
    }
    
    return errorResponse('Failed to check entitlement', 500);
  }
}