'use client';

import { Button, Card, CardBody } from '@heroui/react';
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const installCommand = "pip install roundtable-mcp";

  const heroPrompt = `Investigate a memory leak in our Next.js app.
The production server crashes after ~2 hours.

# Delegate tasks to specialized agents
- gemini: Analyze the entire codebase for memory leak patterns like unclosed connections, event listeners, and growing arrays. Use its 1M context window.
- claude: Review the attached heap dump and server logs to find the specific components or API routes consuming increasing memory.
- codex: Based on the findings, implement targeted fixes with proper cleanup patterns and monitoring code.`;

  const heroResult = `**Memory Leak Analysis Complete**

**Root Causes Identified:**

1.  **Database Connection Leak** (Critical)
    *   **Agent:** Gemini
    *   **Finding:** Prisma client connections were not being closed in API routes, causing a ~15MB leak per request.

2.  **Event Listener Leak** (High)
    *   **Agent:** Claude
    *   **Finding:** WebSocket connections in a \`ChatWidget\` component lacked cleanup in \`useEffect\`, leaving listeners attached.

**Fixes Implemented by Codex:**

\`\`\`diff
// src/lib/db.js
+ process.on('beforeExit', async () => {
+   await prisma.$disconnect()
+ })

// src/components/ChatWidget.tsx
useEffect(() => {
  const ws = new WebSocket(wsUrl);
  ws.onmessage = handleMessage;
+
+  return () => {
+    ws.close();
+  }
}, []);
\`\`​`;

  const architectureDiagram = `
    +----------------------------------+
    | Your IDE (VS Code, Cursor, etc.) |
    | (Primary AI Assistant)           |
    +----------------+-----------------+
                     |
    (1. User prompt with @-delegations)
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
|  |  @gemini  |   |  @claude  |   |   @codex  |  |
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
              Stop Copy-Pasting Between AI Models.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Roundtable is a local server that lets your primary AI assistant delegate tasks to a team of specialized models like Gemini, Claude, and Codex. Solve complex engineering problems in parallel, directly from your IDE.
            </p>
          </div>

          <div className="mt-12 bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <span className="text-sm text-gray-400">/Users/dev/my-project</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700">
              <div className="bg-gray-900 p-6">
                <h3 className="font-semibold text-white flex items-center gap-2"><ChevronsRight size={18} /> Your Prompt</h3>
                <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ background: 'transparent', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                  {heroPrompt}
                </SyntaxHighlighter>
              </div>
              <div className="bg-gray-900 p-6">
                <h3 className="font-semibold text-white flex items-center gap-2"><Zap size={16} className="text-green-400" /> Synthesized Result</h3>
                <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ background: 'transparent', fontSize: '0.875rem', padding: '0.5rem 0' }}>
                  {heroResult}
                </SyntaxHighlighter>
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
              <p className="mt-4 text-lg text-gray-400">Roundtable is a local Master Control Plane (MCP) server that coordinates sub-agents.</p>
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

        {/* Concrete Examples Section */}
        <div className="py-16 sm:py-20 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Delegate, Don&apos;t Micromanage</h2>
              <p className="mt-4 text-lg text-gray-400">Three examples of workflows that are tedious for a single AI but trivial with Roundtable.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3">
                    <Database className="w-8 h-8 text-sky-400" />
                    <h3 className="text-lg font-bold text-white">API Architecture Design</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">Design, audit, and optimize a new service endpoint from scratch.</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex gap-3"><b className="text-sky-400 w-20 shrink-0">@codex:</b> Drafts the initial REST API spec and boilerplate code.</li>
                    <li className="flex gap-3"><b className="text-orange-400 w-20 shrink-0">@claude:</b> Audits the design for security flaws (e.g., authZ).</li>
                    <li className="flex gap-3"><b className="text-purple-400 w-20 shrink-0">@gemini:</b> Suggests performance optimizations like caching headers.</li>
                  </ul>
                </CardBody>
              </Card>
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Performance Optimization</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">Identify and fix a database query bottleneck causing API timeouts.</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex gap-3"><b className="text-purple-400 w-20 shrink-0">@gemini:</b> Scans the repo, mapping expensive queries to specific API endpoints.</li>
                    <li className="flex gap-3"><b className="text-orange-400 w-20 shrink-0">@claude:</b> Designs an optimization strategy with new indexes and a caching layer.</li>
                    <li className="flex gap-3"><b className="text-sky-400 w-20 shrink-0">@codex:</b> Implements the changes and provides before/after benchmarks.</li>
                  </ul>
                </CardBody>
              </Card>
              <Card className="bg-gray-900 border border-gray-800">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                    <h3 className="text-lg font-bold text-white">Dependency Upgrade</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">Safely upgrade a major library and fix the resulting breaking changes across the codebase.</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex gap-3"><b className="text-purple-400 w-20 shrink-0">@gemini:</b> Reads the library&apos;s changelog and identifies all breaking changes.</li>
                    <li className="flex gap-3"><b className="text-sky-400 w-20 shrink-0">@codex:</b> Scans the codebase and performs the necessary code modifications.</li>
                    <li className="flex gap-3"><b className="text-orange-400 w-20 shrink-0">@claude:</b> Reviews the changes for logical errors and updates unit tests.</li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Installation</h2>
              <p className="mt-4 text-lg text-gray-400">Install from PyPI. Roundtable is a standard MCP server.</p>
            </div>
            <div className="mt-8">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <code className="text-green-400 font-mono text-sm md:text-base">
                  <span className="text-blue-400">$</span> {installCommand}
                </code>
                <Button
                  isIconOnly
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-700"
                  onClick={() => copyToClipboard(installCommand, 'install')}
                >
                  {copied === 'install' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              <p className="mt-4 text-sm text-center text-gray-500">
                After installation, add the `roundtable-mcp` command to your IDE assistant&apos;s configuration file to register the sub-agents.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  as={Link}
                  href="https://github.com/askbudi/roundtable"
                  target="_blank"
                  className="bg-gray-200 text-gray-950 font-semibold hover:bg-white"
                  startContent={<Github className="w-5 h-5" />}
                >
                  View on GitHub
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
