'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Key, BarChart3, Zap, Users } from 'lucide-react';
import { apiService } from '@/lib/api';

interface DashboardStats {
  apiKeysCount: number;
  totalRequests: number;
  creditsRemaining: number;
  planType: string;
  isLoading: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    apiKeysCount: 0,
    totalRequests: 0,
    creditsRemaining: 0,
    planType: 'Free',
    isLoading: true,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [apiKeys, usageStats, userProfile] = await Promise.all([
          apiService.getMyApiKeys(),
          apiService.getUsageStats(),
          apiService.getUserProfile(),
        ]);

        console.log('Dashboard data fetched:', {
          apiKeysCount: apiKeys.length,
          usageStats,
          userProfile,
        });

        setStats({
          apiKeysCount: apiKeys.length,
          totalRequests: usageStats.total_requests,
          creditsRemaining: usageStats.credits_remaining,
          planType: userProfile.plan_type.charAt(0).toUpperCase() + userProfile.plan_type.slice(1),
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeTab="overview">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to VibeContext</h1>
          <p className="text-blue-100 mb-4">
            Get the latest documentation for any library, reduce tokens, and improve your AI&apos;s code quality.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody className="text-center p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Key className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.isLoading ? '...' : stats.apiKeysCount}
              </div>
              <div className="text-gray-600 text-sm">API Keys</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.isLoading ? '...' : stats.totalRequests}
              </div>
              <div className="text-gray-600 text-sm">API Requests</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center p-6">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.isLoading ? '...' : stats.creditsRemaining}
              </div>
              <div className="text-gray-600 text-sm">Credits Remaining</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats.isLoading ? '...' : stats.planType}
              </div>
              <div className="text-gray-600 text-sm">Current Plan</div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick Start</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Create an API Key</h4>
                  <p className="text-gray-600 text-sm">Generate your first API key to start using the service</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Install MCP Server</h4>
                  <p className="text-gray-500 text-sm">Set up the MCP server in your development environment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Start Coding</h4>
                  <p className="text-gray-500 text-sm">Begin using the latest documentation with your AI tools</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity</p>
                <p className="text-sm">Your API usage will appear here</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Resources */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Helpful Resources</h3>
          </CardHeader>
          <CardBody>
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="/docs" 
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-medium mb-2">📚 Documentation</h4>
                <p className="text-gray-600 text-sm">Learn how to integrate VibeContext with your AI tools</p>
              </a>
              <a 
                href="/docs/mcp" 
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-medium mb-2">🔧 MCP Server Setup</h4>
                <p className="text-gray-600 text-sm">Step-by-step guide to install and configure the MCP server</p>
              </a>
              <a 
                href="/docs/api" 
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <h4 className="font-medium mb-2">🚀 API Reference</h4>
                <p className="text-gray-600 text-sm">Complete API documentation and examples</p>
              </a>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}