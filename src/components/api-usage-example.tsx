'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { useUsageTracker } from './usage-tracker';
import { useCustomer } from 'autumn-js/react';

export default function ApiUsageExample() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const { trackApiUsage, checkApiQuota } = useUsageTracker();
  const { customer } = useCustomer();

  const handleApiCall = async () => {
    setLoading(true);
    
    try {
      // 1. Check quota before making the API call
      const quotaCheck = await checkApiQuota(1);
      
      if (!(quotaCheck as { allowed: boolean }).allowed) {
        setResult({
          error: 'API quota exceeded. Please upgrade your plan.',
          quota: quotaCheck
        });
        return;
      }

      // 2. Simulate API call
      const response = await fetch('/api/v1/libraries/search?search_term=react&limit=5');
      const data = await response.json();

      // 3. Track the usage after successful API call
      await trackApiUsage({
        endpoint: '/api/v1/libraries/search',
        searchTerm: 'react',
        resultCount: data.results?.length || 0,
        success: response.ok
      });

      setResult({
        success: true,
        data: data,
        quota: quotaCheck
      });

    } catch (error) {
      // Track failed API calls too
      await trackApiUsage({
        endpoint: '/api/v1/libraries/search',
        searchTerm: 'react',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      setResult({
        error: error instanceof Error ? error.message : 'API call failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardBody className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">API Usage Example</h3>
            {customer && (
              <Chip size="sm" variant="flat" color="primary">
                {customer.products?.[0]?.name || 'Free'} Plan
              </Chip>
            )}
          </div>

          <p className="text-sm text-gray-600">
            This example shows how to check quotas and track API usage with Autumn.
          </p>

          <Button
            color="primary"
            onPress={handleApiCall}
            isLoading={loading}
            className="w-full"
          >
            {loading ? 'Making API Call...' : 'Test API Call with Usage Tracking'}
          </Button>

          {result && (
            <div className="mt-4 p-4 rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Result:</h4>
              
              {result.error ? (
                <div className="text-red-600 text-sm">
                  <strong>Error:</strong> {String(result.error)}
                </div>
              ) : (
                <div className="text-green-600 text-sm">
                  <strong>Success:</strong> API call completed and usage tracked
                </div>
              )}

              {result.quota && typeof result.quota === 'object' ? (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Quota Status:</strong>{' '}
                  {(result.quota as { allowed: boolean; balance: unknown }).allowed ? (
                    <span className="text-green-600">
                      Allowed (Balance: {String((result.quota as { allowed: boolean; balance: unknown }).balance)})
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Quota Exceeded
                    </span>
                  )}
                </div>
              ) : null}

              {result.data ? (
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Results:</strong> Found {(result.data as { results?: unknown[] }).results?.length || 0} libraries
                </div>
              ) : null}
            </div>
          )}

          {customer && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Current Customer Info:</h4>
              <div className="text-xs text-blue-800 space-y-1">
                <div>ID: {customer.id}</div>
                <div>Products: {customer.products?.map(p => p.name).join(', ') || 'None'}</div>
                <div>Features: {customer.features ? Object.keys(customer.features).join(', ') : 'None'}</div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}