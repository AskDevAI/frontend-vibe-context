'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import {
  CreditCard,
  Crown,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Download,
  Receipt,
  Zap,
} from 'lucide-react';
import { apiService, type UserProfile } from '@/lib/api';
import { useCustomer, AttachDialog } from 'autumn-js/react';

export default function BillingPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usageStats, setUsageStats] = useState<{
    monthly_quota?: number;
    requests_this_month?: number;
    credits_remaining?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isOpen: isUpgradeModalOpen, onOpen: onUpgradeModalOpen, onClose: onUpgradeModalClose } = useDisclosure();
  
  const { customer, attach } = useCustomer();

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const [profileData, usageData] = await Promise.all([
        apiService.getUserProfile(),
        apiService.getUsageStats(),
      ]);
      setProfile(profileData);
      setUsageStats(usageData);
      
      // Autumn customer data is automatically managed by useCustomer hook
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load billing data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (productId: string) => {
    try {
      const result = await attach({
        productId,
        dialog: AttachDialog
      });
      
      // Handle success
      if (result) {
        onUpgradeModalClose();
        loadBillingData();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upgrade plan';
      setError(errorMessage);
    }
  };

  const handleManageBilling = async () => {
    try {
      // Use Autumn's billing portal or redirect to a custom billing management page
      const billingPortalUrl = (customer as { billingPortalUrl?: string })?.billingPortalUrl;
      
      if (billingPortalUrl) {
        window.open(billingPortalUrl, '_blank');
      } else {
        // Fallback to Stripe customer portal if available
        setError('Billing portal not available. Please contact support for billing assistance.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to open billing portal';
      setError(errorMessage);
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType.toLowerCase()) {
      case 'free_plan':
      case 'free':
        return 'default';
      case 'starter_monthly':
      case 'starter':
        return 'primary';
      case 'enterprise_plan':
      case 'enterprise':
        return 'success';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <DashboardLayout activeTab="billing">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !profile) {
    return (
      <DashboardLayout activeTab="billing">
        <div className="space-y-6">
          <Card className="border-danger-200 bg-danger-50">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-danger-600" />
                <div>
                  <h4 className="font-semibold text-danger-900">Failed to load billing information</h4>
                  <p className="text-danger-800 mt-1">{error}</p>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={loadBillingData}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="billing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600 mt-1">Manage your subscription and billing information</p>
          </div>
          
          <div className="flex gap-2">
            {profile?.plan_type !== 'free' && profile?.plan_type !== 'free_plan' && (
              <Button
                variant="bordered"
                size="sm"
                onPress={handleManageBilling}
                startContent={<CreditCard className="w-4 h-4" />}
              >
                Manage Billing
              </Button>
            )}
            
            <Button
              color="primary"
              size="sm"
              onPress={onUpgradeModalOpen}
              startContent={<Crown className="w-4 h-4" />}
            >
              {(profile?.plan_type === 'free' || profile?.plan_type === 'free_plan') ? 'Upgrade Plan' : 'Change Plan'}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-danger-200 bg-danger-50">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-danger-800">{error}</p>
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => setError('')}
                >
                  Dismiss
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Plan */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 capitalize">
                    {customer?.products?.[0]?.name || profile?.plan_type || 'Free'} Plan
                  </h4>
                  <p className="text-sm text-gray-500">
                    {(profile?.plan_type === 'free' || profile?.plan_type === 'free_plan')
                      ? 'Perfect for getting started' 
                      : (profile?.plan_type === 'starter_monthly' || profile?.plan_type === 'starter')
                      ? 'Great for growing teams'
                      : 'Unlimited scale for enterprises'
                    }
                  </p>
                  {customer && (
                    <p className="text-xs text-gray-400 mt-1">
                      Autumn Customer ID: {customer.id?.slice(0, 8)}...
                    </p>
                  )}
                </div>
                <Chip
                  color={getPlanColor(profile?.plan_type || 'free')}
                  size="lg"
                  variant="flat"
                >
                  {customer?.products?.[0]?.name?.toUpperCase() || profile?.plan_type?.toUpperCase() || 'FREE'}
                </Chip>
              </div>

              <Divider />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Quota</span>
                  <span className="font-medium">{usageStats?.monthly_quota?.toLocaleString() || profile?.monthly_quota?.toLocaleString() || '0'} requests</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Used This Month</span>
                  <span className="font-medium">{usageStats?.requests_this_month?.toLocaleString() || '0'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span className="font-medium text-green-600">{usageStats?.credits_remaining?.toLocaleString() || '0'}</span>
                </div>

                {usageStats && (
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                      className="bg-primary-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(((usageStats.requests_this_month || 0) / (usageStats.monthly_quota || 1)) * 100, 100)}%`
                      }}
                    />
                  </div>
                )}
              </div>

              {(profile?.plan_type === 'free' || profile?.plan_type === 'free_plan') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Ready to scale?</span>
                  </div>
                  <p className="text-sm text-blue-800 mt-1">
                    Upgrade to Starter for 10,000 requests/month and advanced features.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Usage Analytics */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Usage Overview</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((usageStats?.requests_this_month || 0) / Math.max(new Date().getDate(), 1))}
                  </div>
                  <div className="text-sm text-gray-600">Avg/day</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {usageStats ? Math.round(((usageStats.requests_this_month || 0) / (usageStats.monthly_quota || 1)) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Used</div>
                </div>
              </div>

              <Divider />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Account created</span>
                  <span>{profile ? formatDate(profile.created_at) : 'N/A'}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last updated</span>
                  <span>{profile ? formatDate(profile.updated_at) : 'N/A'}</span>
                </div>
              </div>

              {profile?.billing_customer_id && (
                <>
                  <Divider />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer ID</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {profile.billing_customer_id.slice(0, 8)}...
                    </code>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Billing History - Placeholder */}
        {profile?.plan_type !== 'free' && profile?.plan_type !== 'free_plan' && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Receipt className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                </div>
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-center py-8 text-gray-500">
                <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No billing history yet</h4>
                <p>Your billing history will appear here once you have transactions.</p>
                <Button
                  className="mt-4"
                  variant="bordered"
                  size="sm"
                  onPress={handleManageBilling}
                  endContent={<ExternalLink className="w-3 h-3" />}
                >
                  View in Billing Portal
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Upgrade Modal */}
        <Modal 
          isOpen={isUpgradeModalOpen} 
          onClose={onUpgradeModalClose}
          size="5xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader>Choose Your Plan</ModalHeader>
            <ModalBody className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600">
                    Choose your plan to unlock more API requests and premium features.
                  </p>
                </div>
                
                <div className="grid gap-4">
                  {/* Starter Plan */}
                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-blue-900">Starter Plan</h3>
                        <p className="text-sm text-blue-700">Great for growing teams</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">$29</div>
                        <div className="text-sm text-blue-700">/month</div>
                      </div>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1 mb-4">
                      <li>• 10,000 API requests/month</li>
                      <li>• Priority support</li>
                      <li>• Advanced analytics</li>
                      <li>• API key management</li>
                    </ul>
                    <Button
                      color="primary"
                      className="w-full"
                      onPress={() => handleUpgrade('starter_monthly')}
                    >
                      Upgrade to Starter
                    </Button>
                  </div>
                  
                  {/* Enterprise Plan */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">Enterprise Plan</h3>
                        <p className="text-sm text-gray-600">Unlimited scale</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">$199</div>
                        <div className="text-sm text-gray-600">/month</div>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 mb-4">
                      <li>• 100,000 API requests/month</li>
                      <li>• Priority support</li>
                      <li>• Advanced analytics</li>
                      <li>• Team management</li>
                      <li>• Custom integrations</li>
                      <li>• SLA guarantee</li>
                    </ul>
                    <Button
                      variant="bordered"
                      className="w-full"
                      onPress={() => handleUpgrade('enterprise_plan')}
                    >
                      Upgrade to Enterprise
                    </Button>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onUpgradeModalClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </DashboardLayout>
  );
}