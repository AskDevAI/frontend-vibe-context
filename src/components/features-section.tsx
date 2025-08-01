'use client';

import { 
  Search, 
  Download, 
  Zap, 
  Shield, 
  Code2, 
  GitBranch 
} from 'lucide-react';
import { Card, CardBody } from '@heroui/react';

const features = [
  {
    icon: Search,
    title: 'Smart Library Search',
    description: 'Find any library across npm, PyPI, GitHub, and more with intelligent search and version matching.',
    color: 'bg-blue-500',
  },
  {
    icon: Download,
    title: 'MCP Server Integration',
    description: 'Works with Claude Code, Cursor, Windsurf, and any MCP-compatible IDE out of the box.',
    color: 'bg-purple-500',
  },
  {
    icon: Zap,
    title: 'Blazing Fast API',
    description: 'Sub-second response times with intelligent caching and optimized database queries.',
    color: 'bg-yellow-500',
  },
  {
    icon: Shield,
    title: 'API Key Security',
    description: 'Secure authentication with quota management, usage tracking, and billing integration.',
    color: 'bg-green-500',
  },
  {
    icon: Code2,
    title: 'Code-Aware Context',
    description: 'Analyzes your project structure to provide more relevant documentation snippets.',
    color: 'bg-red-500',
  },
  {
    icon: GitBranch,
    title: 'Auto-Updated Docs',
    description: 'GitHub App integration keeps documentation automatically synchronized with latest releases.',
    color: 'bg-indigo-500',
  },
];

const integrations = [
  {
    name: 'Claude Code',
    description: 'Native MCP support',
    icon: '🤖',
  },
  {
    name: 'Cursor',
    description: 'AI-powered IDE',
    icon: '⚡',
  },
  {
    name: 'Windsurf',
    description: 'Code with confidence',
    icon: '🏄',
  },
  {
    name: 'GitHub',
    description: 'Auto-sync repos',
    icon: '📦',
  },
];

export default function FeaturesSection() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {' '}modern AI development
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for developers who want their AI tools to have access to the latest, 
            most accurate documentation without the token overhead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardBody className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Integrations */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Works with your favorite tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <CardBody className="text-center p-6">
                  <div className="text-3xl mb-3">{integration.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {integration.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {integration.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-white shadow-lg">
          <CardBody className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-gray-600">Libraries indexed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <div className="text-gray-600">Token reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">&lt;100ms</div>
                <div className="text-gray-600">Average response</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-gray-600">Uptime SLA</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}