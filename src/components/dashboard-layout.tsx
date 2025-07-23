'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from '@heroui/react';
import {
  Home,
  Key,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home, id: 'overview' },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: Key, id: 'api-keys' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, id: 'analytics' },
  { name: 'Documentation', href: '/docs', icon: FileText, id: 'docs' },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, id: 'settings' },
];

export default function DashboardLayout({ children, activeTab = 'overview' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 flex-shrink-0">
          <Link href="/" className="text-xl font-bold text-white">
            VibeContext
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2">Need help?</p>
            <Link href="/docs" className="text-sm text-blue-600 hover:underline">
              View Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-900 mr-4"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {activeTab.replace('-', ' ')}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    size="sm"
                    name="User"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem key="profile">
                    <Link href="/dashboard/settings" className="w-full">
                      Profile Settings
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="billing">
                    <Link href="/dashboard/billing" className="w-full">
                      Billing
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    <div className="flex items-center">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}