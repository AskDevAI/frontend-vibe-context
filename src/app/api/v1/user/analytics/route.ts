// import { NextRequest } from 'next/server'; // Unused since we removed the parameter
import { requireAuth, successResponse, errorResponse, supabaseAdmin } from '@/lib/server-auth';

// GET /api/v1/user/analytics - Get detailed user analytics
export async function GET() {
  try {
    const user = await requireAuth();
    
    // Get current 30-day rolling window
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    // Get user profile for quota information
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('monthly_quota, plan_type')
      .eq('id', user.id)
      .single();

    const monthlyQuota = profile?.monthly_quota || 100;

    // 1. Basic usage stats
    const { count: totalRequests } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const { count: monthlyRequests } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString());

    // 2. Success rate calculation
    const { count: successfulRequests } = await supabaseAdmin
      .from('usage_log')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .gte('status_code', 200)
      .lt('status_code', 300);

    const successRate = monthlyRequests ? ((successfulRequests || 0) / monthlyRequests * 100) : 100;

    // 3. Response time statistics
    const { data: responseTimeData } = await supabaseAdmin
      .from('usage_log')
      .select('response_time_ms')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .not('response_time_ms', 'is', null)
      .order('response_time_ms', { ascending: true });

    let avgResponseTime = 0;
    let p95ResponseTime = 0;
    let p99ResponseTime = 0;

    if (responseTimeData && responseTimeData.length > 0) {
      const responseTimes = responseTimeData
        .map(r => r.response_time_ms)
        .filter((time): time is number => time !== null)
        .sort((a, b) => a - b);

      if (responseTimes.length > 0) {
        avgResponseTime = Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length);
        p95ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.95)] || 0;
        p99ResponseTime = responseTimes[Math.floor(responseTimes.length * 0.99)] || 0;
      }
    }

    // 4. Top libraries (most requested)
    const { data: libraryUsageData } = await supabaseAdmin
      .from('usage_log')
      .select('request_data')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .not('request_data', 'is', null);

    // Extract library names from request data
    const libraryCount: Record<string, number> = {};
    libraryUsageData?.forEach(entry => {
      if (entry.request_data && typeof entry.request_data === 'object') {
        const requestData = entry.request_data as Record<string, unknown>;
        
        // Try to extract library name from various fields
        let libraryName = null;
        if (requestData.library_id) {
          libraryName = requestData.library_id;
        } else if (requestData.library_name) {
          libraryName = requestData.library_name;
        } else if (requestData.library) {
          libraryName = requestData.library;
        }
        
        if (libraryName && typeof libraryName === 'string') {
          libraryCount[libraryName] = (libraryCount[libraryName] || 0) + 1;
        }
      }
    });

    const topLibraries = Object.entries(libraryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, requests]) => ({
        name,
        requests,
        percentage: monthlyRequests ? Math.round((requests / monthlyRequests) * 100 * 10) / 10 : 0
      }));

    // 5. Daily usage for the last 7 days
    const dailyUsage = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const nextDate = new Date(date.getTime() + (24 * 60 * 60 * 1000));
      
      const { count: dayRequests } = await supabaseAdmin
        .from('usage_log')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString());

      dailyUsage.push({
        date: date.toISOString().split('T')[0],
        requests: dayRequests || 0
      });
    }

    // 6. Unique libraries count (last 30 days)
    const uniqueLibrariesCount = Object.keys(libraryCount).length;

    // 7. Calculate usage insights
    const usagePercentage = (monthlyRequests || 0) / monthlyQuota * 100;
    let insights = '';
    
    if (usagePercentage < 30) {
      insights = `You're using ${Math.round(usagePercentage)}% of your monthly quota. You have plenty of requests remaining this month.`;
    } else if (usagePercentage < 70) {
      insights = `You're using ${Math.round(usagePercentage)}% of your monthly quota. Based on your current usage pattern, you're on track for a good month.`;
    } else if (usagePercentage < 90) {
      insights = `You're using ${Math.round(usagePercentage)}% of your monthly quota. Consider monitoring your usage closely or upgrading your plan if needed.`;
    } else {
      insights = `You're using ${Math.round(usagePercentage)}% of your monthly quota. You may want to consider upgrading to avoid hitting your limit.`;
    }

    const analyticsData = {
      // Overview metrics
      overview: {
        api_requests: monthlyRequests || 0,
        monthly_limit: monthlyQuota,
        usage_percentage: Math.round(usagePercentage * 10) / 10,
        avg_response_time: avgResponseTime,
        success_rate: Math.round(successRate * 10) / 10,
        unique_libraries: uniqueLibrariesCount
      },
      
      // Performance metrics
      performance: {
        average: avgResponseTime,
        p95: p95ResponseTime,
        p99: p99ResponseTime
      },
      
      // Top libraries
      top_libraries: topLibraries,
      
      // Daily usage pattern
      daily_usage: dailyUsage,
      
      // Usage insights
      insights: insights,
      
      // Additional stats
      stats: {
        total_requests_all_time: totalRequests || 0,
        requests_last_7_days: dailyUsage.reduce((sum, day) => sum + day.requests, 0)
      }
    };

    return successResponse(analyticsData);

  } catch (error) {
    console.error('Error getting analytics data:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401);
    }
    return errorResponse('Internal server error', 500);
  }
}