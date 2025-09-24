'use client';

import { Button, Card, CardBody, Tabs, Tab } from '@heroui/react';
import {
  Copy, Check, Github, Database, Zap, ShieldCheck, ChevronsRight
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function RoundtablePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [installationMethod, setInstallationMethod] = useState('pip');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };


  const heroPrompt = `The user dashboard is randomly slow for enterprise customers.

Use Gemini SubAgent to analyze frontend performance issues in the React components, especially expensive re-renders and inefficient data fetching.

Use Codex SubAgent to examine the backend API endpoint for N+1 queries and database bottlenecks.

Use Claude SubAgent to review the infrastructure logs and identify memory/CPU pressure during peak hours.`;


  const architectureDiagram = `
    +----------------------------------+
    | Your IDE (VS Code, Cursor, etc.) |
    | (Primary AI Assistant)           |
    +----------------+-----------------+
                     |
    (1. User prompt with subagent delegation)
                     |
    +----------------v-----------------+
    |      Roundtable MCP Server       |
    |         (localhost)              |
    +----------------+-----------------+
                     |
    (2. Dispatches tasks to sub-agent CLIs in parallel)
                     |
+--------------------v--------------------+
|                                         |
|  +-----------+   +-----------+   +-----------+  |
|  |  Gemini   |   |  Claude   |   |   Codex   |  |
|  | (Analysis)|   |  (Logic)  |   | (Implement)| |
|  +-----------+   +-----------+   +-----------+  |
|                                         |
+--------------------^--------------------+
                     |
    (3. Sub-agents execute using local tools,
        e.g., read_file, run_shell_command)
                     |
    +----------------+-----------------+
    |      Roundtable MCP Server       |
    | (Aggregates & Synthesizes)       |
    +----------------+-----------------+
                     |
(4. Returns a single, synthesized response)
                     |
    +----------------v-----------------+
    | Your IDE (Primary AI Assistant)  |
    +----------------------------------+
  `;

  return (
    <>
      <Navbar />
      <main className="bg-gray-950 text-gray-300">

        {/* Hero Section: Lead with a real example */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Roundtable AI</span> MCP Server
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Stop copy-pasting between AI models. Roundtable AI is a local MCP server that lets your primary AI assistant delegate tasks to specialized models like Gemini, Claude, Codex, and Cursor. Solve complex engineering problems in parallel, directly from your IDE.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 flex items-center gap-3">
                <code className="text-green-400 font-mono text-sm">
                  <span className="text-blue-400">$</span> pip install roundtable-ai
                </code>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-700"
                  onClick={() => copyToClipboard('pip install roundtable-ai', 'hero-install')}
                >
                  {copied === 'hero-install' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                as="a"
                href="#installation"
                variant="bordered"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                Install in IDEs →
              </Button>
            </div>
          </div>

          <div className="mt-12 bg-gray-900/90 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
            {/* Claude Code Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-gray-300">Claude Code</span>
              </div>
              <span className="text-sm text-gray-400">~/my-project</span>
            </div>

            {/* Single prompt view */}
            <div className="bg-gray-900 p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <ChevronsRight size={18} className="text-blue-400" />
                  Multi-Agent Debugging Prompt
                </h3>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                  onClick={() => copyToClipboard(heroPrompt, 'hero-prompt')}
                >
                  {copied === 'hero-prompt' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="bg-gray-950 rounded-lg border border-gray-700 p-4">
                <SyntaxHighlighter
                  language="markdown"
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    fontSize: '0.9rem',
                    padding: 0,
                    margin: 0
                  }}
                >
                  {heroPrompt}
                </SyntaxHighlighter>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  <span className="text-blue-400">✨ Claude Code</span> with Roundtable AI will delegate this to specialized subagents and synthesize their findings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Not Just More Tabs? */}
        <div className="py-16 sm:py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Why Not Just Use Multiple Tabs?</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Because manual context-switching is slow, error-prone, and prevents deep analysis.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div className="border border-red-800/50 bg-red-950/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-red-400">The Multi-Tab Workflow</h3>
                <ul className="mt-4 text-left space-y-2 text-sm text-gray-400 list-disc list-inside">
                  <li>Manually copy-paste code and context between different AI chats.</li>
                  <li>Each agent starts fresh, unaware of other conversations or files.</li>
                  <li>You wait for one agent to finish before starting the next.</li>
                  <li>You are responsible for merging disparate, often conflicting, advice.</li>
                  <li>High risk of pasting outdated code or incorrect context.</li>
                </ul>
              </div>
              <div className="border border-green-800/50 bg-green-950/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400">The Roundtable Workflow</h3>
                <ul className="mt-4 text-left space-y-2 text-sm text-gray-400 list-disc list-inside">
                  <li>Delegate tasks from a single prompt in your IDE.</li>
                  <li>The primary agent provides shared, rich context to all sub-agents.</li>
                  <li>All agents work in parallel, drastically reducing wait time.</li>
                  <li>The final output automatically synthesizes the best insights from each model.</li>
                  <li>The entire workflow is a single, deterministic, and repeatable command.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Technical Architecture</h2>
              <p className="mt-4 text-lg text-gray-400">Roundtable is a local Model Context Protocol (MCP) server that coordinates sub-agents.</p>
            </div>
            <div className="mt-12">
              <Card className="bg-gray-900 border border-gray-700">
                <CardBody>
                  <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ background: 'transparent', fontSize: '0.8rem', textAlign: 'left' }}>
                    {architectureDiagram}
                  </SyntaxHighlighter>
                </CardBody>
              </Card>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white">1. Context Continuity</h4>
                  <p className="mt-2 text-sm text-gray-400">The initial prompt and relevant file/project context are packaged by the primary agent. The MCP server passes this &ldquo;context bundle&rdquo; to each sub-agent, ensuring all participants have the same ground truth without manual copy-pasting.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white">2. Model Specialization</h4>
                  <p className="mt-2 text-sm text-gray-400">Use the right model for the job. Leverage Gemini&apos;s 1M context for codebase analysis, Claude&apos;s reasoning for logic and implementation, and Codex&apos;s proficiency for code generation and reviews, all in one workflow.</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h4 className="font-semibold text-white">3. No Extra Cost</h4>
                  <p className="mt-2 text-sm text-gray-400">Roundtable invokes the CLI tools you already have installed and configured. It uses your existing API keys and subscriptions. We add no markup. The cost is exactly what you would pay running the tools manually.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Use Cases Section */}
        <div className="py-16 sm:py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Real-World Multi-Agent Workflows</h2>
              <p className="mt-4 text-lg text-gray-400">Developer-tested use cases that show clear value over single AI tools</p>
            </div>
            <div className="mt-12 space-y-8">

              {/* Virtual War Room */}
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Virtual War Room: Multi-Stack Bug Analysis</h3>
                      <p className="mt-2 text-gray-400">
                        <strong>Problem:</strong> &ldquo;The user dashboard is randomly slow for enterprise customers&rdquo; - could be frontend, backend, database, or infrastructure.
                      </p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-400 text-sm">Gemini SubAgent</h4>
                          <p className="text-xs text-gray-400 mt-1">Frontend analysis: identifies expensive re-renders and inefficient data-fetching patterns in React components</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sky-400 text-sm">Codex SubAgent</h4>
                          <p className="text-xs text-gray-400 mt-1">Backend analysis: detects N+1 query problems and suggests JOIN optimizations</p>
                        </div>
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-400 text-sm">Claude SubAgent</h4>
                          <p className="text-xs text-gray-400 mt-1">Infrastructure analysis: correlates slowness with memory limits and suggests scaling</p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-green-400">
                        <strong>Result:</strong> Instant virtual &ldquo;war room&rdquo; with senior engineers from different teams, providing holistic stack analysis in minutes instead of hours.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Flaky CI Triage */}
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Automated Flaky Test Autopilot</h3>
                      <p className="mt-2 text-gray-400">
                        <strong>Problem:</strong> CI randomly fails, digging through 10k+ lines of logs and reproducing race conditions wastes hours.
                      </p>
                      <div className="mt-4 bg-gray-800/30 p-4 rounded-lg">
                        <div className="text-sm text-gray-300">
                          <strong>Multi-agent loop:</strong> Log clustering → hypothesis generation → automated experiments → change-point analysis → repro script generation
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-green-400">
                        <strong>Output:</strong> <code className="bg-gray-800 px-2 py-1 rounded text-xs">scripts/repro_flake_&lt;id&gt;.sh</code> with exact seed/flags and a PR with the fix or quarantine rationale.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* CVE Security Audit */}
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">Proactive CVE Analysis & Patching</h3>
                      <p className="mt-2 text-gray-400">
                        <strong>Scenario:</strong> Critical RCE vulnerability announced for a library your project depends on. Need to act fast.
                      </p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="bg-gray-800/50 p-3 rounded text-center">
                          <div className="text-xs text-blue-400 font-medium">CVE Research</div>
                          <div className="text-xs text-gray-400 mt-1">Analyze vulnerability</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded text-center">
                          <div className="text-xs text-purple-400 font-medium">Code Scanning</div>
                          <div className="text-xs text-gray-400 mt-1">Find all usages</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded text-center">
                          <div className="text-xs text-green-400 font-medium">Patch Generation</div>
                          <div className="text-xs text-gray-400 mt-1">Create fix commands</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded text-center">
                          <div className="text-xs text-orange-400 font-medium">Critical Review</div>
                          <div className="text-xs text-gray-400 mt-1">Assess side effects</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-green-400">
                        <strong>Value:</strong> Turns multi-hour high-stress manual process into fast automated workflow with senior engineer-level review.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-400 mb-4">These workflows combine research, analysis, code generation, and critical review—exactly what multi-agent systems excel at.</p>
              <Button
                as={Link}
                href="https://github.com/askbudi/roundtable"
                target="_blank"
                variant="bordered"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                See More Examples on GitHub
              </Button>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div id="installation" className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Installation & IDE Setup</h2>
              <p className="mt-4 text-lg text-gray-400">Install Roundtable AI and configure it with 26+ supported MCP clients</p>
            </div>

            {/* Quick Start */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Start</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-lg relative">
                <div className="p-4 border-b border-gray-700">
                  <span className="text-sm font-mono text-gray-400"># Install Roundtable AI</span>
                </div>
                <div className="p-4">
                  <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: 0 }}>
{`# Install Roundtable AI
pip install roundtable-ai

# Check available AI tools
roundtable-ai --check

# Start with all available tools
roundtable-ai

# Use specific assistants only
roundtable-ai --agents codex,claude`}
                  </SyntaxHighlighter>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={() => copyToClipboard(`# Install Roundtable AI\npip install roundtable-ai\n\n# Check available AI tools\nroundtable-ai --check\n\n# Start with all available tools\nroundtable-ai\n\n# Use specific assistants only\nroundtable-ai --agents codex,claude`, 'quickstart')}
                  >
                    {copied === 'quickstart' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Installation Methods with Tabs */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-6">IDE Configuration (Top 7)</h3>
              <Tabs
                aria-label="Installation methods"
                selectedKey={installationMethod}
                onSelectionChange={(key) => setInstallationMethod(key as string)}
                className="w-full"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-700 bg-transparent",
                  cursor: "w-full bg-blue-500",
                  tab: "max-w-fit px-0 h-12",
                  tabContent: "group-data-[selected=true]:text-blue-400 text-gray-400 font-medium"
                }}
              >
                <Tab key="pip" title="Using pip (Standard)">
                  <div className="mt-6 space-y-6">{/* IDE Configuration without UV */}
              <div className="space-y-6">

                {/* Claude Code */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    1. Claude Code
                  </h4>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`claude mcp add roundtable-ai -- roundtable-ai --agents gemini,claude,codex,cursor`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('claude mcp add roundtable-ai -- roundtable-ai --agents gemini,claude,codex,cursor', 'claude-config')}
                    >
                      {copied === 'claude-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Cursor */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    2. Cursor
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">.cursor/mcp.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "roundtable-ai",
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "roundtable-ai",\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'cursor-config')}
                    >
                      {copied === 'cursor-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Claude Desktop */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    3. Claude Desktop
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.config/claude_desktop_config.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "roundtable-ai",
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "roundtable-ai",\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'claude-desktop-config')}
                    >
                      {copied === 'claude-desktop-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* VS Code */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    4. VS Code
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">Add to <code className="bg-gray-800 px-2 py-1 rounded">settings.json</code>:</p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcp.servers": {
    "roundtable-ai": {
      "command": "roundtable-ai",
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcp.servers": {\n    "roundtable-ai": {\n      "command": "roundtable-ai",\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'vscode-config')}
                    >
                      {copied === 'vscode-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* OpenAI Codex */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    5. OpenAI Codex
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.codex/config.toml</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="toml" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`# IMPORTANT: the top-level key is 'mcp_servers' rather than 'mcpServers'.
[mcp_servers.roundtable-ai]
command = "roundtable-ai"
args = []
env = { "CLI_MCP_SUBAGENTS" = "codex,claude,cursor,gemini" }`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`# IMPORTANT: the top-level key is 'mcp_servers' rather than 'mcpServers'.\n[mcp_servers.roundtable-ai]\ncommand = "roundtable-ai"\nargs = []\nenv = { "CLI_MCP_SUBAGENTS" = "codex,claude,cursor,gemini" }`, 'codex-config')}
                    >
                      {copied === 'codex-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Windsurf */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    6. Windsurf
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.codeium/windsurf/mcp_config.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "roundtable-ai",
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "roundtable-ai",\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'windsurf-config')}
                    >
                      {copied === 'windsurf-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Gemini CLI */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    7. Gemini CLI
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.gemini/settings.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "roundtable-ai",
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "roundtable-ai",\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'gemini-config')}
                    >
                      {copied === 'gemini-config' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

                  </div>
                </Tab>

                <Tab key="uvx" title="Using UV/UVX">
                  <div className="mt-6 space-y-6">

                {/* Claude Code */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    1. Claude Code
                  </h4>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`claude mcp add roundtable-ai -- uvx roundtable-ai@latest --agents gemini,claude,codex,cursor`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('claude mcp add roundtable-ai -- uvx roundtable-ai@latest --agents gemini,claude,codex,cursor', 'claude-config-uvx')}
                    >
                      {copied === 'claude-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Cursor */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    2. Cursor
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">.cursor/mcp.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "type": "stdio",
      "command": "uvx",
      "args": [
        "roundtable-ai@latest"
      ],
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "type": "stdio",\n      "command": "uvx",\n      "args": [\n        "roundtable-ai@latest"\n      ],\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'cursor-config-uvx')}
                    >
                      {copied === 'cursor-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Claude Desktop */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                    3. Claude Desktop
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.config/claude_desktop_config.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "uvx",
      "args": ["roundtable-ai@latest"],
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "uvx",\n      "args": ["roundtable-ai@latest"],\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'claude-desktop-config-uvx')}
                    >
                      {copied === 'claude-desktop-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* VS Code */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    4. VS Code
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">Add to <code className="bg-gray-800 px-2 py-1 rounded">settings.json</code>:</p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcp.servers": {
    "roundtable-ai": {
      "command": "uvx",
      "args": ["roundtable-ai@latest"],
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcp.servers": {\n    "roundtable-ai": {\n      "command": "uvx",\n      "args": ["roundtable-ai@latest"],\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'vscode-config-uvx')}
                    >
                      {copied === 'vscode-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* OpenAI Codex */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    5. OpenAI Codex
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.codex/config.toml</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="toml" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`# IMPORTANT: the top-level key is 'mcp_servers' rather than 'mcpServers'.
[mcp_servers.roundtable-ai]
command = "uvx"
args = ["roundtable-ai@latest"]
env = { "CLI_MCP_SUBAGENTS" = "codex,claude,cursor,gemini" }`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`# IMPORTANT: the top-level key is 'mcp_servers' rather than 'mcpServers'.\n[mcp_servers.roundtable-ai]\ncommand = "uvx"\nargs = ["roundtable-ai@latest"]\nenv = { "CLI_MCP_SUBAGENTS" = "codex,claude,cursor,gemini" }`, 'codex-config-uvx')}
                    >
                      {copied === 'codex-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Windsurf */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    6. Windsurf
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.codeium/windsurf/mcp_config.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "uvx",
      "args": ["roundtable-ai@latest"],
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "uvx",\n      "args": ["roundtable-ai@latest"],\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'windsurf-config-uvx')}
                    >
                      {copied === 'windsurf-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Gemini CLI */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    7. Gemini CLI
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">File: <code className="bg-gray-800 px-2 py-1 rounded">~/.gemini/settings.json</code></p>
                  <div className="bg-gray-800 rounded relative">
                    <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '1rem' }}>
{`{
  "mcpServers": {
    "roundtable-ai": {
      "command": "uvx",
      "args": ["roundtable-ai@latest"],
      "env": {
        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"
      }
    }
  }
}`}
                    </SyntaxHighlighter>
                    <Button
                      isIconOnly
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(`{\n  "mcpServers": {\n    "roundtable-ai": {\n      "command": "uvx",\n      "args": ["roundtable-ai@latest"],\n      "env": {\n        "CLI_MCP_SUBAGENTS": "codex,claude,cursor,gemini"\n      }\n    }\n  }\n}`, 'gemini-config-uvx')}
                    >
                      {copied === 'gemini-config-uvx' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                  </div>
                </Tab>
              </Tabs>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400 mb-4">Roundtable AI supports 26+ MCP-compatible clients including JetBrains IDEs, GitHub Copilot, Zed, and more.</p>
                <Button
                  as={Link}
                  href="https://github.com/askbudi/roundtable"
                  target="_blank"
                  className="bg-gray-200 text-gray-950 font-semibold hover:bg-white"
                  startContent={<Github className="w-5 h-5" />}
                >
                  View Full Documentation on GitHub
                </Button>
              </div>
            </div>

            {/* Advanced Configuration */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-6">Advanced Configuration</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 relative">
                <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: 0 }}>
{`# Use environment variables for project-specific setup
export CLI_MCP_SUBAGENTS="codex,claude"
export CLI_MCP_DEBUG=true

# Override with command flags (highest priority)
roundtable-ai --agents gemini,claude

# Ignore availability checks
CLI_MCP_IGNORE_AVAILABILITY=true roundtable-ai`}
                </SyntaxHighlighter>
                <Button
                  isIconOnly
                  variant="ghost"
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(`# Use environment variables for project-specific setup\nexport CLI_MCP_SUBAGENTS="codex,claude"\nexport CLI_MCP_DEBUG=true\n\n# Override with command flags (highest priority)\nroundtable-ai --agents gemini,claude\n\n# Ignore availability checks\nCLI_MCP_IGNORE_AVAILABILITY=true roundtable-ai`, 'advanced-config')}
                >
                  {copied === 'advanced-config' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
