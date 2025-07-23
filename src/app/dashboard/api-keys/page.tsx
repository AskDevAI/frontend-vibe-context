'use client';

import DashboardLayout from '@/components/dashboard-layout';
import ApiKeyManagement from '@/components/api-key-management';

export default function ApiKeysPage() {
  return (
    <DashboardLayout activeTab="api-keys">
      <ApiKeyManagement />
    </DashboardLayout>
  );
}