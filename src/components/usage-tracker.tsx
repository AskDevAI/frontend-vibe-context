'use client';

import { useCustomer } from 'autumn-js/react';

interface UsageTrackerProps {
  featureId?: string;
  eventName?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

export function UsageTracker({ 
  featureId: _ = 'api_requests', 
  eventName: __ = 'api_request',
  value: ___ = 1,
  metadata: ____ = {}
}: UsageTrackerProps) {
  const { track: _____ } = useCustomer();

  // Future enhancement: track usage programmatically
  // const trackUsage = async () => {
  //   try {
  //     await track({
  //       featureId,
  //       eventName,
  //       value,
  //       entityData: {
  //         ...metadata,
  //         timestamp: new Date().toISOString(),
  //         userAgent: navigator.userAgent,
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Failed to track usage with Autumn:', error);
  //   }
  // };

  // This component doesn't render anything, it's just for tracking
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