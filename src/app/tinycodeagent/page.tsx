'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { Github, Star, Terminal, Code as CodeIcon, Shield, Cloud, ArrowRight, Copy, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function TinyCodeAgentPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCode = "pip install tinyagent-py";
  
  const basicUsageCode = `import asyncio
from tinyagent.code_agent import TinyCodeAgent

async def main():
    # Initialize the coding agent
    agent = TinyCodeAgent(
        model="o4-mini",
        api_key="your-api-key",
        provider="modal",
        local_execution=False
    )
    
    try:
        # Ask the agent to write and execute code
        result = await agent.run("""
        Create a Python function that calculates the Fibonacci sequence 
        and test it with the first 10 numbers
        """)
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const secureShellCode = `import asyncio
from tinyagent.code_agent import TinyCodeAgent

async def main():
    # Modal provider for secure cloud execution
    agent = TinyCodeAgent(
        model="o4-mini",
        api_key="your-api-key",
        provider="modal",
        pip_packages=["pandas", "matplotlib", "numpy"],
        authorized_imports=["pandas", "matplotlib.*", "numpy.*"],
        local_execution=False
    )
    
    try:
        # Safe code execution in cloud environment
        result = await agent.run("""
        Analyze this CSV data and create a visualization:
        - Load data from 'sales.csv'
        - Calculate monthly trends
        - Create a line chart
        """)
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const statefulCode = `import asyncio
import os
from tinyagent.code_agent import TinyCodeAgent

async def main():
    # Code agent with persistent variables and environment
    agent = TinyCodeAgent(
        model="o4-mini",
        api_key=os.environ['OPENAI_API_KEY'],
        provider="modal",
        user_variables={
            "database_url": "postgresql://user:pass@localhost/mydb",
            "api_keys": {"aws": "key123", "stripe": "sk_123"}
        }
    )
    
    try:
        # Variables persist across runs - analyze quarterly data
        await agent.run("""
        import pandas as pd
        df_q1 = pd.read_csv('sales_q1.csv')
        total_q1 = df_q1['revenue'].sum()
        print(f'Q1 Revenue: $\{total_q1:,.2f\}')
        """)
        
        # Previous variables still available
        await agent.run("""
        df_q2 = pd.read_csv('sales_q2.csv') 
        total_q2 = df_q2['revenue'].sum()
        growth = ((total_q2 - total_q1) / total_q1) * 100
        print(f'Q2 Growth: \{growth:.1f\}%')
        """)
    finally:
        await agent.close()

asyncio.run(main())`;

  const cursorAlternativeCode = `import asyncio
import os
from tinyagent.code_agent import TinyCodeAgent

async def main():
    # AI-powered code editor alternative
    agent = TinyCodeAgent(
        model="o4-mini",
        api_key=os.environ['OPENAI_API_KEY'],
        provider="modal",
        pip_packages=["black", "mypy", "flake8"],
        default_workdir=os.getcwd()
    )
    
    try:
        # Intelligent code editing and refactoring
        result = await agent.run("""
        I have a Python Flask API in 'app.py' that needs improvement:
        
        1. Read the current file and analyze its structure
        2. Add proper type hints to all functions
        3. Implement error handling for database operations
        4. Add input validation for API endpoints
        5. Format with black and check with flake8
        6. Create comprehensive docstrings
        7. Save the improved version
        
        Show me a summary of changes made.
        """)
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const accountingCode = `import asyncio
import os
import pandas as pd
from tinyagent.code_agent import TinyCodeAgent
from tinyagent.hooks.gradio_callback import GradioCallback
from tinyagent.hooks.logging_manager import LoggingManager
import logging

async def main():
    # Configure for accounting data analysis
    agent = TinyCodeAgent(
        model="o4-mini",
        api_key=os.environ['OPENAI_API_KEY'],
        pip_packages=["pandas"],
        provider_config={
            "pip_packages": ["gradio"]
        }
    )
    
    # Setup Gradio UI with logging
    log_manager = LoggingManager(default_level=logging.INFO)
    gradio_ui = GradioCallback(
        show_thinking=True,
        show_tool_calls=True
    )
    agent.add_callback(gradio_ui)
    
    # Load bank account data
    df = pd.read_csv("Corporate_account_2022-04-15-2025-06-15.csv", 
                     encoding='latin1', delimiter=';')
    
    # Pass dataframe to Python environment
    agent.set_user_variables(dict(df=df))
    
    try:
        result = await agent.run("""
        df is an export of a bank account for my company.
        I need to extract all payments to AWS (Amazon Web Services):
        - Total amount of payments to AWS
        - Total payments to AWS in each year
        - List transactions that might be typos or worth reviewing
        
        You have access to df variable in your python environment.
        """, max_turns=20)
        print(result)
    finally:
        await agent.close()

asyncio.run(main())`;

  const restaurantResearchCode = `# Real-world example: Restaurant research automation
# Extract data from website + Google Maps API analysis in 10 lines
from tinyagent import TinyCodeAgent
import os
import asyncio

agent = TinyCodeAgent(
    model="o4-mini",
    api_key=os.environ.get("OPENAI_API_KEY"),
    ui="jupyter",
    authorized_imports=["json","pandas","requests"],
    local_execution=True,
)

async def run_example(page_content):
    GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")

    response = await agent.run(f"""
    Extract restaurant data from this Toronto website source:
    1. Get names, addresses, phone numbers
    2. Use Google Maps API for reviews/ratings  
    3. Sort by quality (reviews + rating combination)
    4. Export to CSV
    
    API Key: {GOOGLE_MAPS_API_KEY}
    
    <page_source>
    Restaurant Name | Address | Telephone
    1 Kitchen | 550 Wellington St W | 416-601-3533
    12 Tables | 1552 Avenue Rd | 416-590-7819
    612 Harlowe | 612 Richmond St W | 416-637-9998
    # ... more restaurants
    </page_source>
    """)
    
    # Agent automatically creates 'df' variable with results
    df = agent.code_provider._globals_dict['df']
    df.to_csv("restaurants_analyzed.csv")
    
asyncio.run(run_example(page_content))`;

  return (
    <>
      <Navbar />
      <main>
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Terminal className="w-4 h-4" />
              Open Source Coding Agent
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                TinyCodeAgent
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build your own Cursor alternative or automate complex tasks like spreadsheet manipulation 
              and data analysis. Supports ANY LLM model (OpenAI, Claude, Gemini, Moonshot, etc.) with secure shell access, stateful environment, and computer interaction capabilities.
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
                startContent={<Play className="w-5 h-5" />}
              >
                Try Demo
              </Button>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <Chip color="success" variant="flat">MIT License</Chip>
              <Chip color="primary" variant="flat">Python 3.8+</Chip>
              <Chip color="secondary" variant="flat">Secure Execution</Chip>
              <Chip color="warning" variant="flat">Stateful Environment</Chip>
              <Chip color="danger" variant="flat">Any LLM Model</Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started in Minutes</h2>
            <p className="text-lg text-gray-600">Install TinyCodeAgent and start building with AI</p>
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
            <p className="text-lg text-gray-600">Powered by LiteLLM - choose the best model for your coding tasks</p>
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
                  <h4 className="font-medium mb-2">OpenAI o1-mini (Code Optimized)</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyCodeAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;o1-mini&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-openai-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Claude 3.5 Sonnet (Best Reasoning)</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyCodeAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;claude-3-5-sonnet-20241022&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-anthropic-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Gemini 1.5 Pro (Large Context)</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyCodeAgent</span>(<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">model</span>=<span className="text-red-300">&quot;gemini-1.5-pro&quot;</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">api_key</span>=<span className="text-red-300">&quot;your-gemini-key&quot;</span><br/>
                    )
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Moonshot Kimi (Cost Effective)</h4>
                  <div className="bg-gray-900 text-white p-3 rounded-lg text-sm font-mono">
                    <span className="text-blue-300">agent</span> = <span className="text-green-300">TinyCodeAgent</span>(<br/>
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

      {/* Key Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Coding Features</h2>
            <p className="text-lg text-gray-600">Everything you need for AI-powered code generation and execution</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Shell Access</h3>
                <p className="text-gray-600 text-sm">
                  Safe code execution in sandboxed environments with configurable security policies
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local or Cloud</h3>
                <p className="text-gray-600 text-sm">
                  Execute code locally for development or in cloud environments for scalability
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Stateful Environment</h3>
                <p className="text-gray-600 text-sm">
                  Persistent Python environment that maintains variables and imports between runs
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CodeIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Code Generation</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered code generation with thinking, planning, and execution phases
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Extensible Hooks</h3>
                <p className="text-gray-600 text-sm">
                  Add custom functionality with hooks for logging, debugging, and integrations
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Built on TinyAgent</h3>
                <p className="text-gray-600 text-sm">
                  Inherits all TinyAgent features: minimal core, MCP support, rich UI callbacks
                </p>
              </CardBody>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
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

      {/* Secure Shell Example */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Secure Code Execution</h2>
            <p className="text-lg text-gray-600">Run AI-generated code safely in sandboxed environments</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sandboxed Execution</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(secureShellCode, 'secure')}
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
                {secureShellCode}
              </SyntaxHighlighter>
              {copiedCode === 'secure' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Stateful Environment */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stateful Python Environment</h2>
            <p className="text-lg text-gray-600">Maintain context across multiple code executions</p>
          </div>

          <Card className="shadow-xl">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Persistent Sessions</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  isIconOnly
                  onClick={() => copyToClipboard(statefulCode, 'stateful')}
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
                {statefulCode}
              </SyntaxHighlighter>
              {copiedCode === 'stateful' && (
                <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Computer Interaction Examples */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Computer Interaction Examples</h2>
            <p className="text-lg text-gray-600">Build Cursor alternatives and automate complex computer tasks</p>
          </div>

          <div className="grid gap-8">
            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Build Your Own Cursor Alternative</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(cursorAlternativeCode, 'cursor')}
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
                  {cursorAlternativeCode}
                </SyntaxHighlighter>
                {copiedCode === 'cursor' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Accounting Data Analysis with GradioUI</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(accountingCode, 'accounting')}
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
                  {accountingCode}
                </SyntaxHighlighter>
                {copiedCode === 'accounting' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>

            <Card className="shadow-xl">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Restaurant Research Automation (Real Story)</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    isIconOnly
                    onClick={() => copyToClipboard(restaurantResearchCode, 'restaurant')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Real Story:</strong> A friend needed restaurant data from a legacy website that couldn&apos;t be filtered by Google Maps reviews or pricing. TinyCodeAgent extracted the data and enriched it with Google Maps API in just 10 lines!
                  </p>
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
                  {restaurantResearchCode}
                </SyntaxHighlighter>
                {copiedCode === 'restaurant' && (
                  <div className="text-green-600 text-sm mt-2">Copied to clipboard!</div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600">Ideal use cases for TinyCodeAgent</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🖥️ Computer Interaction</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Build custom AI code editors (Cursor alternatives)</li>
                  <li>• Automate complex spreadsheet operations</li>
                  <li>• Create intelligent file management systems</li>
                  <li>• Develop AI-powered desktop applications</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">📊 Data Analysis</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Automated data cleaning and preprocessing</li>
                  <li>• Statistical analysis and visualization</li>
                  <li>• Machine learning model development</li>
                  <li>• Report generation with charts and insights</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">⚡ Prototyping</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Rapid API development and testing</li>
                  <li>• Algorithm implementation and optimization</li>
                  <li>• Database schema design and queries</li>
                  <li>• Integration testing and validation</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="shadow-lg p-6">
              <CardBody className="p-0">
                <h3 className="text-xl font-semibold mb-4">🤖 Automation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Workflow automation scripts</li>
                  <li>• System administration tasks</li>
                  <li>• Data pipeline development</li>
                  <li>• Testing and quality assurance</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Coding with AI Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Build, test, and deploy code with the power of AI. TinyCodeAgent makes it secure and simple.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              href="https://github.com/askbudi/tinyagent" 
              size="lg" 
              className="bg-white text-emerald-600 font-semibold hover:bg-gray-100"
              startContent={<Github className="w-5 h-5" />}
            >
              Get Started on GitHub
            </Button>
            <Button 
              as={Link} 
              href="/tinyagent" 
              variant="bordered" 
              size="lg"
              className="border-white text-white font-semibold hover:bg-white/10"
            >
              Learn About TinyAgent
            </Button>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}