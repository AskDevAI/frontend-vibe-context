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
    category: 'AskBudi'
  },
  {
    icon: Download,
    title: 'MCP Server Integration',
    description: 'Works with Claude Code, Cursor, Windsurf, and any MCP-compatible IDE out of the box.',
    color: 'bg-purple-500',
    category: 'Integration'
  },
  {
    icon: Zap,
    title: '25+ Built-in Tools',
    description: 'From file operations to web scraping, TinyAgent comes with everything you need to build powerful agents.',
    color: 'bg-yellow-500',
    category: 'TinyAgent'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Production-grade security with API key management, rate limiting, and audit logging.',
    color: 'bg-green-500',
    category: 'TinyAgent'
  },
  {
    icon: Code2,
    title: 'Three-Tier Architecture',
    description: 'TinyAgent + TinyCodeAgent + Subagent Swarm for scalable, distributed AI agent systems.',
    color: 'bg-red-500',
    category: 'TinyAgent'
  },
  {
    icon: GitBranch,
    title: 'Model Flexibility',
    description: 'Support for OpenAI, Anthropic, Google, and custom providers with seamless switching.',
    color: 'bg-indigo-500',
    category: 'TinyAgent'
  },
];

const integrations = [
  {
    name: 'Claude Code',
    description: 'Native MCP support',
    icon: '🤖',
  },
  {
    name: 'Python',
    description: 'TinyAgent library',
    icon: '🐍',
  },
  {
    name: 'OpenAI/Anthropic',
    description: 'Multi-provider AI',
    icon: '🧠',
  },
  {
    name: 'Docker',
    description: 'Containerized agents',
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
            Complete AI Development
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {' '}Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            From intelligent documentation retrieval with AskBudi to autonomous agent development 
            with TinyAgent's three-tier architecture. Everything you need for modern AI development 
            in one integrated platform.
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
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-gray-600">Agent tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">&lt;100ms</div>
                <div className="text-gray-600">API response</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3-Tier</div>
                <div className="text-gray-600">Architecture</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}