'use client';

import DashboardLayout from '@/components/dashboard-layout';
import ApiKeyManagement from '@/components/api-key-management';
import AuthGuard from '@/components/auth-guard';

export default function ApiKeysPage() {
  return (
    <AuthGuard>
      <DashboardLayout activeTab="api-keys">
        <ApiKeyManagement />
      </DashboardLayout>
    </AuthGuard>
  );
}