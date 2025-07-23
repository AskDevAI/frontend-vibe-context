import { NextRequest, NextResponse } from 'next/server';
import { validateApiKeyAndCheckQuota, logApiUsage, errorResponse, successResponse, hashApiKey } from '@/lib/server-auth';

// GET /api/v1/libraries/docs - Get library documentation
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const url = new URL(request.url);
    const libraryId = url.searchParams.get('library_id');
    const prompt = url.searchParams.get('prompt');
    const version = url.searchParams.get('version');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '5'), 20); // Max 20 snippets

    // Validate required parameters
    if (!libraryId) {
      return errorResponse('library_id parameter is required', 400);
    }
    if (!prompt) {
      return errorResponse('prompt parameter is required', 400);
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

    // For now, return mock data since we don't have library docs implementation
    // In a real implementation, this would query the library_docs table and perform vector search
    const mockSnippets = [
      {
        content: `# FastAPI Quick Start

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
\`\`\`

This creates a basic FastAPI application with two endpoints.`,
        relevance_score: 0.92,
        version: version || 'latest',
      },
    ];

    const response = {
      library_name: 'FastAPI',
      library_id: libraryId,
      version: version || 'latest',
      snippets: mockSnippets,
      total_snippets: mockSnippets.length,
      prompt: prompt,
    };

    // Log the API usage (docs endpoint counts as more tokens/credits)
    await logApiUsage({
      userId: validationResult.userId!,
      apiKeyHash: hashApiKey(apiKey),
      endpoint: '/api/v1/libraries/docs',
      requestData: { library_id: libraryId, prompt, version, limit },
      responseData: { snippet_count: response.snippets.length },
      tokensUsed: 5, // Docs requests count as more since they return more data
      responseTimeMs: Date.now() - startTime,
      statusCode: 200,
    });

    return successResponse(response);

  } catch (error) {
    console.error('Library docs error:', error);
    return errorResponse('Internal server error', 500);
  }
}