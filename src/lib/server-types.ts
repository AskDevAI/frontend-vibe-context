// Server-side types for API operations

export interface ApiKeyRecord {
  id: string;
  user_id: string;
  key_hash: string;
  key_prefix: string;
  name?: string;
  is_active: boolean;
  quota_limit: number;
  quota_used: number;
  quota_reset_at?: string;
  created_at: string;
  updated_at?: string;
  last_used_at?: string;
}

export interface ApiKeyCreateRequest {
  name?: string;
}

export interface ApiKeyResponse {
  id: string;
  key_prefix: string;
  name?: string;
  is_active: boolean;
  quota_limit: number;
  quota_used: number;
  quota_reset_at?: string;
  created_at: string;
  last_used_at?: string;
}

export interface ApiKeyWithSecret extends ApiKeyResponse {
  api_key: string;
}

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

export interface DatabaseError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

// API response helpers
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

// Quota limits by plan
export const QUOTA_LIMITS = {
  free_plan: 100,
  free: 100, // fallback
  starter_monthly: 10000,
  starter: 10000, // fallback
  enterprise_plan: 100000,
  enterprise: 100000, // fallback
} as const;

export const MAX_API_KEYS_PER_USER = 10;