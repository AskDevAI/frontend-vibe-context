'use client';

import { Card, CardBody, CardHeader, Button, Tabs, Tab, Chip } from '@heroui/react';
import { ArrowLeft, Terminal, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const installationSteps = [
  {
    title: 'Install Node.js',
    description: 'Make sure you have Node.js 18+ installed on your system',
    code: 'node --version\n# Should return v18.0.0 or higher'
  },
  {
    title: 'Install AskBudi MCP Server',
    description: 'Install the MCP server globally using npm',
    code: 'npm install -g @askbudi/mcp-server'
  },
  {
    title: 'Set Your API Key',
    description: 'Configure your AskBudi API key as an environment variable',
    code: 'export ASKBUDI_API_KEY="your-api-key-here"\n# On Windows:\n# set ASKBUDI_API_KEY=your-api-key-here'
  }
];

const claudeCodeConfig = `{
  "mcpServers": {
    "askbudi": {
      "command": "askbudi-mcp-server",
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here"
      }
    }
  }
}`;

const cursorConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "askbudi-mcp-server",
        "args": [],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here"
        }
      }
    }
  }
}`;

const windsurfConfig = `# Add to your Windsurf settings.json
{
  "mcp.servers": {
    "askbudi": {
      "command": "askbudi-mcp-server",
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here"
      }
    }
  }
}`;

const usageExamples = [
  {
    tool: 'Claude Code',
    example: 'How do I set up authentication with NextAuth.js?',
    result: 'AskBudi will automatically fetch the latest NextAuth.js documentation and provide you with current authentication setup examples.'
  },
  {
    tool: 'Cursor',
    example: 'Show me how to use pandas for data analysis',
    result: 'Get up-to-date pandas documentation with relevant examples for data analysis tasks.'
  },
  {
    tool: 'Windsurf',
    example: 'What are the new features in React 18?',
    result: 'Access the latest React documentation covering concurrent features, suspense, and other React 18 improvements.'
  }
];

export default function McpServerDocsPage() {
  return (
    <main>
      <Navbar />
      
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MCP Server Setup</h1>
            <p className="text-xl text-gray-600">
              Connect AskBudi to Claude Code, Cursor, Windsurf, and other AI tools using the Model Context Protocol (MCP).
            </p>
          </div>

          {/* What is MCP */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">What is MCP?</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 mb-4">
                The Model Context Protocol (MCP) is an open standard that allows AI tools to securely access external data sources and tools. 
                By installing the AskBudi MCP server, your AI assistant can automatically fetch the latest documentation for any library 
                when you ask questions about it.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700">No manual context switching required</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700">Always up-to-date documentation</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700">Works with multiple AI tools</span>
              </div>
            </CardBody>
          </Card>

          {/* Installation Steps */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Installation</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {installationSteps.map((step, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      <pre>{step.code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Configuration for Different Tools */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">AI Tool Configuration</h2>
            </CardHeader>
            <CardBody>
              <Tabs>
                <Tab key="claude-code" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Claude Code</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Add the following configuration to your Claude Code settings:
                    </p>
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto"><code>{claudeCodeConfig}</code></pre>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> ~/.config/claude-code/claude_desktop_config.json
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="cursor" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Cursor</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Cursor to use the AskBudi MCP server:
                    </p>
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto"><code>{cursorConfig}</code></pre>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Cursor Settings → MCP Servers
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="windsurf" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Windsurf</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Add AskBudi to your Windsurf configuration:
                    </p>
                    <div className="bg-gray-900 text-white p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto"><code>{windsurfConfig}</code></pre>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Windsurf Settings → Extensions → MCP
                      </p>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>

          {/* Usage Examples */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Usage Examples</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {usageExamples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Chip size="sm" variant="flat">{example.tool}</Chip>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Your Question:</h4>
                        <p className="text-gray-700 italic">&quot;{example.example}&quot;</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">What Happens:</h4>
                        <p className="text-gray-600">{example.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Troubleshooting */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-900">Troubleshooting</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Server not found</h3>
                  <p className="text-gray-600 mb-2">Make sure the MCP server is installed globally:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm list -g @askbudi/mcp-server</code>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">API key errors</h3>
                  <p className="text-gray-600 mb-2">Verify your API key is set correctly:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">echo $ASKBUDI_API_KEY</code>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Permission issues</h3>
                  <p className="text-gray-600">On macOS/Linux, you might need to use sudo for global installation:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">sudo npm install -g @askbudi/mcp-server</code>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Next Steps */}
          <Card className="bg-green-50 border-green-200">
            <CardBody className="p-8 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-4">Ready to Go!</h3>
              <p className="text-green-800 mb-6">
                Once configured, your AI tool will automatically use AskBudi to fetch the latest 
                documentation when you ask about libraries and frameworks.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  color="success"
                  as={Link}
                  href="/auth/signup"
                >
                  Get Your API Key
                </Button>
                <Button 
                  variant="bordered"
                  as="a"
                  href="https://github.com/askbudi/mcp-server"
                  target="_blank"
                  endContent={<ExternalLink className="w-4 h-4" />}
                >
                  View on GitHub
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}