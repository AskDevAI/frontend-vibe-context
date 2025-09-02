'use client';

import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { 
  Book, 
  Code2, 
  Zap, 
  Download, 
  ExternalLink, 
  ArrowRight,
  Terminal,
  Globe,
  Key
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const quickStartSteps = [
  {
    step: '1',
    title: 'Get Your API Key',
    description: 'Sign up and generate your API key from the dashboard',
    icon: Key,
    color: 'bg-blue-500'
  },
  {
    step: '2', 
    title: 'Install MCP Server',
    description: 'Set up the AskBudi MCP server for your AI tools',
    icon: Download,
    color: 'bg-green-500'
  },
  {
    step: '3',
    title: 'Start Querying',
    description: 'Search for library documentation and get instant results',
    icon: Zap,
    color: 'bg-purple-500'
  }
];

const resources = [
  {
    title: 'API Reference',
    description: 'Complete API documentation with examples and response formats',
    icon: Book,
    href: '/docs/api',
    badge: 'Essential'
  },
  {
    title: 'MCP Server Guide', 
    description: 'Setup instructions for Claude Code, Cursor, and Windsurf integration',
    icon: Terminal,
    href: '/docs/mcp-server',
    badge: 'Popular'
  },
  {
    title: 'Code Examples',
    description: 'Sample code and integration examples in multiple languages',
    icon: Code2,
    href: '/docs/examples', 
    badge: 'New'
  },
  {
    title: 'Libraries Supported',
    description: 'Browse the complete list of supported libraries and packages',
    icon: Globe,
    href: '/docs/libraries',
    badge: null
  },
  {
    title: 'Juno CLI Documentation',
    description: 'Complete guide for the revolutionary terminal-based AI development environment',
    icon: Terminal,
    href: '/juno-cli/docs',
    badge: 'Featured'
  }
];

const codeExample = `# Run the MCP server directly
npx -y askbudi-context@latest

# Configure your API key and platform
export ASKBUDI_API_KEY="your-api-key-here"
export PLATFORM="claude"

# Now ask Claude Code:
# "How do I create a FastAPI endpoint with validation?"

# AskBudi automatically provides the latest FastAPI docs!`;

export default function DocsPage() {
  return (
    <main>
      <Navbar />
      
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Developer Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to integrate AskBudi with your AI tools and get 
              access to the latest library documentation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                color="primary" 
                size="lg"
                as={Link}
                href="/docs/api"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Get Started
              </Button>
              <Button 
                variant="bordered" 
                size="lg"
                as={Link}
                href="/auth/signup"
                endContent={<ExternalLink className="w-4 h-4" />}
              >
                Get API Key
              </Button>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Quick Start</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {quickStartSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center justify-center mb-3">
                        <span className="text-sm font-semibold text-gray-500 mr-2">Step</span>
                        <span className="text-2xl font-bold text-gray-900">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Code Example */}
          <div className="mb-20">
            <Card className="bg-gray-900 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-gray-400 text-sm">Quick Setup</span>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </CardBody>
            </Card>
          </div>

          {/* Documentation Resources */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Documentation</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                    as={Link}
                    href={resource.href}
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                            {resource.badge && (
                              <Chip 
                                size="sm" 
                                variant="flat"
                                color={
                                  resource.badge === 'Essential' ? 'primary' :
                                  resource.badge === 'Popular' ? 'success' :
                                  resource.badge === 'Featured' ? 'secondary' : 'warning'
                                }
                              >
                                {resource.badge}
                              </Chip>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{resource.description}</p>
                          <div className="flex items-center text-blue-600 text-sm font-medium">
                            Learn more <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Support Section */}
          <div className="text-center">
            <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
              <CardBody className="p-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Need Help?</h3>
                <p className="text-blue-800 mb-6">
                  Can&apos;t find what you&apos;re looking for? Our team is here to help you get started 
                  with AskBudi.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    color="primary"
                    as="a"
                    href="mailto:founders@askbudi.ai"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    variant="bordered"
                    as="a" 
                    href="https://github.com/askbudi/examples"
                    target="_blank"
                    endContent={<ExternalLink className="w-4 h-4" />}
                  >
                    GitHub Examples
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}