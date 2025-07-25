'use client';

import { Card, CardBody, CardHeader, Button, Tabs, Tab, Chip } from '@heroui/react';
import { ArrowLeft, Terminal, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CodeBlock from '@/components/code-block';

const installationSteps = [
  {
    title: 'Install Node.js',
    description: 'Make sure you have Node.js 18+ installed on your system',
    code: 'node --version\n# Should return v18.0.0 or higher'
  },
  {
    title: 'Run AskBudi MCP Server',
    description: 'Run the MCP server directly using npx (no installation needed)',
    code: 'npx -y askbudi-context@latest'
  },
  {
    title: 'Set Your API Key',
    description: 'Configure your AskBudi API key as an environment variable',
    code: 'export ASKBUDI_API_KEY="your-api-key-here"\nexport PLATFORM="claude"\n# On Windows:\n# set ASKBUDI_API_KEY=your-api-key-here\n# set PLATFORM=claude'
  }
];

const claudeCodeConfig = `{
  "mcpServers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "claude"
      }
    }
  }
}`;

const cursorConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "cursor"
        }
      }
    }
  }
}`;

const windsurfConfig = `# Add to your Windsurf settings.json
{
  "mcp.servers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "windsurf"
      }
    }
  }
}`;

const claudeDesktopConfig = `{
  "mcpServers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "claude-desktop"
      }
    }
  }
}`;

const traeConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "trae"
        }
      }
    }
  }
}`;

const vscodeConfig = `{
  "mcp.servers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "vscode"
      }
    }
  }
}`;

const visualStudioConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "visual-studio"
        }
      }
    }
  }
}`;

const zedConfig = `{
  "assistant": {
    "mcp_servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "zed"
        }
      }
    }
  }
}`;

const clineConfig = `{
  "cline.mcp.servers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "cline"
      }
    }
  }
}`;

const boltaiConfig = `{
  "mcp_servers": {
    "askbudi": {
      "command": "npx",
      "args": ["-y", "askbudi-context@latest"],
      "env": {
        "ASKBUDI_API_KEY": "your-api-key-here",
        "PLATFORM": "boltai"
      }
    }
  }
}`;

const augmentConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "augment"
        }
      }
    }
  }
}`;

const rooConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "roo"
        }
      }
    }
  }
}`;

const zencoderConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "zencoder"
        }
      }
    }
  }
}`;

const amazonQConfig = `# Set environment variables
export ASKBUDI_API_KEY="your-api-key-here"
export PLATFORM="amazon-q"

# Add to Amazon Q CLI config
q config set mcp.servers.askbudi.command "npx"
q config set mcp.servers.askbudi.args '[-y, askbudi-context@latest]'`;

const qodoGenConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "qodo-gen"
        }
      }
    }
  }
}`;

const jetbrainsConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "jetbrains"
        }
      }
    }
  }
}`;

const warpConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "warp"
        }
      }
    }
  }
}`;

const opencodeConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "opencode"
        }
      }
    }
  }
}`;

const copilotAgentConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "copilot-agent"
        }
      }
    }
  }
}`;

const kiroConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "kiro"
        }
      }
    }
  }
}`;

const openaiCodexConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "openai-codex"
        }
      }
    }
  }
}`;

const lmStudioConfig = `{
  "mcp": {
    "servers": {
      "askbudi": {
        "command": "npx",
        "args": ["-y", "askbudi-context@latest"],
        "env": {
          "ASKBUDI_API_KEY": "your-api-key-here",
          "PLATFORM": "lm-studio"
        }
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
              Connect AskBudi to 25+ AI coding tools including Claude Code, Claude Desktop, Cursor, Windsurf, Trae, VS Code, Visual Studio, Zed, Cline, BoltAI, Augment Code, Roo Code, Zencoder, Amazon Q, Qodo Gen, JetBrains AI Assistant, Warp, Opencode, Copilot Agent, Kiro, OpenAI Codex, LM Studio, and more using the Model Context Protocol (MCP).
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
                    <CodeBlock code={step.code} />
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
                    <CodeBlock code={claudeCodeConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> ~/.claude_code_config.json
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="claude-desktop" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Claude Desktop</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Claude Desktop to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={claudeDesktopConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>macOS:</strong> ~/Library/Application Support/Claude/claude_desktop_config.json<br/>
                        <strong>Windows:</strong> %APPDATA%/Claude/claude_desktop_config.json
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
                    <CodeBlock code={cursorConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Cursor Settings → Extensions → MCP
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
                    <CodeBlock code={windsurfConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Windsurf Settings → Extensions → MCP
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="trae" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Trae</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Trae to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={traeConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Trae MCP Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="vscode" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>VS Code</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure VS Code (with MCP-compatible extensions) to use AskBudi:
                    </p>
                    <CodeBlock code={vscodeConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> VS Code settings.json or extension-specific config
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="visual-studio" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Visual Studio</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Visual Studio 2022 to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={visualStudioConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Visual Studio MCP Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="zed" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Zed</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Zed to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={zedConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> ~/.config/zed/settings.json
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="cline" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Cline</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Cline (VS Code extension) to use AskBudi:
                    </p>
                    <CodeBlock code={clineConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Cline Extension Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="boltai" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>BoltAI</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure BoltAI to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={boltaiConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> BoltAI MCP Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="augment" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Augment Code</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Augment Code to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={augmentConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Augment Code Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="roo" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Roo Code</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Roo Code to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={rooConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Roo Code Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="zencoder" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Zencoder</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Zencoder to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={zencoderConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Zencoder MCP Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="amazon-q" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Amazon Q</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Amazon Q Developer CLI to use AskBudi:
                    </p>
                    <CodeBlock code={amazonQConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Amazon Q CLI Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="qodo-gen" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Qodo Gen</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Qodo Gen to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={qodoGenConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Qodo Gen Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="jetbrains" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>JetBrains</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure JetBrains AI Assistant (IntelliJ, PyCharm, etc.):
                    </p>
                    <CodeBlock code={jetbrainsConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> JetBrains AI Assistant Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="warp" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Warp</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Warp terminal to use AskBudi:
                    </p>
                    <CodeBlock code={warpConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Warp Terminal Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="opencode" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Opencode</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Opencode to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={opencodeConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Opencode Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="copilot-agent" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Copilot Agent</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure GitHub Copilot Coding Agent:
                    </p>
                    <CodeBlock code={copilotAgentConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> GitHub Copilot Agent Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="kiro" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>Kiro</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure Kiro to use the AskBudi MCP server:
                    </p>
                    <CodeBlock code={kiroConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> Kiro Configuration
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="openai-codex" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>OpenAI Codex</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure OpenAI Codex integration:
                    </p>
                    <CodeBlock code={openaiCodexConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> OpenAI Codex Settings
                      </p>
                    </div>
                  </div>
                </Tab>

                <Tab key="lm-studio" title={
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4" />
                    <span>LM Studio</span>
                  </div>
                }>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure LM Studio to use AskBudi:
                    </p>
                    <CodeBlock code={lmStudioConfig} />
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 text-sm">
                        <strong>Location:</strong> LM Studio Configuration
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
                  <h3 className="font-semibold text-gray-900 mb-2">Server connection issues</h3>
                  <p className="text-gray-600 mb-2">Check if the server can be reached with npx:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">npx -y askbudi-context@latest --help</code>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">API key errors</h3>
                  <p className="text-gray-600 mb-2">Verify your environment variables are set correctly:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">echo $ASKBUDI_API_KEY && echo $PLATFORM</code>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Package not found</h3>
                  <p className="text-gray-600">If you get &quot;package not found&quot; error, make sure you have the latest npm version:</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm install -g npm@latest</code>
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