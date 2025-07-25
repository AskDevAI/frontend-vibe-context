'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { Github, Star, Zap, Shield, Puzzle, Terminal, ArrowRight, Copy } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function TinyAgentPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = "pip install tinyagent-py";
  const basicUsageCode = `import asyncio
from tinyagent import TinyAgent, tool

@tool("weather", "Get weather information for a city")
def get_weather(city: str) -> str:
    return f"The weather in {city} is sunny and 25°C"

async def main():
    agent = TinyAgent(
        model="o4-mini",
        api_key="your-api-key"
    )
    
    agent.add_tool(get_weather)
    
    try:
        result = await agent.run("What's the weather in Paris?")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const advancedCode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.storage import JsonFileStorage
from tinyagent.hooks.rich_ui_callback import RichUICallback

async def main():
    # With persistent storage and rich UI
    storage = JsonFileStorage("./sessions")
    ui = RichUICallback(markdown=True, show_thinking=True)
    
    agent = TinyAgent(
        model="o4-mini",
        api_key="your-api-key",
        storage=storage,
        session_id="user_session"
    )
    
    agent.add_callback(ui)
    
    try:
        result = await agent.run("Continue our conversation")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const supportBotCode = `import asyncio
from tinyagent import TinyAgent, tool

@tool("get_order", "Get order status")
def get_order_status(order_id: str) -> str:
    # Your database logic here
    return f"Order {order_id}: Shipped"

async def main():
    bot = TinyAgent(
        model="o4-mini",
        api_key="your-api-key",
        system_prompt="You are a helpful customer support agent"
    )
    
    bot.add_tool(get_order_status)
    
    try:
        result = await bot.run("Check order #12345")
        print(result)
    finally:
        await bot.close()

asyncio.run(main())`;

  const researchCode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.storage import JsonFileStorage

async def main():
    storage = JsonFileStorage("./research_sessions")
    
    researcher = TinyAgent(
        model="o4-mini",
        api_key="your-api-key",
        storage=storage,
        session_id="research_session",
        system_prompt="You are a research assistant"
    )
    
    # Connect to MCP servers for research tools
    await researcher.connect_to_server("npx", ["-y", "@modelcontextprotocol/server-web-search"])
    
    try:
        result = await researcher.run("""
        Research AI trends in 2024 and
        create a summary report
        """)
        print(result)
    finally:
        await researcher.close()

asyncio.run(main())`;

  const richUICode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.hooks.rich_ui_callback import RichUICallback

async def main():
    # Beautiful terminal UI with Rich library
    ui = RichUICallback(
        markdown=True,
        show_thinking=True,
        show_tool_calls=True
    )
    
    agent = TinyAgent(
        model="o4-mini",
        api_key="your-api-key"
    )
    
    agent.add_callback(ui)
    
    try:
        result = await agent.run("Analyze this data and create a report")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const gradioUICode = `import asyncio
from tinyagent import TinyAgent
from tinyagent.hooks.gradio_callback import GradioCallback

async def main():
    # Web-based UI with Gradio
    gradio_ui = GradioCallback(
        show_thinking=True,
        show_tool_calls=True,
        port=7860
    )
    
    agent = TinyAgent(
        model="o4-mini",
        api_key="your-api-key"
    )
    
    agent.add_callback(gradio_ui)
    
    try:
        # Launch web interface at http://localhost:7860
        result = await agent.run("Help me with data analysis")
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const jupyterUICode = `# In a Jupyter notebook cell
import asyncio
from tinyagent import TinyAgent

async def main():
    # Interactive UI directly in Jupyter notebooks
    agent = TinyAgent(
        model="o4-mini",
        api_key="your-api-key",
        ui="jupyter"  # Automatically enables JupyterUI
    )
    
    try:
        # Rich interactive output in notebook cells
        result = await agent.run("""
        Create a visualization of sales data:
        1. Generate sample sales data
        2. Create a matplotlib chart
        3. Show analysis insights
        """)
        # Output appears directly in notebook with rich formatting
        return result
    finally:
        await agent.close()

# Run in notebook
await main()`;

  return (
    <>
      <Navbar />
      <main>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Open Source AI Agent Framework
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TinyAgent
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The most minimal yet powerful AI Agent framework. Supports ANY LLM model (OpenAI, Claude, Gemini, Moonshot, etc.) 
              with MCP client support, persistent storage, built-in UI hooks (RichUI, Gradio, Jupyter), and extensible architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                as={Link} 
                href="https://github.com/askbudi/tinyagent" 
                color="primary" 
                size="lg" 
                className="font-semibold"
                startContent={<Github className="w-5 h-5" />}
              >
                View on GitHub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="bordered" 
                size="lg"
                className="font-semibold"
                startContent={<Star className="w-5 h-5" />}
              >
                Star on GitHub
              </Button>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <Chip color="success" variant="flat">MIT License</Chip>
              <Chip color="primary" variant="flat">Python 3.8+</Chip>
              <Chip color="secondary" variant="flat">100 Lines Core</Chip>
              <Chip color="warning" variant="flat">Any LLM Model</Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
            <p className="text-lg text-gray-600">Install TinyAgent and build your first AI agent</p>
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
                <div className="bg-gray-900 text-white p-4 rounded-lg block font-mono text-sm">
                  <span className="text-green-400">pip install</span> <span className="text-blue-300">tinyagent-py</span>
                </div>
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
                  language="python"
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

      {/* Model Support */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Works with Any LLM Model</h2>
            <p className="text-lg text-gray-600">Powered by LiteLLM - switch between models seamlessly</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-lg">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-blue-600 mb-2">OpenAI</h3>
                <p className="text-sm text-gray-600">gpt-4o, gpt-4o-mini, gpt-4, gpt-3.5-turbo</p>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-purple-600 mb-2">Anthropic</h3>
                <p className="text-sm text-gray-600">claude-3-5-sonnet, claude-3-opus, claude-3-haiku</p>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-green-600 mb-2">Google</h3>
                <p className="text-sm text-gray-600">gemini-pro, gemini-1.5-pro, gemini-1.5-flash</p>
              </CardBody>
            </Card>
            
            <Card className="shadow-lg">
              <CardBody className="p-4 text-center">
                <h3 className="font-semibold text-orange-600 mb-2">Others</h3>
                <p className="text-sm text-gray-600">Moonshot Kimi-k2, Cohere, Llama, and 100+ more</p>
              </CardBody>
            </Card>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Model Switching Examples</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">OpenAI GPT-4</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;gpt-4o&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-openai-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Claude Sonnet</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;claude-3-5-sonnet-20241022&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-anthropic-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Google Gemini</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;gemini-1.5-pro&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-gemini-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Moonshot Kimi</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;moonshot/moonshot-v1-8k&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-moonshot-key&quot;</span><br/>
                    )
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need to build production-ready AI agents</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Minimal Core</h3>
                <p className="text-gray-600 text-sm">
                  Just 100 lines of core code, making it easy to understand, extend, and customize
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Puzzle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Extensible Hooks</h3>
                <p className="text-gray-600 text-sm">
                  Add custom functionality with hooks for logging, UI callbacks, and token tracking
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">MCP Support</h3>
                <p className="text-gray-600 text-sm">
                  Built-in Model Context Protocol client for connecting to various MCP servers
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Storage</h3>
                <p className="text-gray-600 text-sm">
                  Support for JSON, SQLite, PostgreSQL, and Redis storage backends
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Built-in UI Hooks</h3>
                <p className="text-gray-600 text-sm">
                  RichUI for terminal, Gradio for web interfaces, JupyterUI for interactive notebooks
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Session Management</h3>
                <p className="text-gray-600 text-sm">
                  Persistent sessions with automatic loading and robust error handling
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Any LLM Model</h3>
                <p className="text-gray-600 text-sm">
                  OpenAI, Claude Sonnet, Gemini, Moonshot Kimi-k2, and 100+ models via LiteLLM
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Advanced Example */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Usage</h2>
            <p className="text-lg text-gray-600">Build sophisticated agents with persistent storage and rich UI</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Production-Ready Agent</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(advancedCode, 'advanced')}
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
                {advancedCode}
              </SyntaxHighlighter>
              {copiedCode === 'advanced' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* UI Hooks Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built-in UI Hooks</h2>
            <p className="text-lg text-gray-600">Choose your preferred interface: Terminal, Web, or Jupyter</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">RichUI (Terminal)</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(richUICode, 'richui')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Beautiful terminal interface with markdown support</p>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem'
                  }}
                >
                  {richUICode}
                </SyntaxHighlighter>
                {copiedCode === 'richui' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">GradioUI (Web)</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(gradioUICode, 'gradio')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Web-based interface accessible from any browser</p>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem'
                  }}
                >
                  {gradioUICode}
                </SyntaxHighlighter>
                {copiedCode === 'gradio' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">JupyterUI (Notebook)</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(jupyterUICode, 'jupyter')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Interactive interface directly in Jupyter notebooks</p>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem'
                  }}
                >
                  {jupyterUICode}
                </SyntaxHighlighter>
                {copiedCode === 'jupyter' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-World Examples</h2>
            <p className="text-lg text-gray-600">See TinyAgent in action with practical use cases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Customer Support Bot</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(supportBotCode, 'support')}
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
                  {supportBotCode}
                </SyntaxHighlighter>
                {copiedCode === 'support' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Research Assistant</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(researchCode, 'research')}
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
                  {researchCode}
                </SyntaxHighlighter>
                {copiedCode === 'research' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TinyAgent?</h2>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">⚡ Lightning Fast Setup</h3>
                <p className="text-gray-600">
                  Get started in under 5 minutes. With just 100 lines of core code, TinyAgent provides 
                  all essential features without bloat. No complex configurations or steep learning curves.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Puzzle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">🔧 Infinitely Extensible</h3>
                <p className="text-gray-600">
                  Add custom tools, callbacks, and hooks effortlessly. Built-in support for rich UI, 
                  token tracking, logging, MCP servers, and custom integrations. Your imagination is the limit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">🚀 Production Ready</h3>
                <p className="text-gray-600">
                  Robust session management, multiple storage backends (JSON, SQLite, PostgreSQL, Redis), 
                  comprehensive error handling, and battle-tested architecture used by thousands of developers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Terminal className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">💡 Developer Friendly</h3>
                <p className="text-gray-600">
                  Multiple UI options (RichUI for terminal, Gradio for web, JupyterUI for notebooks), comprehensive 
                  documentation, and an active community. Debug easily with built-in logging and monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your AI Agent?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start building powerful AI agents with TinyAgent today. It&apos;s free and open source.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              href="https://github.com/askbudi/tinyagent" 
              size="lg" 
              className="bg-white text-blue-600 font-semibold hover:bg-gray-100"
              startContent={<Github className="w-5 h-5" />}
            >
              Get Started on GitHub
            </Button>
            <Button 
              as={Link} 
              href="/docs" 
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