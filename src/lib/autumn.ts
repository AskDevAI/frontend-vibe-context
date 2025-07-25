import { Autumn } from 'autumn-js';

// Server-side Autumn client
export const autumn = new Autumn({
  secretKey: process.env.AUTUMN_SECRET_KEY || '',
  url: process.env.AUTUMN_BASE_URL || 'https://api.useautumn.com',
});

// Autumn configuration
export const AUTUMN_CONFIG = {
  features: {
    api_requests: {
      id: 'api_requests',
      name: 'API Requests',
      type: 'metered' as const,
      description: 'Number of API requests per month',
    },
    premium_features: {
      id: 'premium_features',
      name: 'Premium Features',
      type: 'boolean' as const,
      description: 'Access to premium features',
    },
    priority_support: {
      id: 'priority_support',
      name: 'Priority Support',
      type: 'boolean' as const,
      description: 'Priority customer support',
    },
  },
  products: {
    free: {
      id: 'free-plan',
      name: 'Free Plan',
      price: 0,
      interval: 'month' as const,
      features: {
        api_requests: { included: 100, overage: false },
        premium_features: { included: false },
        priority_support: { included: false },
      },
    },
    pro: {
      id: 'pro-plan',
      name: 'Pro Plan',
      price: 29,
      interval: 'month' as const,
      features: {
        api_requests: { included: 10000, overage: true, overagePrice: 0.001 },
        premium_features: { included: true },
        priority_support: { included: false },
      },
    },
    enterprise: {
      id: 'enterprise-plan',
      name: 'Enterprise Plan',
      price: 199,
      interval: 'month' as const,
      features: {
        api_requests: { included: 100000, overage: true, overagePrice: 0.0005 },
        premium_features: { included: true },
        priority_support: { included: true },
      },
    },
  },
};

// Utility functions for Autumn integration
export class AutumnService {
  private client: Autumn;

  constructor() {
    this.client = autumn;
  }

  // Track API usage
  async trackApiUsage(
    customerId: string, 
    count: number = 1, 
    metadata: Record<string, unknown> = {}
  ) {
    try {
      return await this.client.track({
        customer_id: customerId,
        feature_id: 'api_requests',
        value: count,
        event_name: 'api_request',
        entity_data: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
        idempotency_key: `${customerId}-${Date.now()}-${Math.random()}`,
      });
    } catch (error) {
      console.error('Failed to track API usage:', error);
      throw error;
    }
  }

  // Check if user can make API requests
  async checkApiQuota(customerId: string, requestCount: number = 1) {
    try {
      return await this.client.check({
        customer_id: customerId,
        feature_id: 'api_requests',
        required_balance: requestCount,
      });
    } catch (error) {
      console.error('Failed to check API quota:', error);
      throw error;
    }
  }

  // Check if user has premium features
  async checkPremiumFeatures(customerId: string) {
    try {
      return await this.client.check({
        customer_id: customerId,
        feature_id: 'premium_features',
      });
    } catch (error) {
      console.error('Failed to check premium features:', error);
      throw error;
    }
  }

  // Attach a product to a customer (upgrade/downgrade)
  async attachProduct(
    customerId: string, 
    productId: string, 
    options: {
      successUrl?: string;
      cancelUrl?: string;
      metadata?: Record<string, unknown>;
    } = {}
  ) {
    try {
      return await this.client.attach({
        customer_id: customerId,
        product_id: productId,
        metadata: options.metadata ? Object.fromEntries(
          Object.entries(options.metadata).map(([key, value]) => [key, String(value)])
        ) : undefined,
      });
    } catch (error) {
      console.error('Failed to attach product:', error);
      throw error;
    }
  }

  // Get customer data
  async getCustomer(customerId: string) {
    try {
      // Autumn client should have a method to get customer data
      // This is a placeholder - adjust based on actual Autumn API
      const response = await fetch(`${process.env.AUTUMN_BASE_URL}/v1/customers/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get customer:', error);
      throw error;
    }
  }

  // Create or update customer
  async upsertCustomer(customerId: string, customerData: {
    name?: string;
    email?: string;
    metadata?: Record<string, unknown>;
  }) {
    try {
      // This is a placeholder - adjust based on actual Autumn API
      const response = await fetch(`${process.env.AUTUMN_BASE_URL}/v1/customers/${customerId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AUTUMN_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to upsert customer:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const autumnService = new AutumnService();

// Helper function to determine plan type from Autumn customer data
export function getPlanTypeFromAutumn(customer: { products?: Array<{ id: string; active: boolean }> }): string {
  if (!customer || !customer.products) {
    return 'free';
  }

  // Check active products
  for (const product of customer.products) {
    if (product.active) {
      if (product.id.includes('enterprise')) return 'enterprise';
      if (product.id.includes('pro')) return 'pro';
    }
  }

  return 'free';
}

// Helper function to get quota limits from plan
export function getQuotaFromPlan(planType: string): number {
  switch (planType.toLowerCase()) {
    case 'enterprise':
      return 100000;
    case 'pro':
      return 10000;
    case 'free':
    default:
      return 100;
  }
}