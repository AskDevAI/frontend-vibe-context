import { getAuthHeaders } from './supabase';

// Use local API routes for frontend, external API for other services
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3230';
const USE_LOCAL_API = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_LOCAL_API === 'true';

export interface UserProfile {
  id: string;
  billing_customer_id?: string;
  plan_type: string;
  credits_remaining: number;
  credits_used_this_month: number;
  monthly_quota: number;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  key_prefix: string;
  name?: string;
  is_active: boolean;
  quota_limit: number;
  quota_used: number;
  individual_usage?: number;
  quota_reset_at?: string;
  created_at: string;
  last_used_at?: string;
}

export interface ApiKeyWithSecret extends ApiKey {
  api_key: string;
}

export interface CreateApiKeyRequest {
  name?: string;
}

export interface RepoSearchResult {
  library_id: string;
  name: string;
  aliases: Record<string, string>;
  available_versions: string[];
  metadata: Record<string, unknown>;
  relevance_score?: number;
}

export interface GetRepoIDResponse {
  results: RepoSearchResult[];
  total_count: number;
  search_term: string;
}

export interface DocSnippet {
  content: string;
  relevance_score: number;
  version: string;
}

export interface GetRepoDocsResponse {
  library_name: string;
  library_id: string;
  version: string;
  snippets: DocSnippet[];
  total_snippets: number;
  prompt: string;
}

export interface UsageStats {
  total_requests: number;
  requests_this_month: number;
  credits_used: number;
  quota_remaining: number;
}

export interface AnalyticsData {
  overview: {
    api_requests: number;
    monthly_limit: number;
    usage_percentage: number;
    avg_response_time: number;
    success_rate: number;
    unique_libraries: number;
  };
  performance: {
    average: number;
    p95: number;
    p99: number;
  };
  top_libraries: Array<{
    name: string;
    requests: number;
    percentage: number;
  }>;
  daily_usage: Array<{
    date: string;
    requests: number;
  }>;
  insights: string;
  stats: {
    total_requests_all_time: number;
    requests_last_7_days: number;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useLocalApi: boolean = false
  ): Promise<T> {
    const headers = await getAuthHeaders();
    
    // Determine base URL based on whether to use local API
    const baseUrl = useLocalApi ? '' : API_BASE_URL;
    
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' })) as { error: string };
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // User Profile Management - Use local API routes
  async getUserProfile(): Promise<UserProfile> {
    return this.request<UserProfile>('/api/v1/user/profile', {}, true);
  }

  async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>('/api/v1/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  }

  // API Key Management - Use local API routes
  async getMyApiKeys(): Promise<ApiKey[]> {
    return this.request<ApiKey[]>('/api/v1/users/me/api-keys', {}, true);
  }

  async createApiKey(data: CreateApiKeyRequest): Promise<ApiKeyWithSecret> {
    return this.request<ApiKeyWithSecret>('/api/v1/users/me/api-keys', {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  }

  async deleteApiKey(keyId: string): Promise<void> {
    return this.request<void>(`/api/v1/users/me/api-keys/${keyId}`, {
      method: 'DELETE',
    }, true);
  }

  async updateApiKey(keyId: string, data: { name?: string; is_active?: boolean }): Promise<ApiKey> {
    return this.request<ApiKey>(`/api/v1/users/me/api-keys/${keyId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true);
  }

  // Library Search - requires API key
  async searchLibraries(searchTerm: string, apiKey?: string, limit: number = 10): Promise<GetRepoIDResponse> {
    const params = new URLSearchParams({
      search_term: searchTerm,
      limit: limit.toString(),
    });

    // For library search, we need API key authentication
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    return this.request<GetRepoIDResponse>(`/api/v1/libraries/search?${params}`, { headers }, USE_LOCAL_API);
  }

  async getLibraryDocs(
    libraryId: string, 
    prompt: string, 
    apiKey?: string,
    version?: string, 
    limit: number = 5
  ): Promise<GetRepoDocsResponse> {
    const params = new URLSearchParams({
      library_id: libraryId,
      prompt,
      limit: limit.toString(),
    });

    if (version) {
      params.append('version', version);
    }

    // For library docs, we need API key authentication
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    return this.request<GetRepoDocsResponse>(`/api/v1/libraries/docs?${params}`, { headers }, USE_LOCAL_API);
  }

  // Usage Statistics - Use local API routes
  async getUsageStats(): Promise<UsageStats> {
    return this.request<UsageStats>('/api/v1/user/usage', {}, true);
  }

  // Analytics - Use local API routes
  async getAnalytics(): Promise<AnalyticsData> {
    return this.request<AnalyticsData>('/api/v1/user/analytics', {}, true);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; version: string; database: string }> {
    return this.request<{ status: string; version: string; database: string }>('/api/v1/health');
  }
}

export const apiService = new ApiService();