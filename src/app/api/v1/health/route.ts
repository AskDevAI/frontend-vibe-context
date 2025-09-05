import { NextRequest } from 'next/server';
import { successResponse, supabaseAdmin } from '@/lib/server-auth';

// GET /api/v1/health - Health check endpoint
export async function GET() {
  try {
    // Test database connection
    const { error } = await supabaseAdmin
      .from('user_profiles')
      .select('count')
      .limit(1);

    const databaseStatus = error ? 'error' : 'connected';

    const healthData = {
      status: 'healthy',
      version: '1.0.0',
      database: databaseStatus,
      timestamp: new Date().toISOString(),
      service: 'AskBudi Frontend API',
    };

    if (error) {
      console.warn('Database health check warning:', error);
      healthData.status = 'degraded';
    }

    return successResponse(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    
    const healthData = {
      status: 'unhealthy',
      version: '1.0.0',
      database: 'error',
      timestamp: new Date().toISOString(),
      service: 'AskBudi Frontend API',
      error: error instanceof Error ? error.message : 'Unknown error',
    };

    return successResponse(healthData, 503);
  }
}