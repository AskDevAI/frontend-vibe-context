'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import AuthGuard from '@/components/auth-guard';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { BarChart3, TrendingUp, Clock, Globe, Download, Calendar, AlertCircle } from 'lucide-react';
import { apiService, type AnalyticsData } from '@/lib/api';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAnalytics();
      setAnalyticsData(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load analytics';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <DashboardLayout activeTab="analytics">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        </DashboardLayout>
      </AuthGuard>
    );
  }

  if (error || !analyticsData) {
    return (
      <AuthGuard>
        <DashboardLayout activeTab="analytics">
        <div className="space-y-6">
          <Card className="border-danger-200 bg-danger-50">
            <CardBody className="p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-danger-600" />
                <div>
                  <h4 className="font-semibold text-danger-900">Failed to load analytics</h4>
                  <p className="text-danger-800 mt-1">{error || 'Unknown error occurred'}</p>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={loadAnalytics}
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
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <DashboardLayout activeTab="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Usage Analytics</h1>
            <p className="text-gray-600 mt-1">Track your API usage and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="bordered" size="sm" startContent={<Download className="w-4 h-4" />}>
              Export Data
            </Button>
            <Button variant="bordered" size="sm" startContent={<Calendar className="w-4 h-4" />}>
              Date Range
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">API Requests</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.overview.api_requests.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    of {analyticsData.overview.monthly_limit.toLocaleString()} limit
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(analyticsData.overview.usage_percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{analyticsData.overview.usage_percentage}% used</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.avg_response_time}ms</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Average response time
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.success_rate}%</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {analyticsData.overview.success_rate >= 95 ? 'Excellent' : analyticsData.overview.success_rate >= 90 ? 'Good' : 'Needs attention'} reliability
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Libraries</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analyticsData.overview.unique_libraries}</p>
                  <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Libraries */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Most Requested Libraries</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-4">
                {analyticsData.top_libraries.length > 0 ? (
                  analyticsData.top_libraries.map((library, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{library.name}</p>
                          <p className="text-sm text-gray-500">{library.requests} requests</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{library.percentage}%</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No library usage data yet</p>
                    <p className="text-sm">Start making API requests to see your top libraries</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Daily Usage Chart Placeholder */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Daily Usage (Last 7 Days)</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="h-64 flex items-end justify-center space-x-2 bg-gray-50 rounded-lg p-4">
                {analyticsData.daily_usage.map((day, index) => {
                  const maxRequests = Math.max(...analyticsData.daily_usage.map(d => d.requests), 1);
                  const height = maxRequests > 0 ? (day.requests / maxRequests) * 180 : 0;
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-1">{day.requests}</div>
                      <div 
                        className="bg-blue-500 rounded-t w-8 mb-2"
                        style={{ height: `${Math.max(height, 4)}px` }}
                      ></div>
                      <span className="text-xs text-gray-500 transform -rotate-45">
                        {formatDate(day.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Last 7 days: {analyticsData.stats.requests_last_7_days} total requests
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.average}ms</div>
                <div className="text-sm text-gray-600 mt-1">Average Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.p95}ms</div>
                <div className="text-sm text-gray-600 mt-1">95th Percentile</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analyticsData.performance.p99}ms</div>
                <div className="text-sm text-gray-600 mt-1">99th Percentile</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Usage Recommendations */}
        <Card className="bg-blue-50 border-blue-200">
          <CardBody className="p-6">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900">Usage Insights</h4>
                <p className="text-blue-800 mt-1">
                  {analyticsData.insights}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      </DashboardLayout>
    </AuthGuard>
  );
}