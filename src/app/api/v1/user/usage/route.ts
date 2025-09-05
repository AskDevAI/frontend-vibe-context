// import { NextRequest } from 'next/server'; // Unused since we removed the parameter
import { requireAuth, successResponse, errorResponse, supabaseAdmin } from '@/lib/server-auth';

// GET /api/v1/user/usage - Get user usage statistics
export async function GET() {
  try {
    const user = await requireAuth();
    
    // Get current 30-day rolling window
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    // Get total requests count (all time)
    const { count: totalRequests, error: totalError } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (totalError) {
      console.error('Error fetching total requests:', totalError);
    }

    // Get last 30 days requests count
    const { count: thirtyDayRequests, error: thirtyDayError } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (thirtyDayError) {
      console.error('Error fetching 30-day requests:', thirtyDayError);
    }

    // Get total tokens used in last 30 days
    const { error: tokenError } = await supabaseAdmin
      .from('usage_log')
      .select('tokens_used')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (tokenError) {
      console.error('Error fetching token usage:', tokenError);
    }


    // Get user profile for quota information
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('monthly_quota, credits_remaining')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
    }

    const monthlyQuota = profile?.monthly_quota || 100;

    // Calculate remaining credits based on actual usage
    const creditsUsed = thirtyDayRequests || 0;
    const creditsRemaining = Math.max(0, monthlyQuota - creditsUsed);

    const usageStats = {
      total_requests: totalRequests || 0,
      requests_this_month: thirtyDayRequests || 0,
      credits_used: creditsUsed,
      quota_remaining: creditsRemaining,
      monthly_quota: monthlyQuota,
      credits_remaining: creditsRemaining,
    };

    console.log('Usage stats calculated:', {
      userId: user.id,
      totalRequests,
      thirtyDayRequests,
      creditsUsed,
      monthlyQuota,
      creditsRemaining,
      thirtyDaysAgoISO: thirtyDaysAgo.toISOString(),
    });

    return successResponse(usageStats);
  } catch (error) {
    console.error('Error getting usage stats:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}