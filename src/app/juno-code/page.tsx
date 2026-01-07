'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { Github, Star, Terminal, Zap, Shield, ArrowRight, Copy, Play, RefreshCw, GitBranch, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function JunoCodePage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = "npm install -g juno-code";

  const initCode = `# Initialize in your project
juno-code init --task "Your task description" --subagent claude`;

  const basicUsageCode = `# Start execution - uses .juno_task/prompt.md (optimized Ralph prompt)
juno-code start -b shell -s claude -i 5 -v

# Or with a custom prompt
juno-code -b shell -s claude -i 5 -p "Fix the login bug"

# Quick subagent shortcuts
juno-code claude "your task"
juno-code codex "your task"
juno-code gemini "your task"`;

  const kanbanCode = `# List tasks
./.juno_task/scripts/kanban.sh list --limit 5
./.juno_task/scripts/kanban.sh list --status backlog todo in_progress

# Get task details
./.juno_task/scripts/kanban.sh get TASK_ID

# Mark task status (backlog, todo, in_progress, done)
./.juno_task/scripts/kanban.sh mark in_progress --ID TASK_ID
./.juno_task/scripts/kanban.sh mark done --ID TASK_ID --response "Fixed auth, added tests"

# Update task with git commit reference
./.juno_task/scripts/kanban.sh update TASK_ID --commit abc123`;

  const sessionCode = `# Session management
juno-code session list           # View all sessions
juno-code session info abc123    # Session details
juno-code --resume abc123 -p "continue"  # Resume session
juno-code --continue -p "keep going"     # Continue most recent

# Real-time feedback while running
juno-code feedback "found a bug in the auth flow"
juno-code feedback --interactive`;

  const hooksCode = `// config.json - Hooks without lock-in
{
  "hooks": {
    "START_ITERATION": { "commands": ["./scripts/lint.sh"] },
    "END_ITERATION": { "commands": ["npm test"] }
  }
}`;

  return (
    <>
      <Navbar />
      <main>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            {/* Ralph Image */}
            <div className="mb-6">
              <Image
                src="https://ghuntley.com/content/images/size/w1200/2025/06/3ea367ed-cae3-454a-840f-134531dea1fd.jpg"
                alt="Ralph Wiggum - The Simpsons"
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 mt-2 italic">&quot;I&apos;m in danger!&quot; - Ralph Wiggum, every time you Ctrl+C a working AI loop too early</p>
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <RefreshCw className="w-4 h-4" />
              AI-Powered Code Automation with Structured Task Management
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                juno-code
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The Ralph Method, but better. Controlled AI iteration loops with structured kanban task tracking,
              multi-backend support (Claude, Codex, Gemini), and full git traceability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                as={Link}
                href="https://github.com/askbudi/juno-code"
                color="primary"
                size="lg"
                className="font-semibold bg-amber-600 hover:bg-amber-700"
                startContent={<Github className="w-5 h-5" />}
              >
                View on GitHub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                as={Link}
                href="https://www.npmjs.com/package/juno-code"
                variant="bordered"
                size="lg"
                className="font-semibold border-amber-600 text-amber-700"
                startContent={<Play className="w-5 h-5" />}
              >
                npm Package
              </Button>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <Chip color="success" variant="flat">MIT License</Chip>
              <Chip color="primary" variant="flat">Multi-Backend</Chip>
              <Chip color="secondary" variant="flat">Kanban Tasks</Chip>
              <Chip color="warning" variant="flat">Git Traceability</Chip>
              <Chip color="danger" variant="flat">Iteration Control</Chip>
            </div>
          </div>
        </div>
      </div>

      {/* The Ralph Method Section */}
      <div className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">The Ralph Method: Where It All Started</h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
              <a href="https://ghuntley.com/ralph/" className="underline hover:text-amber-200" target="_blank" rel="noopener noreferrer">Geoffrey Huntley&apos;s Ralph Method</a> demonstrated
              something remarkable: AI can deliver production-quality software through iterative refinement.
              One engineer reportedly delivered a <strong>$50,000 project for $297</strong> using this technique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-200">Ralph&apos;s Problems</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>One-time only</strong> - Shines for single big tasks, doesn&apos;t scale to iterative development</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>Overcooking</strong> - Loop runs too long, AI adds features nobody asked for</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>Undercooking</strong> - You Ctrl+C too early, work is incomplete</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>Fragile state</strong> - Markdown files as source of truth; LLMs can corrupt format</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>Vendor lock-in</strong> - Built for Claude Code only</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div><strong>No traceability</strong> - Changes blend together, hard to debug</div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-300">juno-code Solutions</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Iteration control</strong> - <code className="bg-white/20 px-1 rounded">-i 5</code> for exact iterations, or &quot;until tasks done&quot;</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Structured kanban</strong> - NDJSON format can&apos;t be corrupted by LLM formatting</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Multi-backend</strong> - Claude, Codex, Gemini, Cursor with one flag</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Full traceability</strong> - Every task links to a git commit</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Hooks without lock-in</strong> - Works with ANY backend</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div><strong>Human-readable logs</strong> - <code className="bg-white/20 px-1 rounded">-v</code> gives structured output</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full text-lg font-medium">
              <Star className="w-5 h-5" />
              Inspired by ghuntley.com/ralph/ - The $50K for $297 Technique
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
            <p className="text-lg text-gray-600">Install juno-code and start your first AI-powered coding session</p>
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
                  <h3 className="text-lg font-semibold">Initialize Project</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(initCode, 'init')}
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
                  {initCode}
                </SyntaxHighlighter>
                {copiedCode === 'init' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Basic Usage</h2>
            <p className="text-lg text-gray-600">Multiple ways to run juno-code based on your workflow</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Start Execution</h3>
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
              <p className="text-sm text-gray-600 mt-4">
                <strong>Key insight:</strong> Running <code className="bg-gray-200 px-1 rounded">juno-code start</code> without <code className="bg-gray-200 px-1 rounded">-p</code> uses
                <code className="bg-gray-200 px-1 rounded">.juno_task/prompt.md</code>—a production-ready prompt template that implements the Ralph method with guard rails.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">Everything you need for AI-powered iterative development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Iteration Control</h3>
                <p className="text-gray-600 text-sm">
                  No more overcooking or undercooking. Set exact iterations with <code>-i 5</code> or run until all tasks complete.
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Structured Kanban</h3>
                <p className="text-gray-600 text-sm">
                  NDJSON-based task tracking via juno-kanban. Strict format that can&apos;t be corrupted by LLM formatting errors.
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multi-Backend</h3>
                <p className="text-gray-600 text-sm">
                  Switch between Claude, Codex, Gemini, or Cursor with one flag. No vendor lock-in.
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Full Traceability</h3>
                <p className="text-gray-600 text-sm">
                  Every task links to a git commit. Jump to any point in development history.
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lifecycle Hooks</h3>
                <p className="text-gray-600 text-sm">
                  Run scripts at START_ITERATION, END_ITERATION, and more. Works with ANY backend.
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Provide feedback while AI is running. Guide the development without stopping.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Backends & Services */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Backends & Services</h2>
            <p className="text-lg text-gray-600">Use any AI model with model shorthands for quick switching</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-lg border-2 border-purple-200 bg-purple-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-purple-600 mb-2">Claude</h3>
                <p className="text-sm text-gray-600 mb-2">Default: claude-sonnet-4-5-20250929</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Chip size="sm" variant="flat">:haiku</Chip>
                  <Chip size="sm" variant="flat">:sonnet</Chip>
                  <Chip size="sm" variant="flat">:opus</Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-blue-600 mb-2">Codex</h3>
                <p className="text-sm text-gray-600 mb-2">Default: codex-5.2-max</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Chip size="sm" variant="flat">:codex</Chip>
                  <Chip size="sm" variant="flat">:gpt-5</Chip>
                  <Chip size="sm" variant="flat">:mini</Chip>
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-lg border-2 border-green-200 bg-green-50">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-green-600 mb-2">Gemini</h3>
                <p className="text-sm text-gray-600 mb-2">Default: gemini-2.5-pro</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  <Chip size="sm" variant="flat">:pro</Chip>
                  <Chip size="sm" variant="flat">:flash</Chip>
                  <Chip size="sm" variant="flat">:pro-3</Chip>
                  <Chip size="sm" variant="flat">:flash-3</Chip>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Backend Switching Examples</h3>
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Stuck on a bug? Try different models</div>
                <div className="text-green-300">juno-code -b shell -s claude -m :opus -i 1 -v</div>
                <div className="text-blue-300">juno-code -b shell -s codex -m :codex -i 1 -v</div>
                <div className="text-yellow-300">juno-code -b shell -s gemini -m :flash -i 1 -v</div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Kanban Commands */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kanban Task Management</h2>
            <p className="text-lg text-gray-600">Built-in structured task tracking via juno-kanban</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Kanban Commands</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(kanbanCode, 'kanban')}
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
                {kanbanCode}
              </SyntaxHighlighter>
              {copiedCode === 'kanban' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ralph vs juno-code</h2>
            <p className="text-lg text-gray-600">See why juno-code is the evolution of the Ralph Method</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-left">Ralph</th>
                  <th className="px-6 py-4 text-left">juno-code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Design Focus</td>
                  <td className="px-6 py-4 text-gray-600">One-time tasks (migrations, rewrites)</td>
                  <td className="px-6 py-4 text-green-600">Iterative development (scales to 1000s of tasks)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Core Loop</td>
                  <td className="px-6 py-4 text-gray-600"><code>while :; do claude; done</code></td>
                  <td className="px-6 py-4 text-green-600">Controlled iterations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Stopping</td>
                  <td className="px-6 py-4 text-gray-600">Ctrl+C (guesswork)</td>
                  <td className="px-6 py-4 text-green-600"><code>-i N</code> or &quot;until tasks done&quot;</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Source of Truth</td>
                  <td className="px-6 py-4 text-gray-600">Markdown files (TASKS.md, PLANNING.md)</td>
                  <td className="px-6 py-4 text-green-600">Structured kanban over bash</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Format Integrity</td>
                  <td className="px-6 py-4 text-gray-600">Relies on LLM instruction-following</td>
                  <td className="px-6 py-4 text-green-600">Strict format, always parseable</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Multiple AIs</td>
                  <td className="px-6 py-4 text-gray-600">Claude only</td>
                  <td className="px-6 py-4 text-green-600">Claude, Codex, Gemini, Cursor</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Traceability</td>
                  <td className="px-6 py-4 text-gray-600">None</td>
                  <td className="px-6 py-4 text-green-600">Every task → git commit</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Hooks</td>
                  <td className="px-6 py-4 text-gray-600">Claude-specific</td>
                  <td className="px-6 py-4 text-green-600">Works with any backend</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Verbose Output</td>
                  <td className="px-6 py-4 text-gray-600">Raw JSON</td>
                  <td className="px-6 py-4 text-green-600">Human-readable + jq-friendly</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Feedback</td>
                  <td className="px-6 py-4 text-gray-600">None</td>
                  <td className="px-6 py-4 text-green-600">Real-time during execution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Session Management & Hooks */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-lg text-gray-600">Session management, real-time feedback, and lifecycle hooks</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Session Management & Feedback</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(sessionCode, 'session')}
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
                  {sessionCode}
                </SyntaxHighlighter>
                {copiedCode === 'session' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Lifecycle Hooks</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(hooksCode, 'hooks')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <SyntaxHighlighter
                  language="json"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {hooksCode}
                </SyntaxHighlighter>
                {copiedCode === 'hooks' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* CLI Reference */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CLI Reference</h2>
            <p className="text-lg text-gray-600">Complete command-line options</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Flag</th>
                  <th className="px-6 py-4 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-mono text-sm">
                <tr>
                  <td className="px-6 py-3"><code>-b, --backend &lt;type&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Backend: <code>mcp</code>, <code>shell</code></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3"><code>-s, --subagent &lt;name&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Service: <code>claude</code>, <code>codex</code>, <code>gemini</code>, <code>cursor</code></td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><code>-m, --model &lt;name&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Model (supports shorthands like <code>:opus</code>, <code>:haiku</code>)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3"><code>-i, --max-iterations &lt;n&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Iteration limit (-1 for unlimited)</td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><code>-p, --prompt &lt;text&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Prompt text (if omitted with <code>start</code>, uses prompt.md)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3"><code>-v, --verbose</code></td>
                  <td className="px-6 py-3 font-sans">Human-readable verbose output</td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><code>-r, --resume &lt;id&gt;</code></td>
                  <td className="px-6 py-3 font-sans">Resume specific session</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3"><code>--continue</code></td>
                  <td className="px-6 py-3 font-sans">Continue most recent session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Project Structure */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Structure</h2>
            <p className="text-lg text-gray-600">What gets created after <code>juno-code init</code></p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                <pre>{`your-project/
├── .juno_task/
│   ├── init.md           # Task breakdown (your input)
│   ├── prompt.md         # AI instructions (Ralph-style prompt)
│   ├── plan.md           # Progress tracking
│   ├── USER_FEEDBACK.md  # Issue tracking
│   ├── config.json       # Configuration
│   ├── scripts/          # Auto-installed utilities
│   │   ├── run_until_completion.sh
│   │   ├── kanban.sh
│   │   └── install_requirements.sh
│   └── tasks/            # Kanban tasks (ndjson)
├── CLAUDE.md             # Session learnings
└── AGENTS.md             # Agent performance`}</pre>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Environment Variables</h2>
            <p className="text-lg text-gray-600">Configure juno-code via environment</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <SyntaxHighlighter
                language="bash"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              >
{`# Primary
export JUNO_CODE_BACKEND=shell
export JUNO_CODE_SUBAGENT=claude
export JUNO_CODE_MODEL=:sonnet
export JUNO_CODE_MAX_ITERATIONS=10

# Service-specific
export CODEX_HIDE_STREAM_TYPES="turn_diff,token_count"
export GEMINI_API_KEY=your-key
export CLAUDE_USER_MESSAGE_PRETTY_TRUNCATE=4`}
              </SyntaxHighlighter>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try the Ralph Method, But Better?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start building with controlled AI iterations, structured task tracking, and full git traceability.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              href="https://github.com/askbudi/juno-code"
              size="lg"
              className="bg-white text-amber-600 font-semibold hover:bg-gray-100"
              startContent={<Github className="w-5 h-5" />}
            >
              Get Started on GitHub
            </Button>
            <Button
              as={Link}
              href="https://www.npmjs.com/package/juno-code"
              variant="bordered"
              size="lg"
              className="border-white text-white font-semibold hover:bg-white/10"
            >
              View on npm
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-80">
            Credits: Inspired by <a href="https://ghuntley.com/ralph/" className="underline hover:text-amber-200" target="_blank" rel="noopener noreferrer">Geoffrey Huntley&apos;s Ralph Method</a>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
