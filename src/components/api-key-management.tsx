'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { apiService, type ApiKey, type ApiKeyWithSecret } from '@/lib/api';

export default function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newApiKey, setNewApiKey] = useState<ApiKeyWithSecret | null>(null);
  const [keyName, setKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usageStats, setUsageStats] = useState<any>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isNewKeyModalOpen, onOpen: onNewKeyModalOpen, onClose: onNewKeyModalClose } = useDisclosure();

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const [keys, usage] = await Promise.all([
        apiService.getMyApiKeys(),
        apiService.getUsageStats(),
      ]);
      setApiKeys(keys);
      setUsageStats(usage);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load API keys';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    try {
      setLoading(true);
      const newKey = await apiService.createApiKey({ name: keyName || undefined });
      setNewApiKey(newKey);
      setKeyName('');
      onClose();
      onNewKeyModalOpen();
      await loadApiKeys();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create API key';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteApiKey(keyId);
      await loadApiKeys();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete API key';
      setError(errorMessage);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };


  const totalUsage = usageStats?.requests_this_month || 0;
  const quotaLimit = usageStats?.monthly_quota || 0;
  const usagePercentage = quotaLimit > 0 ? Math.round((totalUsage / quotaLimit) * 100) : 0;
  const usageColor = usagePercentage >= 90 ? 'danger' : usagePercentage >= 70 ? 'warning' : 'success';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
          <p className="text-gray-600 mt-1">
            Manage your API keys to access the VibeContext API
          </p>
        </div>
        <Button
          color="primary"
          onPress={onOpen}
          startContent={<Plus className="w-4 h-4" />}
        >
          Create API Key
        </Button>
      </div>

      {/* Total Usage Summary */}
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Usage</h3>
            <div className="text-sm text-gray-500">
              30-day rolling period
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {totalUsage.toLocaleString()} / {quotaLimit.toLocaleString()}
              </span>
              <span className={`text-sm font-medium ${usageColor === 'danger' ? 'text-red-600' : usageColor === 'warning' ? 'text-yellow-600' : 'text-green-600'}`}>
                {usagePercentage}% used
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${usageColor === 'danger' ? 'bg-red-500' : usageColor === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Usage across all API keys combined
            </p>
          </div>
        </CardBody>
      </Card>

      {error && (
        <Card className="border-danger-200 bg-danger-50">
          <CardBody>
            <p className="text-danger-600">{error}</p>
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={() => setError('')}
              className="mt-2"
            >
              Dismiss
            </Button>
          </CardBody>
        </Card>
      )}

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Your API Keys</span>
          </div>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys yet</h3>
              <p>Create your first API key to start using the VibeContext API</p>
              <Button
                color="primary"
                onPress={onOpen}
                startContent={<Plus className="w-4 h-4" />}
                className="mt-4"
              >
                Create API Key
              </Button>
            </div>
          ) : (
            <Table aria-label="API Keys table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>KEY</TableColumn>
                <TableColumn>USAGE</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => {
                  return (
                    <TableRow key={key.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {key.name || 'Unnamed key'}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {key.id.slice(0, 8)}...
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {key.key_prefix}...
                          </code>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {key.individual_usage !== undefined ? key.individual_usage.toLocaleString() : '0'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(key.created_at)}
                        </div>
                        {key.last_used_at && (
                          <div className="text-xs text-gray-500">
                            Last used: {formatDate(key.last_used_at)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={key.is_active ? 'success' : 'default'}
                          size="sm"
                          variant="flat"
                        >
                          {key.is_active ? 'Active' : 'Inactive'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteApiKey(key.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Create API Key Modal */}
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <ModalHeader>Create New API Key</ModalHeader>
          <ModalBody>
            <Input
              label="Name (optional)"
              placeholder="e.g., Production API Key"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              startContent={<Key className="w-4 h-4 text-gray-400" />}
            />
            <p className="text-sm text-gray-500">
              Give your API key a descriptive name to help you identify it later.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleCreateApiKey}
              isLoading={loading}
            >
              Create API Key
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New API Key Display Modal */}
      <Modal 
        isOpen={isNewKeyModalOpen} 
        onClose={() => {
          onNewKeyModalClose();
          setNewApiKey(null);
          setShowNewKey(false);
        }}
        placement="center"
        isDismissable={false}
        hideCloseButton={false}
      >
        <ModalContent>
          <ModalHeader>API Key Created Successfully</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <p className="text-warning-800 text-sm font-medium">
                  ⚠️ Important: This is the only time you&apos;ll see this API key.
                </p>
                <p className="text-warning-700 text-sm mt-1">
                  Make sure to copy it now and store it securely.
                </p>
              </div>

              {newApiKey && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your API Key
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={newApiKey.api_key}
                      type={showNewKey ? 'text' : 'password'}
                      isReadOnly
                      className="font-mono"
                    />
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => setShowNewKey(!showNewKey)}
                    >
                      {showNewKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => copyToClipboard(newApiKey.api_key)}
                    >
                      {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <div className="font-medium">{newApiKey.name || 'Unnamed'}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">User Quota:</span>
                      <div className="font-medium">{usageStats?.monthly_quota?.toLocaleString() || 'Loading...'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onPress={() => {
                onNewKeyModalClose();
                setNewApiKey(null);
                setShowNewKey(false);
              }}
            >
              I&apos;ve saved my API key
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}