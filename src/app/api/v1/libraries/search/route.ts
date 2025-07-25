import { NextRequest } from 'next/server';
import { validateApiKeyAndCheckQuota, logApiUsage, errorResponse, successResponse, hashApiKey } from '@/lib/server-auth';

// GET /api/v1/libraries/search - Search for libraries
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search_term');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 50); // Max 50 results

    // Validate required parameters
    if (!searchTerm) {
      return errorResponse('search_term parameter is required', 400);
    }

    // Get API key from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse('API key required. Please include "Authorization: Bearer YOUR_API_KEY" header', 401);
    }

    const apiKey = authHeader.replace('Bearer ', '');
    
    // Validate API key and check quota
    const validationResult = await validateApiKeyAndCheckQuota(apiKey);
    
    if (!validationResult.valid) {
      return errorResponse(validationResult.error || 'Invalid API key', 401);
    }

    if (validationResult.quotaExceeded) {
      return errorResponse(
        `Quota exceeded. Used ${validationResult.quotaUsed}/${validationResult.quotaLimit} requests in the last 30 days.`, 
        429
      );
    }

    // For now, return mock data since we don't have library search implementation
    // In a real implementation, this would query the libraries table
    const mockResults = [
      {
        library_id: '/fastapi/fastapi',
        name: 'FastAPI',
        aliases: { pip: 'fastapi', github: 'tiangolo/fastapi' },
        available_versions: ['0.104.1', '0.103.2', '0.103.1'],
        metadata: {
          description: 'FastAPI framework, high performance, easy to learn, fast to code, ready for production',
          github_stars: 68500,
          github_url: 'https://github.com/tiangolo/fastapi',
        },
        relevance_score: 0.95,
      },
    ].filter(lib => 
      lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm.toLowerCase().includes(lib.name.toLowerCase())
    ).slice(0, limit);

    const response = {
      results: mockResults,
      total_count: mockResults.length,
      search_term: searchTerm,
    };

    // Log the API usage
    await logApiUsage({
      userId: validationResult.userId!,
      apiKeyHash: hashApiKey(apiKey),
      endpoint: '/api/v1/libraries/search',
      requestData: { search_term: searchTerm, limit },
      responseData: { result_count: response.results.length },
      tokensUsed: 1, // Each search counts as 1 request
      responseTimeMs: Date.now() - startTime,
      statusCode: 200,
    });

    return successResponse(response);

  } catch (error) {
    console.error('Library search error:', error);
    return errorResponse('Internal server error', 500);
  }
}