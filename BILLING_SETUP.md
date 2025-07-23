# Billing Integration with Autumn

This document explains how to set up and configure the Autumn billing integration for VibeContext.

**Status**: ✅ **FULLY IMPLEMENTED** - Autumn integration is now complete and functional using the official Next.js API handler pattern.

## Overview

VibeContext uses [Autumn](https://useautumn.com) as the billing infrastructure layer between Stripe and the application. Autumn handles:

- Subscription management
- Usage tracking
- Quota enforcement
- Webhook processing
- Customer billing

## Current Implementation Status

✅ **Completed**:
- **Autumn API Handler**: `/api/autumn/[...all]/route.ts` - Complete Next.js integration
- **React Provider**: `AutumnProvider` properly configured in providers
- **Billing Dashboard**: `/dashboard/billing` with full Autumn integration
- **Settings Page**: `/dashboard/settings` with account management
- **Analytics Dashboard**: `/dashboard/analytics` with real usage data
- **Usage Tracking Hooks**: `useCustomer`, `useUsageTracker` components
- **Checkout Flow**: `attach()` function with `AttachDialog`
- **Quota Checking**: Real-time feature access verification
- **User Identification**: Automatic Supabase auth integration
- **Environment Configuration**: Simplified backend URL setup

## Prerequisites

1. **Autumn Account**: Sign up at [app.useautumn.com](https://app.useautumn.com)
2. **Stripe Account**: Connected to your Autumn project
3. **Supabase Database**: For user profiles and usage data
4. **Next.js 15 Compatibility**: May need Autumn library update

## Environment Variables

Add these variables to your `.env.local` file:

```bash
# Autumn Configuration
AUTUMN_SECRET_KEY=am_sk_your_autumn_secret_key
NEXT_PUBLIC_AUTUMN_BACKEND_URL=http://localhost:3000

# For production:
# NEXT_PUBLIC_AUTUMN_BACKEND_URL=https://yourdomain.com
```

## Autumn Dashboard Setup

### 1. Create Products

In your Autumn dashboard, create these products:

#### Free Plan
- **Product ID**: `free-plan`
- **Price**: $0
- **Features**:
  - `api_requests`: 100 included, no overage
  - `premium_features`: false
  - `priority_support`: false

#### Pro Plan
- **Product ID**: `pro-plan`
- **Price**: $29/month
- **Features**:
  - `api_requests`: 10,000 included, $0.001 per overage
  - `premium_features`: true
  - `priority_support`: false

#### Enterprise Plan
- **Product ID**: `enterprise-plan`
- **Price**: $199/month
- **Features**:
  - `api_requests`: 100,000 included, $0.0005 per overage
  - `premium_features`: true
  - `priority_support`: true

### 2. Configure Features

Create these features in Autumn:

- **api_requests**: Metered feature for API usage
- **premium_features**: Boolean feature for premium access
- **priority_support**: Boolean feature for support tier

### 3. Set Up Webhooks

Configure webhook endpoint in Autumn:
- **URL**: `https://yourdomain.com/api/autumn/webhook`
- **Events**: All subscription and payment events

## Implementation Details

### Usage Tracking

The application automatically tracks API usage:

```typescript
// Track API request
await autumnService.trackApiUsage(userId, 1, {
  endpoint: '/api/v1/libraries/docs',
  library: 'fastapi',
  timestamp: new Date().toISOString()
});
```

### Quota Checking

Before processing API requests, check quotas:

```typescript
// Check if user can make API request
const { allowed, balance } = await autumnService.checkApiQuota(userId, 1);

if (!allowed) {
  return errorResponse('Quota exceeded', 429);
}
```

### Subscription Management

Users can upgrade/downgrade through the billing page:

```typescript
// Upgrade to Pro plan
await attach({
  productId: 'pro-plan',
  successUrl: '/dashboard/billing?success=true',
  cancelUrl: '/dashboard/billing?canceled=true'
});
```

## Database Schema

The `user_profiles` table stores billing information:

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  plan_type VARCHAR(50) DEFAULT 'free',
  monthly_quota INTEGER DEFAULT 100,
  credits_remaining INTEGER DEFAULT 100,
  credits_used_this_month INTEGER DEFAULT 0,
  billing_customer_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Webhook Processing

Autumn webhooks update user profiles automatically:

- `subscription.created/updated`: Updates plan type and quota
- `subscription.cancelled`: Downgrades to free plan
- `invoice.payment_succeeded`: Resets monthly usage
- `invoice.payment_failed`: Logs payment failure

## Frontend Components

### Billing Page
- View current plan and usage
- Upgrade/downgrade plans
- Manage billing portal

### Pricing Table
- Interactive plan selection
- Automatic checkout flow
- Trial management

### Settings Page
- Account information
- Billing details
- Usage overview

## Testing

### Local Development

1. Use Stripe test mode in Autumn
2. Test webhook endpoints with ngrok:
   ```bash
   ngrok http 3000
   # Update webhook URL in Autumn dashboard
   ```

### Test Scenarios

- [ ] Free user hits quota limit
- [ ] Upgrade from free to pro
- [ ] Downgrade from pro to free
- [ ] Payment failure handling
- [ ] Usage tracking accuracy
- [ ] Webhook processing

## Production Deployment

1. Set production environment variables
2. Update webhook URLs in Autumn dashboard
3. Switch Stripe to live mode
4. Test billing flows end-to-end

## Monitoring

Monitor these metrics:

- **Usage Tracking**: Ensure API calls are properly tracked
- **Quota Enforcement**: Verify limits are respected
- **Webhook Processing**: Check for failed webhook deliveries
- **Billing Accuracy**: Validate usage vs. billing

## Support

For billing-related issues:

1. Check Autumn dashboard for webhook logs
2. Review Stripe dashboard for payment issues
3. Monitor application logs for tracking errors
4. Contact Autumn support for integration help

## Security Notes

- Never expose secret keys in frontend code
- Validate webhook signatures
- Sanitize webhook payload data
- Use HTTPS for all webhook endpoints
- Regularly rotate API keys