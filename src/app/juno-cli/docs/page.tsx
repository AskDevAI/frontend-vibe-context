'use client';

import { Button, Card, CardBody, Chip, Input, Breadcrumbs, BreadcrumbItem, Accordion, AccordionItem } from '@heroui/react';
import { 
  Github, 
  Terminal, 
  Command, 
  Zap, 
  Shield, 
  Palette, 
  ArrowRight, 
  Copy, 
  Play,
  Search,
  BookOpen,
  Settings,
  Keyboard,
  Code2,
  Home,
  Lightbulb,
  Monitor,
  Cpu,
  Eye,
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function JunoCLIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Code examples
  const installCode = `# Install Juno CLI
pip install juno-cli

# Verify installation
juno-cli --version`;

  const basicSetupCode = `# First-time setup
juno-cli --setup

# Start Juno CLI with default model
juno-cli

# Start with specific model
juno-cli --model gpt-5

# Start in debug mode
juno-cli --debug --trace`;

  const externalContextCode = `# External Context System Setup
juno-cli

# In the TUI, use commands:
/setup
# Select "Configure External Context"
# Choose libraries to document (React, Next.js, etc.)
# Juno automatically fetches current documentation

# Example: Auto-configure for React project
cd my-react-app
juno-cli
# Juno detects: React 18.3.1, TypeScript 5.4.5
# Automatically configures AI context with latest docs`;

  const modelConfigCode = `# ~/.juno-cli/config.yaml
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
    xai:
      api_key: "your-xai-key"
      models: ["grok-4", "grok-4-code"]

ui:
  mode: "fancy"  # or "simple"
  theme: "dark"
  show_tokens: true
  show_cost: true

project:
  auto_scan: true
  languages: ["python", "javascript", "typescript", "rust", "go"]
  frameworks: ["react", "nextjs", "django", "flask", "fastapi"]`;

  const tuiDemoCode = `┌─ JUNO AI CLI ─────────────────────────────────────────────────────────┐
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
└───────────────────────────────────────────────────────────────────────┘`;

  const programmingExampleCode = `import asyncio
from juno_cli import JunoCLI

async def main():
    # Initialize Juno CLI programmatically
    cli = JunoCLI(
        model="claude-4",  # or "gpt-5", "gemini-2.5-pro"
        api_key="your-api-key",
        ui_mode="fancy",   # Rich TUI experience
        
        # External context features
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

  // Navigation sections
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      subsections: [
        { id: 'installation', title: 'Installation' },
        { id: 'first-time-setup', title: 'First-time Setup' },
        { id: 'quick-start', title: 'Quick Start' }
      ]
    },
    {
      id: 'external-context',
      title: 'External Context System',
      icon: Shield,
      subsections: [
        { id: 'what-is-external-context', title: 'What is External Context?' },
        { id: 'automatic-documentation', title: 'Automatic Documentation' },
        { id: 'setup-benefits', title: 'Setup & Benefits' }
      ]
    },
    {
      id: 'model-support',
      title: 'Model Support',
      icon: Cpu,
      subsections: [
        { id: 'supported-providers', title: 'Supported Providers' },
        { id: 'model-selection', title: 'Model Selection' },
        { id: 'cost-optimization', title: 'Cost Optimization' }
      ]
    },
    {
      id: 'tui-interface',
      title: 'TUI Interface',
      icon: Monitor,
      subsections: [
        { id: 'interface-overview', title: 'Interface Overview' },
        { id: 'navigation-guide', title: 'Navigation Guide' },
        { id: 'interactive-elements', title: 'Interactive Elements' }
      ]
    },
    {
      id: 'command-reference',
      title: 'Command Reference',
      icon: Terminal,
      subsections: [
        { id: 'slash-commands', title: 'Slash Commands' },
        { id: 'cli-arguments', title: 'CLI Arguments' },
        { id: 'command-examples', title: 'Command Examples' }
      ]
    },
    {
      id: 'keyboard-shortcuts',
      title: 'Keyboard Shortcuts',
      icon: Keyboard,
      subsections: [
        { id: 'global-shortcuts', title: 'Global Shortcuts' },
        { id: 'input-shortcuts', title: 'Input Shortcuts' },
        { id: 'context-shortcuts', title: 'Context-Specific Shortcuts' }
      ]
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: Settings,
      subsections: [
        { id: 'config-files', title: 'Configuration Files' },
        { id: 'environment-variables', title: 'Environment Variables' },
        { id: 'multi-project-setup', title: 'Multi-project Setup' }
      ]
    },
    {
      id: 'tips-tricks',
      title: 'Tips & Tricks',
      icon: Lightbulb,
      subsections: [
        { id: 'power-user-features', title: 'Power User Features' },
        { id: 'best-practices', title: 'Best Practices' },
        { id: 'troubleshooting', title: 'Troubleshooting' }
      ]
    }
  ];

  const keyboardShortcuts = [
    { category: 'Global Shortcuts', shortcuts: [
      { keys: 'Ctrl+C', action: 'Quit', description: 'Exit the application' },
      { keys: 'Ctrl+Q', action: 'Quit', description: 'Exit the application' },
      { keys: 'Ctrl+N', action: 'New Chat', description: 'Clear conversation and start fresh' },
      { keys: 'Ctrl+R', action: 'Toggle Tool Details', description: 'Expand/collapse all tool call details' },
      { keys: 'F1', action: 'History', description: 'Open conversation history viewer' },
      { keys: 'F2', action: 'Copy', description: 'Copy selected text to clipboard' },
      { keys: 'Ctrl+S', action: 'Toggle Selection', description: 'Enter/exit text selection mode' }
    ]},
    { category: 'Input Shortcuts', shortcuts: [
      { keys: 'Enter', action: 'Submit Message', description: 'Send message or select autocomplete option' },
      { keys: 'Shift+Enter', action: 'New Line', description: 'Insert line break in multi-line input' },
      { keys: 'Ctrl+J', action: 'New Line', description: 'Alternative line break shortcut' },
      { keys: 'Tab', action: 'Autocomplete', description: 'Complete command or navigate autocomplete' },
      { keys: 'Up Arrow', action: 'History Navigate', description: 'Navigate to previous command' },
      { keys: 'Down Arrow', action: 'History Navigate', description: 'Navigate to next command' },
      { keys: 'Escape', action: 'Cancel/Hide', description: 'Close autocomplete or cancel selection' }
    ]},
    { category: 'Context-Specific', shortcuts: [
      { keys: 'Enter or C', action: 'Start Chat', description: 'From Welcome Screen' },
      { keys: 'S', action: 'Setup', description: 'Run setup wizard from Welcome Screen' },
      { keys: 'Ctrl+W', action: 'Welcome Screen', description: 'Return to welcome from chat' },
      { keys: '/', action: 'Commands', description: 'Trigger command autocomplete' },
      { keys: 'Delete', action: 'Delete Session', description: 'Delete selected session in history' }
    ]}
  ];

  const slashCommands = [
    { command: '/help', description: 'Show comprehensive help with all available commands and shortcuts', example: '/help' },
    { command: '/cost', description: 'Display detailed token usage and cost breakdown for current session', example: '/cost' },
    { command: '/new-chat', description: 'Clear conversation history and free up context', example: '/new-chat' },
    { command: '/reset', description: 'Clear conversation history (alias for /new-chat)', example: '/reset' },
    { command: '/clear', description: 'Clear conversation history (alias for /reset)', example: '/clear' },
    { command: '/compact', description: 'Clear conversation history but keep a summary in context', example: '/compact [custom instructions]' },
    { command: '/history', description: 'View and manage conversation history with interactive interface', example: '/history' },
    { command: '/setup', description: 'Run setup wizard to configure API keys, editor, model, etc.', example: '/setup' },
    { command: '/model', description: 'Configure AI model, provider, and API keys with interactive menu', example: '/model' },
    { command: '/quit', description: 'Exit the application', example: '/quit' }
  ];

  const filteredSections = sections.filter(section => 
    searchQuery === '' || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections.some(sub => sub.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/juno-cli">Juno CLI</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>Documentation</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <Input
                  placeholder="Search documentation..."
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeSection === section.id 
                            ? 'bg-violet-100 text-violet-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.title}
                      </button>
                      
                      {/* Subsections */}
                      <div className="ml-7 mt-1 space-y-1">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => scrollToSection(subsection.id)}
                            className={`block w-full px-3 py-1 text-sm text-left rounded transition-colors ${
                              activeSection === subsection.id 
                                ? 'text-violet-600 font-medium' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="https://github.com/askbudi/juno-cli" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600">
                    <Github className="w-4 h-4" />
                    GitHub Repository
                  </Link>
                  <Link href="/juno-cli" className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600">
                    <ArrowRight className="w-4 h-4" />
                    Back to Juno CLI
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Juno CLI Documentation
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Complete guide to using Juno CLI - the revolutionary external context system that keeps AI tools updated with your exact dependencies.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  as={Link} 
                  href="https://github.com/askbudi/juno-cli" 
                  color="primary" 
                  startContent={<Github className="w-4 h-4" />}
                >
                  View on GitHub
                </Button>
                <Button 
                  variant="bordered" 
                  startContent={<Play className="w-4 h-4" />}
                >
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Content Sections */}
            
            {/* Getting Started */}
            <section id="getting-started" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-violet-600" />
                Getting Started
              </h2>

              <div id="installation" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Installation</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Install Juno CLI</h4>
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
              </div>

              <div id="first-time-setup" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">First-time Setup</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Basic Setup Commands</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onClick={() => copyToClipboard(basicSetupCode, 'setup')}
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
                      {basicSetupCode}
                    </SyntaxHighlighter>
                    {copiedCode === 'setup' && (
                      <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                    )}
                  </CardBody>
                </Card>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Setup Wizard Steps</h4>
                  <ol className="text-blue-800 space-y-1 list-decimal list-inside">
                    <li>API Key Setup - Secure entry with provider detection</li>
                    <li>Editor Selection - Integration with popular editors</li>
                    <li>Model Configuration - Provider and model selection</li>
                    <li>Project Scanning - Automatic dependency detection</li>
                    <li>MCP Server Setup - External context configuration</li>
                  </ol>
                </div>
              </div>

              <div id="quick-start" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Start Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Basic Usage</h4>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div className="text-green-400">$ juno-cli</div>
                        <div className="text-gray-300 mt-1">Welcome to JUNO AI CLI</div>
                        <div className="text-blue-300 mt-1">💬 Ready to chat...</div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">With Specific Model</h4>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div className="text-green-400">$ juno-cli --model gpt-5</div>
                        <div className="text-gray-300 mt-1">Using GPT-5 (OpenAI)</div>
                        <div className="text-yellow-300 mt-1">🤖 Model: GPT-5 Ready</div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </section>

            {/* External Context System */}
            <section id="external-context" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-violet-600" />
                External Context System
              </h2>

              <div id="what-is-external-context" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is External Context?</h3>
                <Card className="shadow-lg bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
                  <CardBody className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield className="w-8 h-8 text-violet-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Problem Solved</h4>
                        <p className="text-sm text-gray-600">
                          AI tools fail because they don&apos;t know your exact dependency versions
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="w-8 h-8 text-purple-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">
                          Automatic documentation fetching for your exact dependency versions
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="w-8 h-8 text-blue-600" />
                        </div>
                        <h4 className="font-semibold mb-2">Result</h4>
                        <p className="text-sm text-gray-600">
                          AI knows your exact React 18.3.1, not generic React knowledge
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div id="automatic-documentation" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Automatic Documentation Setup</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">External Context Configuration</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onClick={() => copyToClipboard(externalContextCode, 'context')}
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
                      {externalContextCode}
                    </SyntaxHighlighter>
                    {copiedCode === 'context' && (
                      <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                    )}
                  </CardBody>
                </Card>
              </div>

              <div id="setup-benefits" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Benefits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Version-Specific Knowledge
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• React 18.3.1 specific features and APIs</li>
                        <li>• TypeScript 5.4.5 latest syntax</li>
                        <li>• Framework-specific best practices</li>
                        <li>• Current dependency documentation</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        One Setup, All Tools
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Configures Claude Code automatically</li>
                        <li>• Works with Cursor and Copilot</li>
                        <li>• Supports 20+ AI coding tools</li>
                        <li>• Consistent context everywhere</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </section>

            {/* Model Support */}
            <section id="model-support" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Cpu className="w-8 h-8 text-violet-600" />
                Model Support
              </h2>

              <div id="supported-providers" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Supported Providers</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
                    <CardBody className="p-4 text-center">
                      <h4 className="font-semibold text-blue-600 mb-2">OpenAI + Open Source</h4>
                      <p className="text-sm text-gray-600 mb-3">GPT-5, O3/O4, GPT-4.1 Code + Llama 3.3, DeepSeek R1</p>
                      <Chip size="sm" color="primary" variant="flat">No Lock-in</Chip>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-lg border-2 border-purple-200 bg-purple-50">
                    <CardBody className="p-4 text-center">
                      <h4 className="font-semibold text-purple-600 mb-2">Anthropic + Local</h4>
                      <p className="text-sm text-gray-600 mb-3">Claude-4, Opus 4.1, Sonnet 4 + Ollama models</p>
                      <Chip size="sm" color="secondary" variant="flat">Privacy-First</Chip>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-lg border-2 border-green-200 bg-green-50">
                    <CardBody className="p-4 text-center">
                      <h4 className="font-semibold text-green-600 mb-2">Google + Free Tier</h4>
                      <p className="text-sm text-gray-600 mb-3">Gemini 2.5 Pro/Flash + OpenRouter free models</p>
                      <Chip size="sm" color="success" variant="flat">Cost-Effective</Chip>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-lg border-2 border-orange-200 bg-orange-50">
                    <CardBody className="p-4 text-center">
                      <h4 className="font-semibold text-orange-600 mb-2">Any LiteLLM Model</h4>
                      <p className="text-sm text-gray-600 mb-3">xAI Grok 4, Groq, Custom endpoints</p>
                      <Chip size="sm" color="warning" variant="flat">Complete Freedom</Chip>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div id="model-selection" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Model Selection</h3>
                <Card className="shadow-xl">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">TUI Model Browser</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onClick={() => copyToClipboard(tuiDemoCode, 'tui-demo')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                      {tuiDemoCode}
                    </div>
                    {copiedCode === 'tui-demo' && (
                      <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                    )}
                  </CardBody>
                </Card>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Vision Capable</span>
                    </div>
                    <p className="text-sm text-green-700">Models that can analyze images and screenshots</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Function Calling</span>
                    </div>
                    <p className="text-sm text-blue-700">Models with tool execution capabilities</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">High Context</span>
                    </div>
                    <p className="text-sm text-purple-700">Models with large context windows (128K-2M tokens)</p>
                  </div>
                </div>
              </div>

              <div id="cost-optimization" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cost Optimization</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <h4 className="font-semibold mb-4">Real-time Cost Tracking</h4>
                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mb-4">
                      <div className="text-yellow-300">$ /cost</div>
                      <div className="text-gray-300 mt-2">
                        💰 Session Cost: $0.0023<br/>
                        📊 Input tokens: 1,245 ($0.0015)<br/>
                        📤 Output tokens: 567 ($0.0008)<br/>
                        🔄 Total tokens: 1,812
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <h5 className="font-medium text-green-800 mb-1">Free Tier Models</h5>
                        <p className="text-sm text-green-700">DeepSeek R1, Gemini 2.5 Flash via OpenRouter</p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded border border-blue-200">
                        <h5 className="font-medium text-blue-800 mb-1">Cost-Effective</h5>
                        <p className="text-sm text-blue-700">GPT-4o-mini, Claude Haiku, Llama via Groq</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded border border-purple-200">
                        <h5 className="font-medium text-purple-800 mb-1">Premium Models</h5>
                        <p className="text-sm text-purple-700">GPT-5, Claude-4, Gemini 2.5 Pro</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </section>

            {/* TUI Interface */}
            <section id="tui-interface" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Monitor className="w-8 h-8 text-violet-600" />
                TUI Interface
              </h2>

              <div id="interface-overview" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interface Overview</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6 text-center">
                      <Palette className="w-8 h-8 text-violet-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Rich Visual Interface</h4>
                      <p className="text-sm text-gray-600">Modern TUI with real-time status, visual tool tracking, and professional branding</p>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6 text-center">
                      <Command className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Smart Commands</h4>
                      <p className="text-sm text-gray-600">Intelligent autocomplete, command history, and context-aware suggestions</p>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6 text-center">
                      <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Real-time Updates</h4>
                      <p className="text-sm text-gray-600">Live cost tracking, token usage, and tool execution visualization</p>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div id="navigation-guide" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Navigation Guide</h3>
                <Accordion>
                  <AccordionItem key="welcome" title="Welcome Screen">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• System status overview (working directory, git status, API keys)</li>
                        <li>• Setup completion indicators with visual symbols (✓, ✗, ⚠️)</li>
                        <li>• Quick start guidance and next steps</li>
                        <li>• Professional JUNO ASCII art branding</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="chat" title="Chat Screen">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• Hybrid message display with Rich markdown rendering</li>
                        <li>• Tool call visualization with hierarchical organization</li>
                        <li>• Expandable tool details (toggle with Ctrl+R)</li>
                        <li>• Smart message selection with dual-mode widgets</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="model-selection" title="Model Selection">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• Visual provider selection with arrow key navigation</li>
                        <li>• Model comparison with token limits and capabilities</li>
                        <li>• API key configuration with secure input</li>
                        <li>• Real-time validation and feedback</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="history" title="History Viewer">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• Session browsing with date/time stamps</li>
                        <li>• Message search and filtering capabilities</li>
                        <li>• Session restoration and continuation</li>
                        <li>• Export/import functionality</li>
                      </ul>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>

              <div id="interactive-elements" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Elements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Enhanced Input System</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Multiline support with Shift+Enter</li>
                        <li>• Smart autocomplete with Tab completion</li>
                        <li>• Command history with arrow keys</li>
                        <li>• History autocomplete for sessions</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Tool Call Features</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Expandable tool call details</li>
                        <li>• Syntax highlighting for code/JSON</li>
                        <li>• Progress indicators for operations</li>
                        <li>• Copy functionality for outputs</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </section>

            {/* Command Reference */}
            <section id="command-reference" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-violet-600" />
                Command Reference
              </h2>

              <div id="slash-commands" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Slash Commands</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      {slashCommands.map((cmd, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <code className="text-lg font-semibold text-violet-600 bg-violet-50 px-2 py-1 rounded">
                              {cmd.command}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              isIconOnly
                              onClick={() => copyToClipboard(cmd.example, `cmd-${index}`)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600 mb-1">{cmd.description}</p>
                          <code className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {cmd.example}
                          </code>
                          {copiedCode === `cmd-${index}` && (
                            <div className="text-green-600 text-sm mt-1">Copied to clipboard!</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div id="cli-arguments" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">CLI Arguments</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      <div className="text-yellow-300">juno-cli [OPTIONS] [COMMAND]</div>
                      <div className="mt-4 space-y-2">
                        <div><span className="text-blue-300">--workdir, -w PATH</span><span className="text-gray-300 ml-4">Working directory (defaults to current)</span></div>
                        <div><span className="text-blue-300">--debug</span><span className="text-gray-300 ml-4">Enable debug mode with detailed logging</span></div>
                        <div><span className="text-blue-300">--trace</span><span className="text-gray-300 ml-4">Enable Phoenix tracing (requires arize-phoenix)</span></div>
                        <div><span className="text-blue-300">--ui-mode TEXT</span><span className="text-gray-300 ml-4">UI mode: &lsquo;simple&rsquo; or &lsquo;fancy&rsquo;</span></div>
                        <div><span className="text-blue-300">--help</span><span className="text-gray-300 ml-4">Show help message</span></div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div id="command-examples" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Command Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Basic Commands</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli
                        </div>
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli --model claude-4
                        </div>
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli --setup
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Advanced Commands</h4>
                      <div className="space-y-3">
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli --debug --trace
                        </div>
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli --ui-mode simple
                        </div>
                        <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                          <span className="text-green-400">$</span> juno-cli version
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section id="keyboard-shortcuts" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Keyboard className="w-8 h-8 text-violet-600" />
                Keyboard Shortcuts
              </h2>

              <div className="space-y-8">
                {keyboardShortcuts.map((category, categoryIndex) => (
                  <div key={categoryIndex} id={category.category.toLowerCase().replace(/\s+/g, '-')}>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{category.category}</h3>
                    <Card className="shadow-lg">
                      <CardBody className="p-6">
                        <div className="grid gap-4">
                          {category.shortcuts.map((shortcut, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="flex gap-1">
                                  {shortcut.keys.split('+').map((key, keyIndex) => (
                                    <span key={keyIndex}>
                                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-sm font-mono">
                                        {key}
                                      </kbd>
                                      {keyIndex < shortcut.keys.split('+').length - 1 && (
                                        <span className="mx-1 text-gray-500">+</span>
                                      )}
                                    </span>
                                  ))}
                                </div>
                                <div>
                                  <div className="font-medium">{shortcut.action}</div>
                                  <div className="text-sm text-gray-600">{shortcut.description}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="w-8 h-8 text-violet-600" />
                Configuration
              </h2>

              <div id="config-files" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Configuration Files</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Global Configuration</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onClick={() => copyToClipboard(modelConfigCode, 'config')}
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
                      {modelConfigCode}
                    </SyntaxHighlighter>
                    {copiedCode === 'config' && (
                      <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                    )}
                  </CardBody>
                </Card>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Global Configuration (~/.juno-cli/)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Shared across all projects</li>
                        <li>• API keys and default model settings</li>
                        <li>• UI preferences and themes</li>
                        <li>• Files: config.yaml, .env, .gitignore</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold mb-3">Local Configuration (.juno-cli/)</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Project-specific settings</li>
                        <li>• Override global settings</li>
                        <li>• Workspace data and libraries</li>
                        <li>• Setup completion status</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div id="environment-variables" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Environment Variables</h3>
                <Accordion>
                  <AccordionItem key="api-keys" title="API Key Configuration">
                    <div className="p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Primary Providers</h5>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li><code>ANTHROPIC_API_KEY</code> - Claude models</li>
                            <li><code>OPENAI_API_KEY</code> - GPT models</li>
                            <li><code>XAI_API_KEY</code> - Grok models</li>
                            <li><code>GOOGLE_API_KEY</code> - Gemini models</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Additional Providers</h5>
                          <ul className="space-y-1 text-sm text-gray-600">
                            <li><code>GROQ_API_KEY</code> - Groq hosted models</li>
                            <li><code>OPENROUTER_API_KEY</code> - OpenRouter models</li>
                            <li><code>TOGETHER_API_KEY</code> - TogetherAI models</li>
                            <li><code>MANUAL_LLM_API_KEY</code> - Custom provider</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="backend" title="Backend Configuration">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li><code>ASKBUDI_BACKEND_URL</code> - Backend service URL (default: https://ts-endpoint.askbudi.ai)</li>
                        <li><code>ASKBUDI_API_KEY</code> - Juno platform API key</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="tracing" title="Tracing Configuration">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li><code>PHOENIX_PROJECT_NAME</code> - Project name for tracing (default: juno-cli)</li>
                        <li><code>PHOENIX_ENDPOINT</code> - Tracing endpoint (default: https://app.phoenix.arize.com/v1/traces)</li>
                      </ul>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>

              <div id="multi-project-setup" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Multi-project Setup</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <h4 className="font-semibold mb-4">Project-specific Configurations</h4>
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      <div className="text-green-400"># Project A (React + TypeScript)</div>
                      <div className="text-gray-300">~/projects/react-app/.juno-cli/config.yaml</div>
                      <div className="text-blue-300 mt-2">
                        default_model: &ldquo;gpt-5&rdquo;<br/>
                        context_libraries: [&ldquo;react&rdquo;, &ldquo;typescript&rdquo;, &ldquo;next.js&rdquo;]<br/>
                        ui_mode: &ldquo;fancy&rdquo;
                      </div>
                      
                      <div className="text-green-400 mt-4"># Project B (Python + Django)</div>
                      <div className="text-gray-300">~/projects/django-api/.juno-cli/config.yaml</div>
                      <div className="text-purple-300 mt-2">
                        default_model: &ldquo;claude-4&rdquo;<br/>
                        context_libraries: [&ldquo;django&rdquo;, &ldquo;python&rdquo;, &ldquo;postgresql&rdquo;]<br/>
                        ui_mode: &ldquo;simple&rdquo;
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section id="tips-tricks" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-violet-600" />
                Tips & Tricks
              </h2>

              <div id="power-user-features" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Power User Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-blue-700 mb-3">Multi-line Input</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Use <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Shift+Enter</kbd> or <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Ctrl+J</kbd> for line breaks</li>
                        <li>• Perfect for code blocks and complex queries</li>
                        <li>• Maintains formatting in conversation</li>
                        <li>• Syntax highlighting for code input</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-green-700 mb-3">Selection Mode</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Ctrl+S</kbd> to enter text selection mode</li>
                        <li>• Select any text in the chat area</li>
                        <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">F2</kbd> to copy selected text to clipboard</li>
                        <li>• Useful for extracting code snippets</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-purple-700 mb-3">Command Chaining</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Use <code>/compact [instructions]</code> for targeted summarization</li>
                        <li>• Combine <code>/new-chat</code> with immediate follow-up</li>
                        <li>• Chain tool calls for complex workflows</li>
                        <li>• Strategic context management</li>
                      </ul>
                    </CardBody>
                  </Card>

                  <Card className="shadow-lg">
                    <CardBody className="p-6">
                      <h4 className="font-semibold text-orange-700 mb-3">Model Switching</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Fast models (Groq) for quick questions</li>
                        <li>• Powerful models (Claude-4, GPT-5) for complex coding</li>
                        <li>• Local models (Ollama) for privacy</li>
                        <li>• Use <code>/model</code> to switch mid-conversation</li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div id="best-practices" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Best Practices</h3>
                <Accordion>
                  <AccordionItem key="context-management" title="Context Management">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• Use <code>/compact [instructions]</code> instead of <code>/reset</code> to maintain context</li>
                        <li>• Strategic use of <code>/new-chat</code> when switching topics</li>
                        <li>• Monitor token usage with <code>/cost</code> to optimize conversations</li>
                        <li>• Submit relevant documentation to external context system</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="cost-optimization" title="Cost Optimization">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• Monitor usage with <code>/cost</code> command regularly</li>
                        <li>• Use appropriate model for task complexity</li>
                        <li>• Leverage free tier models for development</li>
                        <li>• Use <code>/compact</code> to reduce context while maintaining information</li>
                      </ul>
                    </div>
                  </AccordionItem>
                  <AccordionItem key="workflow" title="Workflow Optimization">
                    <div className="p-4">
                      <ul className="space-y-2 text-gray-600">
                        <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Up/Down arrows</kbd> for quick command recall</li>
                        <li>• <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">F1</kbd> for full history browser with search</li>
                        <li>• Session restoration for continuing work across days</li>
                        <li>• Use project-specific configurations for different workflows</li>
                      </ul>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>

              <div id="troubleshooting" className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Troubleshooting</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <h4 className="font-semibold mb-4">Common Issues & Solutions</h4>
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-medium text-red-700 mb-2">API Key Issues</h5>
                        <div className="p-3 bg-red-50 rounded border border-red-200">
                          <p className="text-sm text-red-800 mb-2">Error: &ldquo;Invalid API key&rdquo; or &ldquo;Unauthorized&rdquo;</p>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Run <code>/setup</code> to reconfigure API keys</li>
                            <li>• Check environment variables are set correctly</li>
                            <li>• Verify API key has proper permissions</li>
                            <li>• Ensure no extra spaces in API key</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-yellow-700 mb-2">TUI Display Issues</h5>
                        <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-sm text-yellow-800 mb-2">Garbled display or weird characters</p>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• Try <code>--ui-mode simple</code> for compatibility</li>
                            <li>• Ensure terminal supports UTF-8 encoding</li>
                            <li>• Update terminal software if possible</li>
                            <li>• Use <code>--debug</code> flag for detailed logs</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-blue-700 mb-2">Performance Issues</h5>
                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm text-blue-800 mb-2">Slow responses or high token usage</p>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Use <code>/cost</code> to monitor token usage</li>
                            <li>• Try faster models like Groq for simple queries</li>
                            <li>• Use <code>/compact</code> to reduce context size</li>
                            <li>• Enable <code>--trace</code> for performance analysis</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-green-700 mb-2">Debug Mode</h5>
                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <p className="text-sm text-green-800 mb-2">For detailed troubleshooting</p>
                          <div className="bg-gray-900 text-white p-2 rounded text-sm font-mono">
                            <span className="text-green-400">$</span> juno-cli --debug --trace
                          </div>
                          <p className="text-sm text-green-700 mt-2">Logs saved to app_run.log in current directory</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </section>

            {/* Programming API */}
            <section id="programming-api" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-violet-600" />
                Programming API
              </h2>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Programmatic Usage</h3>
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Initialize Juno CLI Programmatically</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onClick={() => copyToClipboard(programmingExampleCode, 'programming')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {programmingExampleCode}
                    </SyntaxHighlighter>
                    {copiedCode === 'programming' && (
                      <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                    )}
                  </CardBody>
                </Card>
              </div>
            </section>

          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-violet-600 text-white p-3 rounded-full shadow-lg hover:bg-violet-700 transition-colors z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </main>
      <Footer />
    </>
  );
}