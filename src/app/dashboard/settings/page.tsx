'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import {
  User,
  Mail,
  Calendar,
  Crown,
  CreditCard,
  Shield,
  AlertCircle,
  Save,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { apiService, type UserProfile } from '@/lib/api';
import { createSupabaseClient } from '@/lib/supabase';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [usageStats, setUsageStats] = useState<{
    monthly_quota?: number;
    requests_this_month?: number;
    quota_remaining?: number;
  } | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const supabase = createSupabaseClient();

  const loadProfileData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get user email from Supabase auth
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }

      // Get profile data and usage stats
      const [profileData, usage] = await Promise.all([
        apiService.getUserProfile(),
        apiService.getUsageStats(),
      ]);
      setProfile(profileData);
      setUsageStats(usage);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Currently, the API only supports updating billing_customer_id
      // This is a placeholder for when more profile fields become editable
      await apiService.updateUserProfile({
        billing_customer_id: profile.billing_customer_id,
      });

      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    // This would need to be implemented as a backend endpoint
    // For now, just show a message
    setError('Account deletion is not yet implemented. Please contact support.');
    onDeleteModalClose();
  };

  const getPlanColor = (planType: string) => {
    switch (planType.toLowerCase()) {
      case 'free':
        return 'default';
      case 'pro':
        return 'primary';
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
      <DashboardLayout activeTab="settings">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !profile) {
    return (
      <DashboardLayout activeTab="settings">
        <div className="space-y-6">
          <Card className="border-danger-200 bg-danger-50">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-danger-600" />
                <div>
                  <h4 className="font-semibold text-danger-900">Failed to load settings</h4>
                  <p className="text-danger-800 mt-1">{error}</p>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={loadProfileData}
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
    <DashboardLayout activeTab="settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <Card className="border-success-200 bg-success-50">
            <CardBody className="p-4">
              <p className="text-success-800">{success}</p>
            </CardBody>
          </Card>
        )}

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
          {/* Profile Information */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                </div>
                <Input
                  value={userEmail}
                  isReadOnly
                  className="bg-gray-50"
                  description="Email cannot be changed. Contact support if needed."
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-700">Account Created</label>
                </div>
                <Input
                  value={profile ? formatDate(profile.created_at) : ''}
                  isReadOnly
                  className="bg-gray-50"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-700">Last Updated</label>
                </div>
                <Input
                  value={profile ? formatDate(profile.updated_at) : ''}
                  isReadOnly
                  className="bg-gray-50"
                />
              </div>
            </CardBody>
          </Card>

          {/* Plan & Usage Information */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Plan & Usage</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Current Plan</label>
                  <Chip
                    color={getPlanColor(profile?.plan_type || '')}
                    size="sm"
                    variant="flat"
                  >
                    {profile?.plan_type.toUpperCase() || 'FREE'}
                  </Chip>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Monthly Quota</label>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {usageStats?.monthly_quota?.toLocaleString() || profile?.monthly_quota?.toLocaleString() || '0'}
                  </span>
                  <span className="text-sm text-gray-500">requests/month</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Usage This Month</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Used</span>
                    <span className="font-medium">{usageStats?.requests_this_month?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="font-medium">{usageStats?.quota_remaining?.toLocaleString() || '0'}</span>
                  </div>
                  {usageStats && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(((usageStats.requests_this_month || 0) / (usageStats.monthly_quota || 1)) * 100, 100)}%`
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {profile?.plan_type === 'free' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Ready to scale up? Upgrade to Pro or Enterprise for higher limits and advanced features.
                  </p>
                  <Button
                    as="a"
                    href="/pricing"
                    size="sm"
                    color="primary"
                    variant="light"
                    className="mt-2"
                    endContent={<ExternalLink className="w-3 h-3" />}
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Billing Information */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Billing Customer ID
              </label>
              <Input
                value={profile?.billing_customer_id || ''}
                onChange={(e) => profile && setProfile({ ...profile, billing_customer_id: e.target.value })}
                placeholder="Enter billing customer ID"
                description="This field is managed by our billing system"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Button
                color="primary"
                onPress={handleSaveProfile}
                isLoading={saving}
                startContent={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
              
              <Button
                as="a"
                href="/dashboard/billing"
                variant="bordered"
                endContent={<ExternalLink className="w-4 h-4" />}
              >
                Manage Billing
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Account Security</h4>
              <p className="text-sm text-gray-600 mb-4">
                Manage your password and account security settings through your authentication provider.
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="bordered"
                  size="sm"
                  onPress={async () => {
                    try {
                      await supabase.auth.resetPasswordForEmail(userEmail, {
                        redirectTo: `${window.location.origin}/auth/reset-password`,
                      });
                      setSuccess('Password reset email sent! Check your inbox.');
                    } catch (_error) {
                      setError('Failed to send password reset email');
                    }
                  }}
                >
                  Reset Password
                </Button>
                
                <Button
                  variant="bordered"
                  size="sm"
                  onPress={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}
                >
                  Sign Out Everywhere
                </Button>
              </div>
            </div>

            <Divider />

            <div>
              <h4 className="font-medium text-red-600 mb-2">Danger Zone</h4>
              <p className="text-sm text-gray-600 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              
              <Button
                color="danger"
                variant="bordered"
                size="sm"
                onPress={onDeleteModalOpen}
                startContent={<Trash2 className="w-4 h-4" />}
              >
                Delete Account
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Delete Account Confirmation Modal */}
        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} placement="center">
          <ModalContent>
            <ModalHeader>Delete Account</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-danger-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Are you absolutely sure?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </p>
                  </div>
                </div>
                
                <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                  <p className="text-sm text-danger-800">
                    <strong>This will delete:</strong>
                  </p>
                  <ul className="text-sm text-danger-700 mt-2 space-y-1">
                    <li>• All your API keys</li>
                    <li>• Usage history and analytics</li>
                    <li>• Account profile and settings</li>
                    <li>• Any associated billing information</li>
                  </ul>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteModalClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleDeleteAccount}>
                Yes, Delete My Account
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </DashboardLayout>
  );
}