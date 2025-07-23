# Frontend Server-Side API Implementation

This document describes the server-side API implementation built into the Next.js frontend project for deployment on Vercel.

## Overview

The frontend now includes its own server-side API routes that handle:
- User authentication and profile management
- API key creation, listing, and deletion
- Usage statistics tracking
- Health monitoring

This allows the entire application to be deployed as a single Next.js project on Vercel, with the backend logic embedded in the frontend.

## Architecture

```
frontend/src/app/api/v1/
├── health/
│   └── route.ts              # Health check endpoint
├── user/
│   ├── profile/
│   │   └── route.ts          # User profile management
│   └── usage/
│       └── route.ts          # Usage statistics
└── users/
    └── me/
        └── api-keys/
            ├── route.ts      # List/create API keys
            └── [keyId]/
                └── route.ts  # Delete/update specific API key
```

## API Endpoints

### Authentication
All API endpoints require Supabase authentication via session cookies or Authorization header.

### API Key Management

#### `GET /api/v1/users/me/api-keys`
List all API keys for the authenticated user.

**Response:**
```json
[
  {
    "id": "uuid",
    "key_prefix": "vibe_abc123...",
    "name": "Production API Key",
    "is_active": true,
    "quota_limit": 1000,
    "quota_used": 150,
    "quota_reset_at": "2024-02-01T00:00:00Z",
    "created_at": "2024-01-01T12:00:00Z",
    "last_used_at": "2024-01-15T10:30:00Z"
  }
]
```

#### `POST /api/v1/users/me/api-keys`
Create a new API key.

**Request:**
```json
{
  "name": "My API Key" // optional
}
```

**Response:**
```json
{
  "id": "uuid",
  "key_prefix": "vibe_abc123...",
  "name": "My API Key",
  "is_active": true,
  "quota_limit": 1000,
  "quota_used": 0,
  "quota_reset_at": "2024-02-01T00:00:00Z",
  "created_at": "2024-01-01T12:00:00Z",
  "last_used_at": null,
  "api_key": "vibe_abc123def456..." // Full key only shown once
}
```

#### `DELETE /api/v1/users/me/api-keys/{keyId}`
Delete an API key.

**Response:** `204 No Content`

#### `PUT /api/v1/users/me/api-keys/{keyId}`
Update an API key.

**Request:**
```json
{
  "name": "Updated Name", // optional
  "is_active": false      // optional
}
```

### User Profile Management

#### `GET /api/v1/user/profile`
Get user profile information.

#### `PUT /api/v1/user/profile`
Update user profile information.

### Usage Statistics

#### `GET /api/v1/user/usage`
Get usage statistics for the authenticated user.

**Response:**
```json
{
  "total_requests": 500,
  "requests_this_month": 150,
  "credits_used": 300,
  "quota_remaining": 850,
  "monthly_quota": 1000,
  "credits_remaining": 700
}
```

### Health Check

#### `GET /api/v1/health`
System health check.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "database": "connected",
  "timestamp": "2024-01-01T12:00:00Z",
  "service": "VibeContext Frontend API"
}
```

## Implementation Details

### Authentication
- Uses Supabase Auth with server-side session management
- Service role key for database operations
- Row Level Security (RLS) enforced in Supabase

### Database Access
- Direct Supabase connections using service role key
- Follows the same schema as the Python backend
- Proper error handling and logging

### Security Features
- API keys are hashed using SHA-256
- Only key prefixes are returned in list operations
- Full API key is shown only once during creation
- User-specific data access enforced

### Rate Limiting & Quotas
- Maximum 10 API keys per user
- Quota limits based on user plan type:
  - Free: 1,000 requests/month
  - Pro: 10,000 requests/month  
  - Enterprise: 100,000 requests/month

## Environment Variables

Required environment variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# API Configuration
NEXT_PUBLIC_USE_LOCAL_API=true
```

## Deployment

When deployed to Vercel:
1. All API routes become serverless functions
2. Environment variables are configured in Vercel dashboard
3. The frontend automatically uses local API routes
4. No separate backend deployment needed

## Testing

To test the API routes locally:

1. Set up environment variables in `.env.local`
2. Run `npm run dev`
3. API routes are available at `http://localhost:3000/api/v1/...`
4. Use the frontend UI or tools like Postman to test endpoints

## Monitoring

- All API operations are logged to console
- Database errors are captured and logged
- Health check endpoint for uptime monitoring
- Usage statistics tracked in the database

## Migration Notes

This implementation maintains compatibility with the existing frontend API client, so no changes are needed to the React components or UI logic.