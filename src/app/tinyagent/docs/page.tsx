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
  ArrowUp,
  Users,
  Layers,
  Network,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function TinyAgentDocsPage() {
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
  const installCode = `# Requirements: Python 3.10+
pip install tinyagent-py

# Required dependencies (automatically installed):
# rich>=14.0.0, cloudpickle>=3.0.0, jinja2>=3.1.0, 
# pyyaml>=6.0.0, modal>=1.1.0 (for TinyCodeAgent)

# Verify installation
python -c "import tinyagent; print(tinyagent.__version__)"`;

  const basicSetupCode = `import asyncio
from tinyagent import TinyAgent

async def main():
    # Initialize TinyAgent with your preferred model
    agent = TinyAgent(
        model="gpt-4o-mini",  # or "claude-3-5-sonnet", "gpt-4o", etc.
        api_key="your-api-key"
    )
    
    try:
        result = await agent.run("Hello, TinyAgent!")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const architectureCode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.tools.subagent import create_general_subagent, create_coding_subagent
from tinyagent.tools.todo_write import enable_todo_write_tool

async def main():
    # Tier 1: TinyAgent - Main orchestrator
    main_agent = TinyAgent(
        model="gpt-4o",
        api_key="your-api-key",
        enable_todo_write=True  # Built-in task tracking
    )
    
    # Tier 2: TinyCodeAgent - Specialized coding assistant
    code_agent = create_coding_subagent(
        "coder",
        model="claude-3-5-sonnet",
        max_turns=25
    )
    
    # Tier 3: Subagent Swarm - Parallel task workers
    research_agent = create_general_subagent(
        "researcher", 
        model="gpt-4o-mini",
        max_turns=20
    )
    
    # Add subagents to main agent
    main_agent.add_tool(code_agent)
    main_agent.add_tool(research_agent)
    
    try:
        result = await main_agent.run("""
        Complex project workflow:
        1. Research AI trends 2024
        2. Code a data analysis script
        3. Track progress with todos
        4. Generate comprehensive report
        
        Use the coding subagent for implementation and 
        research subagent for information gathering.
        """)
        print(result)
    finally:
        await main_agent.close()

asyncio.run(main())`;

  const toolsCode = `# TinyAgent comes with 20 built-in tools:

# File Operations
- read_file, write_file, edit_file
- list_files, create_directory
- file_search, glob_search

# Code & Development  
- python_execute, shell_execute
- git_operations, code_analysis

# Web & Network
- web_fetch, web_search
- http_request, api_call

# Data Processing
- json_parse, csv_operations
- data_transform, regex_operations

# Task Management
- todo_write, task_tracking
- progress_monitor

# Subagent Tools
- subagent_create, subagent_delegate
- swarm_coordinate

# Storage & Memory
- session_storage, memory_store
- context_persist

# And many more...`;

  const enterpriseCode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.storage import JsonFileStorage, DatabaseStorage
from tinyagent.hooks.rich_ui_callback import RichUICallback
from tinyagent.hooks import anthropic_prompt_cache
from tinyagent.security import APIKeyManager, RateLimiter

async def main():
    # Enterprise-grade storage (None by default)
    storage = DatabaseStorage("postgresql://user:pass@localhost/agents")
    # Alternative: JsonFileStorage for file-based storage
    # storage = JsonFileStorage("./sessions")
    
    # Beautiful terminal UI
    ui = RichUICallback(markdown=True, show_thinking=True)
    
    # Cost optimization with prompt caching
    cache_callback = anthropic_prompt_cache()
    
    # Security features
    api_manager = APIKeyManager()
    rate_limiter = RateLimiter(requests_per_minute=100)
    
    agent = TinyAgent(
        model="claude-3-5-sonnet-20241022",
        api_key=api_manager.get_key("anthropic"),
        storage=storage,
        session_id="enterprise_session",
        enable_todo_write=True
    )
    
    # Add all callbacks and security
    agent.add_callback(cache_callback)
    agent.add_callback(ui)
    agent.add_callback(rate_limiter)
    
    try:
        result = await agent.run("Enterprise task processing")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const multiProviderCode = `# Multi-provider support via environment variables or direct API keys
import asyncio
import os
from tinyagent import TinyAgent

# OpenAI Models
openai_agent = TinyAgent(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY")
)

# Anthropic Models  
claude_agent = TinyAgent(
    model="claude-3-5-sonnet-20241022",
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

# Google Models
gemini_agent = TinyAgent(
    model="gemini-1.5-pro",
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Custom/Local Models (via LiteLLM)
custom_agent = TinyAgent(
    model="custom/your-model",
    api_key="your-custom-key",
    base_url="https://your-api-endpoint.com/v1"
)

# Agents automatically use the correct provider based on model name`;

  const navigationItems = [
    { id: 'getting-started', label: 'Getting Started', icon: Play },
    { id: 'architecture', label: 'Three-Tier Architecture', icon: Layers },
    { id: 'tools', label: '20 Built-in Tools', icon: Settings },
    { id: 'enterprise', label: 'Enterprise Features', icon: Shield },
    { id: 'providers', label: 'Multi-Provider Support', icon: Network },
    { id: 'examples', label: 'Use Cases', icon: Code2 },
    { id: 'api-reference', label: 'API Reference', icon: BookOpen },
    { id: 'best-practices', label: 'Best Practices', icon: Lightbulb },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <Breadcrumbs className="mb-6">
              <BreadcrumbItem href="/" startContent={<Home className="w-4 h-4" />}>
                Home
              </BreadcrumbItem>
              <BreadcrumbItem href="/tinyagent">TinyAgent</BreadcrumbItem>
              <BreadcrumbItem>Documentation</BreadcrumbItem>
            </Breadcrumbs>
            
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  TinyAgent
                </span>
                {' '}Documentation
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Complete guide to building intelligent agents with three-tier architecture, 
                20 built-in tools, enterprise security, and multi-provider flexibility.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  as={Link}
                  href="https://github.com/askbudi/tinyagent" 
                  color="primary" 
                  size="lg"
                  startContent={<Github className="w-5 h-5" />}
                >
                  View on GitHub
                </Button>
                <Button 
                  variant="bordered" 
                  size="lg"
                  onClick={() => scrollToSection('getting-started')}
                >
                  Quick Start Guide
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="sticky top-6">
                <Card className="p-4">
                  <Input
                    placeholder="Search documentation..."
                    startContent={<Search className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                  />
                  
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                            activeSection === item.id
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-12">
              {/* Getting Started */}
              <section id="getting-started">
                <Card>
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Play className="w-6 h-6 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Getting Started</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Installation</h3>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(installCode, 'install')}
                            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
                          >
                            <Copy className="w-4 h-4 text-white" />
                          </button>
                          <SyntaxHighlighter
                            language="bash"
                            style={vscDarkPlus}
                            customStyle={{ background: 'transparent', padding: 0 }}
                          >
                            {installCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Basic Usage</h3>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(basicSetupCode, 'basic')}
                            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
                          >
                            <Copy className="w-4 h-4 text-white" />
                          </button>
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{ background: 'transparent', padding: 0 }}
                          >
                            {basicSetupCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>

              {/* Three-Tier Architecture */}
              <section id="architecture">
                <Card>
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Layers className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Three-Tier Architecture</h2>
                    </div>

                    <div className="space-y-6">
                      <p className="text-lg text-gray-600">
                        TinyAgent's revolutionary three-tier architecture provides scalable, 
                        distributed AI agent systems with specialized roles and parallel processing.
                      </p>

                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-2 border-blue-200">
                          <CardBody className="p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Tier 1: TinyAgent</h4>
                            <p className="text-sm text-gray-600">Main orchestrator and decision maker. Coordinates tasks and manages overall workflow.</p>
                          </CardBody>
                        </Card>
                        
                        <Card className="border-2 border-purple-200">
                          <CardBody className="p-4">
                            <h4 className="font-semibold text-purple-900 mb-2">Tier 2: TinyCodeAgent</h4>
                            <p className="text-sm text-gray-600">Specialized coding assistant for development tasks with enhanced code understanding.</p>
                          </CardBody>
                        </Card>
                        
                        <Card className="border-2 border-green-200">
                          <CardBody className="p-4">
                            <h4 className="font-semibold text-green-900 mb-2">Tier 3: Subagent Swarm</h4>
                            <p className="text-sm text-gray-600">Parallel workers for distributed task execution and specialized operations.</p>
                          </CardBody>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Implementation Example</h3>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(architectureCode, 'architecture')}
                            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
                          >
                            <Copy className="w-4 h-4 text-white" />
                          </button>
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{ background: 'transparent', padding: 0 }}
                          >
                            {architectureCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>

              {/* Tools */}
              <section id="tools">
                <Card>
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Settings className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">20 Built-in Tools</h2>
                    </div>

                    <div className="space-y-6">
                      <p className="text-lg text-gray-600">
                        TinyAgent comes with a comprehensive toolkit for file operations, 
                        web scraping, code execution, data processing, and more.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-4">
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
                          customStyle={{ background: 'transparent', padding: 0 }}
                        >
                          {toolsCode}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>

              {/* Enterprise Features */}
              <section id="enterprise">
                <Card>
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <Shield className="w-6 h-6 text-red-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Enterprise Features</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-red-50 to-pink-50">
                          <CardBody className="p-6">
                            <Lock className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="font-semibold mb-2">Security & Authentication</h4>
                            <p className="text-sm text-gray-600">API key management, rate limiting, audit logging, and secure storage</p>
                          </CardBody>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                          <CardBody className="p-6">
                            <Monitor className="w-8 h-8 text-blue-600 mb-3" />
                            <h4 className="font-semibold mb-2">Monitoring & Analytics</h4>
                            <p className="text-sm text-gray-600">Performance tracking, cost monitoring, and usage analytics</p>
                          </CardBody>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Enterprise Implementation</h3>
                        <div className="bg-gray-900 rounded-lg p-4 relative">
                          <button
                            onClick={() => copyToClipboard(enterpriseCode, 'enterprise')}
                            className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
                          >
                            <Copy className="w-4 h-4 text-white" />
                          </button>
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{ background: 'transparent', padding: 0 }}
                          >
                            {enterpriseCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>

              {/* Multi-Provider Support */}
              <section id="providers">
                <Card>
                  <CardBody className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <Network className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Multi-Provider Support</h2>
                    </div>

                    <div className="space-y-6">
                      <p className="text-lg text-gray-600">
                        Seamlessly switch between OpenAI, Anthropic, Google, and custom providers. 
                        Automatic model routing based on task requirements.
                      </p>

                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <button
                          onClick={() => copyToClipboard(multiProviderCode, 'providers')}
                          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded"
                        >
                          <Copy className="w-4 h-4 text-white" />
                        </button>
                        <SyntaxHighlighter
                          language="yaml"
                          style={vscDarkPlus}
                          customStyle={{ background: 'transparent', padding: 0 }}
                        >
                          {multiProviderCode}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </section>

              {/* Quick Links */}
              <section id="quick-links">
                <Card>
                  <CardBody className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Links</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Button
                        as={Link}
                        href="https://github.com/askbudi/tinyagent"
                        variant="bordered"
                        size="lg"
                        className="h-16 justify-start"
                        startContent={<Github className="w-6 h-6" />}
                      >
                        <div className="text-left">
                          <div className="font-semibold">GitHub Repository</div>
                          <div className="text-sm text-gray-500">View source code and contribute</div>
                        </div>
                      </Button>
                      
                      <Button
                        as={Link}
                        href="/tinyagent"
                        variant="bordered"
                        size="lg"
                        className="h-16 justify-start"
                        startContent={<ArrowRight className="w-6 h-6" />}
                      >
                        <div className="text-left">
                          <div className="font-semibold">Back to TinyAgent</div>
                          <div className="text-sm text-gray-500">Main TinyAgent page</div>
                        </div>
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}