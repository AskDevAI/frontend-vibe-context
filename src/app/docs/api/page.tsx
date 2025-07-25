'use client';

import { Card, CardBody, CardHeader, Button, Chip, Tabs, Tab } from '@heroui/react';
import { ArrowLeft, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useState } from 'react';

const endpoints = [
  {
    method: 'POST',
    path: '/api/v1/resolve',
    description: 'Resolve a library name to get documentation ID',
    category: 'Core'
  },
  {
    method: 'POST', 
    path: '/api/v1/docs',
    description: 'Get documentation snippets for a library',
    category: 'Core'
  },
  {
    method: 'GET',
    path: '/api/v1/libraries',
    description: 'List all supported libraries',
    category: 'Discovery'
  },
  {
    method: 'GET',
    path: '/api/v1/status',
    description: 'Get API status and usage information',
    category: 'Utility'
  }
];

const resolveExample = `{
  "search_term": "fastapi",
  "limit": 5
}`;

const resolveResponse = `{
  "libraries": [
    {
      "id": "/tiangolo/fastapi",
      "name": "FastAPI",
      "description": "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
      "trust_score": 10,
      "code_snippets": 1247,
      "latest_version": "0.104.1"
    }
  ]
}`;

const docsExample = `{
  "library_id": "/tiangolo/fastapi",
  "prompt": "How to create API endpoints with validation?",
  "limit": 5
}`;

const docsResponse = `{
  "snippets": [
    {
      "content": "from fastapi import FastAPI\\nfrom pydantic import BaseModel\\n\\napp = FastAPI()\\n\\nclass Item(BaseModel):\\n    name: str\\n    price: float\\n\\n@app.post('/items/')\\nasync def create_item(item: Item):\\n    return item",
      "source": "https://fastapi.tiangolo.com/tutorial/body/",
      "title": "Request Body",
      "relevance_score": 0.95
    }
  ],
  "usage": {
    "tokens_saved": 1200,
    "response_time_ms": 87
  }
}`;

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative">
      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="flat"
        className="absolute top-2 right-2"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );

  return (
    <main>
      <Navbar />
      
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <Button
            variant="light"
            as={Link}
            href="/docs"
            startContent={<ArrowLeft className="w-4 h-4" />}
            className="mb-8"
          >
            Back to Documentation
          </Button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
            <p className="text-xl text-gray-600">
              Complete reference for the AskBudi API endpoints and parameters.
            </p>
          </div>

          {/* Authentication */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Authentication</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                All API requests require authentication using your API key in the Authorization header:
              </p>
              <CodeBlock 
                code="Authorization: Bearer your-api-key-here" 
                id="auth-header"
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-800 font-medium">Base URL</p>
                    <p className="text-blue-700">https://api.askbudi.ai</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Endpoints Overview */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Endpoints</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Chip 
                        color={endpoint.method === 'GET' ? 'success' : 'primary'}
                        variant="solid"
                        size="sm"
                      >
                        {endpoint.method}
                      </Chip>
                      <code className="font-mono text-sm">{endpoint.path}</code>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{endpoint.description}</p>
                      <Chip size="sm" variant="flat" className="mt-1">{endpoint.category}</Chip>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Detailed Endpoint Documentation */}
          <div className="space-y-8">
            {/* Resolve Library */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Chip color="primary" variant="solid">POST</Chip>
                  <h3 className="text-xl font-semibold text-gray-900">/api/v1/resolve</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 mb-6">
                  Resolve a library search term to get the exact library ID and metadata.
                </p>
                
                <Tabs>
                  <Tab key="request" title="Request">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Request Body</h4>
                      <CodeBlock code={resolveExample} id="resolve-request" />
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Parameters</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li><code>search_term</code> (string) - The library name to search for</li>
                          <li><code>limit</code> (number, optional) - Maximum results to return (default: 10)</li>
                        </ul>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="response" title="Response">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Response</h4>
                      <CodeBlock code={resolveResponse} id="resolve-response" />
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>

            {/* Get Documentation */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Chip color="primary" variant="solid">POST</Chip>
                  <h3 className="text-xl font-semibold text-gray-900">/api/v1/docs</h3>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 mb-6">
                  Get relevant documentation snippets for a specific library based on your query.
                </p>
                
                <Tabs>
                  <Tab key="request" title="Request">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Request Body</h4>
                      <CodeBlock code={docsExample} id="docs-request" />
                      
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">Parameters</h5>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li><code>library_id</code> (string) - Library ID from resolve endpoint</li>
                          <li><code>prompt</code> (string) - Your question or search query</li>
                          <li><code>limit</code> (number, optional) - Maximum snippets to return (default: 5)</li>
                        </ul>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="response" title="Response">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Response</h4>
                      <CodeBlock code={docsResponse} id="docs-response" />
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>

          {/* Rate Limits */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Rate Limits</h2>
            </CardHeader>
            <CardBody>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100</div>
                  <div className="text-sm text-gray-600">requests/month</div>
                  <div className="text-xs text-gray-500 mt-1">Free Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10,000</div>
                  <div className="text-sm text-gray-600">requests/month</div>
                  <div className="text-xs text-gray-500 mt-1">Pro Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Unlimited</div>
                  <div className="text-sm text-gray-600">requests/month</div>
                  <div className="text-xs text-gray-500 mt-1">Enterprise Plan</div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Error Codes */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Error Codes</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <Chip color="danger" size="sm">400</Chip>
                  <span className="font-medium text-red-800">Bad Request - Invalid parameters</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <Chip color="danger" size="sm">401</Chip>
                  <span className="font-medium text-red-800">Unauthorized - Invalid API key</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Chip color="warning" size="sm">429</Chip>
                  <span className="font-medium text-yellow-800">Too Many Requests - Rate limit exceeded</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <Chip color="danger" size="sm">500</Chip>
                  <span className="font-medium text-red-800">Internal Server Error</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}