'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { Github, Star, Terminal, Command, Zap, Shield, Palette, ArrowRight, Copy, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function JunoCLIPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = "pip install juno-agent";
  
  const basicUsageCode = `# Start Juno Agent
juno-agent

# Or with specific model
juno-agent --model gpt-5

# Universal AI tool setup
juno-agent --setup`;

  const advancedUsageCode = `import asyncio
from juno_cli import JunoCLI

async def main():
    # Initialize Juno CLI programmatically
    cli = JunoCLI(
        model="claude-4",  # or "gpt-5", "gemini-2.5-pro"
        api_key="your-api-key",
        ui_mode="fancy",   # Rich TUI experience
        
        # Project intelligence
        auto_scan=True,
        project_context=True,
        
        # Advanced features
        enable_tracing=True,
        storage_backend="sqlite"
    )
    
    try:
        # Start interactive session
        await cli.start_session()
    finally:
        await cli.cleanup()

asyncio.run(main())`;

  const tuiExampleCode = `# Terminal User Interface Features

┌─ JUNO AI CLI ─────────────────────────────────────────────────────────┐
│ 🤖 Model: GPT-5 (OpenAI) | 💰 Cost: $0.0023 | 🔄 Context: 47.2K     │
├───────────────────────────────────────────────────────────────────────┤
│ Project: my-react-app (React 18.3.1, TypeScript 5.4.5)              │
│ Git: main branch ✓ clean | Dependencies: ✓ up-to-date               │
└───────────────────────────────────────────────────────────────────────┘

💬 Chat with AI about your code...

> /model
┌─ Available Models ────────────────────────────────────────────────────┐
│ 🟢 GPT-5 (OpenAI) - Latest & Best - 128K context 👁️ 🔧            │
│ 🟢 Claude-4 (Anthropic) - Advanced reasoning - 200K context 👁️ 🔧   │
│ 🟢 Gemini 2.5 Pro (Google) - Massive context - 2M tokens 👁️ 🔧     │
│ 🟡 Grok 4 Code (xAI) - Code specialist - 131K context 🔧           │
│ 🔵 DeepSeek R1 (OpenRouter) - Free tier - 64K context 🔧           │
└───────────────────────────────────────────────────────────────────────┘

> Analyze my React components for performance issues

🔍 Tool: glob - Scanning for React components...
📁 Found: 23 .tsx files, 15 .jsx files

🔍 Tool: grep - Searching for performance anti-patterns...
⚠️  Found 3 potential issues:
  - useState in render loops (App.tsx:45)
  - Missing useMemo for expensive calculations (Dashboard.tsx:78)
  - Inline object creation in props (UserList.tsx:23)

✨ Generating optimization recommendations...`;

  const configExampleCode = `# ~/.juno-cli/config.yaml
models:
  default: "gpt-5"
  providers:
    openai:
      api_key: "your-openai-key"
      models: ["gpt-5", "gpt-4o", "gpt-4o-mini"]
    anthropic:
      api_key: "your-anthropic-key" 
      models: ["claude-4", "claude-3-5-sonnet"]
    google:
      api_key: "your-gemini-key"
      models: ["gemini-2.5-pro", "gemini-1.5-flash"]

ui:
  mode: "fancy"  # or "simple"
  theme: "dark"
  show_tokens: true
  show_cost: true

project:
  auto_scan: true
  languages: ["python", "javascript", "typescript", "rust", "go"]
  frameworks: ["react", "nextjs", "django", "flask", "fastapi"]

tracing:
  enabled: true
  provider: "phoenix"`;

  return (
    <>
      <Navbar />
      <main>
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Terminal className="w-4 h-4" />
              Universal AI Tool Configuration Hub
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Juno Agent
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The world's first Universal AI Tool Configuration Hub. One setup command configures 26+ AI tools (Cursor, Claude Code, Windsurf, VS Code) 
              with current dependency docs. Never configure AI tools manually again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                as={Link} 
                href="https://github.com/askbudi/juno-agent" 
                color="primary" 
                size="lg" 
                className="font-semibold"
                startContent={<Github className="w-5 h-5" />}
              >
                View on GitHub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                as={Link}
                href="/juno-cli/docs"
                variant="bordered" 
                size="lg"
                className="font-semibold"
                startContent={<Play className="w-5 h-5" />}
              >
                Read Documentation
              </Button>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <Chip color="success" variant="flat">26+ AI Tools Setup</Chip>
              <Chip color="primary" variant="flat">50+ AI Models</Chip>
              <Chip color="secondary" variant="flat">Universal Config</Chip>
              <Chip color="warning" variant="flat">Version-Specific Docs</Chip>
              <Chip color="danger" variant="flat">AGPL-3.0 License</Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Never Configure AI Tools Manually Again</h2>
            <p className="text-lg text-gray-600">Revolutionary Universal Setup System - one command configures 26+ AI tools with current dependency documentation</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Installation</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(installCode, 'install')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {installCode}
                </SyntaxHighlighter>
                {copiedCode === 'install' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Basic Usage</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(basicUsageCode, 'basic')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {basicUsageCode}
                </SyntaxHighlighter>
                {copiedCode === 'basic' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* External Context Hero */}
      <div className="py-16 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">One Command, 26+ AI Tools Configured</h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
              While other AI tools compete for your attention, Juno Agent makes ALL of them work better together. Universal setup system 
              configures Cursor, Claude Code, Windsurf, VS Code, and 22+ more tools with version-specific dependency documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardBody className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Universal AI Tool Configuration</h3>
                <p className="text-white/80 text-sm">
                  Configures Cursor, Claude Code, Windsurf, VS Code, Copilot, and 21+ other AI tools with one command.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardBody className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Version-Specific Context</h3>
                <p className="text-white/80 text-sm">
                  Every AI tool gets current docs for your exact React 18.3.1, not outdated React 16 training data.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardBody className="p-6 text-center">
                <div className="bg-white/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Local-First Privacy</h3>
                <p className="text-white/80 text-sm">
                  Documentation cached locally with symlinks. Your code and context never leave your machine.
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full text-lg font-medium">
              <Star className="w-5 h-5" />
              World's First Universal AI Tool Configuration Hub
            </div>
          </div>
        </div>
      </div>

      {/* Universal Setup Demo */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Revolutionary Universal Setup System</h2>
            <p className="text-lg text-gray-600">Watch how one command transforms ALL your AI tools</p>
          </div>

          <Card className="shadow-xl bg-gray-900 text-white">
            <CardBody className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-green-400 mb-2">$ juno-agent --setup</h3>
                <p className="text-gray-400">Configuring 26+ AI tools...</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">✅ AI Tools Configured</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-green-300">✓ Cursor - .cursorrules created</div>
                    <div className="text-green-300">✓ Claude Code - CLAUDE.md created</div>
                    <div className="text-green-300">✓ Windsurf - .windsurfrules created</div>
                    <div className="text-green-300">✓ VS Code - settings.json updated</div>
                    <div className="text-green-300">✓ GitHub Copilot - configured</div>
                    <div className="text-green-300">✓ JetBrains AI - AGENTS.md created</div>
                    <div className="text-gray-400">✓ + 20 more tools...</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">📚 Context Distributed</h4>
                  <div className="space-y-2 text-sm">
                    <div className="text-yellow-300">→ React 18.3.1 docs fetched</div>
                    <div className="text-yellow-300">→ TypeScript 5.4.5 docs fetched</div>
                    <div className="text-yellow-300">→ Next.js 14.2.1 docs fetched</div>
                    <div className="text-yellow-300">→ Tailwind CSS 3.4.0 docs fetched</div>
                    <div className="text-green-300">→ external_context/ symlinks created</div>
                    <div className="text-green-300">→ MCP server installed & configured</div>
                    <div className="text-blue-300">→ All AI tools now have current docs</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-700">
                <p className="text-center text-green-300 font-medium">
                  🎉 Setup complete! All your AI tools now work with current dependency documentation.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Model Support */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Switzerland of AI Coding Tools</h2>
            <p className="text-lg text-gray-600">Complete model freedom - 50+ AI models, any provider, no vendor lock-in</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-blue-600 mb-2">OpenAI + Open Source</h3>
                <p className="text-sm text-gray-600">GPT-5, O3/O4, GPT-4.1 Code + Llama 3.3, DeepSeek R1, CodeLlama</p>
                <Chip size="sm" color="primary" variant="flat" className="mt-2">No Lock-in</Chip>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg border-2 border-purple-200 bg-purple-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-purple-600 mb-2">Anthropic + Local</h3>
                <p className="text-sm text-gray-600">Claude-4, Opus 4.1, Sonnet 4 + Ollama local models</p>
                <Chip size="sm" color="secondary" variant="flat" className="mt-2">Privacy-First</Chip>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg border-2 border-green-200 bg-green-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-green-600 mb-2">Google + Free Tier</h3>
                <p className="text-sm text-gray-600">Gemini 2.5 Pro/Flash + OpenRouter free models</p>
                <Chip size="sm" color="success" variant="flat" className="mt-2">Cost-Effective</Chip>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg border-2 border-orange-200 bg-orange-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-orange-600 mb-2">Any LiteLLM Model</h3>
                <p className="text-sm text-gray-600">xAI Grok 4, Groq, Custom endpoints, Self-hosted</p>
                <Chip size="sm" color="warning" variant="flat" className="mt-2">Complete Freedom</Chip>
              </CardBody>
            </Card>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Interactive Model Selection</h3>
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                <div className="text-green-400">$ juno-cli</div>
                <div className="mt-2">
                  <span className="text-blue-300">Welcome to JUNO AI CLI</span><br/>
                  <span className="text-gray-400">Select your preferred model:</span><br/>
                  <span className="text-yellow-300">🟢 GPT-5 (OpenAI) - Latest & Best - 128K context 👁️ 🔧</span><br/>
                  <span className="text-purple-300">🟢 Claude-4 (Anthropic) - Advanced reasoning - 200K 👁️ 🔧</span><br/>
                  <span className="text-green-300">🟢 Gemini 2.5 Pro (Google) - Massive context - 2M 👁️ 🔧</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Advanced TUI Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Terminal User Interface</h2>
            <p className="text-lg text-gray-600">Sophisticated TUI powered by Textual framework with rich interactivity</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-violet-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Rich Visual Interface</h3>
                <p className="text-gray-600 text-sm">
                  Modern TUI with real-time status, visual tool tracking, and professional branding
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Command className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Commands</h3>
                <p className="text-gray-600 text-sm">
                  Intelligent autocomplete, command history, and context-aware suggestions
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-600 text-sm">
                  Live cost tracking, token usage, and tool execution visualization
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Project Intelligence</h3>
                <p className="text-gray-600 text-sm">
                  Automatic scanning for languages, frameworks, and dependencies
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Hybrid Messages</h3>
                <p className="text-gray-600 text-sm">
                  Rich markdown rendering with text selection and tool call expansion
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Professional Workflow</h3>
                <p className="text-gray-600 text-sm">
                  Git integration, session management, and comprehensive keyboard shortcuts
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* TUI Demo */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See the TUI in Action</h2>
            <p className="text-lg text-gray-600">Experience the sophisticated terminal interface</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Interactive Terminal Experience</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(tuiExampleCode, 'tui')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                {tuiExampleCode}
              </div>
              {copiedCode === 'tui' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Configuration */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Configuration</h2>
            <p className="text-lg text-gray-600">Customize every aspect of your AI development environment</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Global Configuration</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(configExampleCode, 'config')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <SyntaxHighlighter
                language="yaml"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              >
                {configExampleCode}
              </SyntaxHighlighter>
              {copiedCode === 'config' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Competitive Comparison */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Juno Agent?</h2>
            <p className="text-lg text-gray-600">2025 market comparison - see why we're different</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">2025 AI Tools (Cursor $9B, Copilot Multi-Model)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Fight for exclusive attention</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Manual setup for each tool</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Outdated training data context</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Hidden pricing & limits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Editor-only or basic CLI</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 transform scale-105">
              <CardBody className="p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4" />
                    Juno Agent
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-violet-700">The Smart Choice</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Universal AI tool configuration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Version-specific documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">50+ models, any provider</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Real-time cost tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Local-first privacy</span>
                  </li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Future Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Never switch tools again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Always up-to-date context</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Optimize costs across models</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Enterprise-ready security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Open source flexibility</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect For Professional Developers</h2>
            <p className="text-lg text-gray-600">Ideal use cases for terminal-based AI development</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🏗️ Code Development & Architecture</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Smart code generation with specialized models</li>
                  <li>• Code review and refactoring assistance</li>
                  <li>• Interactive debugging with tool visualization</li>
                  <li>• Architecture planning for large codebases</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🚀 Project Setup & Management</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automatic dependency detection and documentation</li>
                  <li>• Environment setup with AI guidance</li>
                  <li>• CI/CD configuration and optimization</li>
                  <li>• Multi-framework project intelligence</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🎓 Learning & Exploration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Technology research with multiple AI models</li>
                  <li>• Best practices and architectural patterns</li>
                  <li>• Tool discovery and framework comparison</li>
                  <li>• Complex codebase understanding</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🏢 Enterprise Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standardized AI workflows across teams</li>
                  <li>• Local model support for sensitive projects</li>
                  <li>• Cost monitoring and optimization</li>
                  <li>• Observability with Phoenix tracing</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-violet-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Fighting with Outdated AI - Start Building Better</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the external context revolution. Get current dependency documentation, model freedom, and local-first privacy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              href="https://github.com/askbudi/juno-cli" 
              size="lg" 
              className="bg-white text-violet-600 font-semibold hover:bg-gray-100"
              startContent={<Github className="w-5 h-5" />}
            >
              Get Started on GitHub
            </Button>
            <Button 
              as={Link} 
              href="/juno-cli/docs" 
              variant="bordered" 
              size="lg"
              className="border-white text-white font-semibold hover:bg-white/10"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}