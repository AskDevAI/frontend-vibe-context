'use client';

import { useCustomer } from 'autumn-js/react';

// interface UsageTrackerProps {
//   featureId?: string;
//   eventName?: string;
//   value?: number;
//   metadata?: Record<string, unknown>;
// }

export function UsageTracker() {
  // This component is currently disabled - tracking is handled by the useUsageTracker hook below
  // Future enhancement: implement automatic tracking based on props
  return null;
}

// Hook for manual usage tracking
export function useUsageTracker() {
  const { track, check } = useCustomer();

  const trackApiUsage = async (metadata?: Record<string, unknown>) => {
    try {
      await track({
        featureId: 'api_requests',
        eventName: 'api_request',
        value: 1,
        entityData: {
          ...metadata,
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      console.error('Failed to track API usage:', error);
    }
  };

  const checkApiQuota = async (requestCount: number = 1) => {
    try {
      const result = await check({
        featureId: 'api_requests',
        requiredBalance: requestCount,
      });
      return result;
    } catch (error) {
      console.error('Failed to check API quota:', error);
      return { allowed: true, balance: null }; // Fail open
    }
  };

  const checkPremiumFeatures = async () => {
    try {
      const result = await check({
        featureId: 'premium_features',
      });
      return result;
    } catch (error) {
      console.error('Failed to check premium features:', error);
      return { allowed: false, balance: null }; // Fail closed for premium features
    }
  };

  return {
    trackApiUsage,
    checkApiQuota,
    checkPremiumFeatures,
  };
}