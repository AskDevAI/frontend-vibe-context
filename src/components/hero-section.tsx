'use client';

import { Button, Card, CardBody } from '@heroui/react';
import { Code, Zap, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function HeroSection() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseClient();
    
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Get the latest documentation for any library
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AskBudi
            </span>
            <span className="text-3xl md:text-4xl text-gray-700"> + </span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              TinyAgent
            </span>
            <br />
            <span className="text-4xl md:text-6xl">
              For Modern AI Development
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Complete AI development ecosystem: Get the latest documentation with AskBudi, 
            build intelligent agents with TinyAgent's three-tier architecture, and scale 
            with enterprise-grade security and flexibility.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {loading ? (
              <div className="w-40 h-12 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <Button 
                as={Link} 
                href="/dashboard" 
                color="primary" 
                size="lg" 
                className="font-semibold"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button 
                as={Link} 
                href="/auth/signup" 
                color="primary" 
                size="lg" 
                className="font-semibold"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            <Button 
              as={Link} 
              href="/tinyagent" 
              color="secondary" 
              size="lg"
              className="font-semibold"
            >
              Try TinyAgent
            </Button>
            <Button 
              as={Link} 
              href="/docs" 
              variant="bordered" 
              size="lg"
              className="font-semibold"
            >
              View Documentation
            </Button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
            <CardBody className="text-center p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Latest Documentation</h3>
              <p className="text-gray-600 text-sm">
                Always up-to-date docs for thousands of libraries across different ecosystems
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
            <CardBody className="text-center p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Intelligent Agents</h3>
              <p className="text-gray-600 text-sm">
                Build autonomous AI agents with 25+ tools and three-tier architecture
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
            <CardBody className="text-center p-6">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-gray-600 text-sm">
                Production-grade security, model flexibility, and scalable subagent swarms
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Code example preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 shadow-xl">
              <CardBody className="text-white p-6">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-gray-400 text-sm">AskBudi MCP Server</span>
                  </div>
                  <code className="text-sm">
                    <div className="text-green-400"># Get latest documentation</div>
                    <div className="mt-2">
                      <span className="text-blue-400">search_term:</span> &quot;fastapi&quot;
                    </div>
                    <div className="mt-1">
                      <span className="text-blue-400">prompt:</span> &quot;How to create endpoints?&quot;
                    </div>
                    <div className="mt-3 text-gray-400"># Returns relevant docs</div>
                    <div className="mt-1 text-yellow-400">✓ 80% token reduction</div>
                    <div className="text-yellow-400">✓ Latest FastAPI docs</div>
                    <div className="text-yellow-400">✓ Contextual examples</div>
                  </code>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-gray-900 shadow-xl">
              <CardBody className="text-white p-6">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-2 text-gray-400 text-sm">TinyAgent Python</span>
                  </div>
                  <code className="text-sm">
                    <div className="text-green-400"># Build intelligent agents</div>
                    <div className="mt-2">
                      <span className="text-purple-400">agent = TinyAgent(</span>
                    </div>
                    <div className="mt-1 ml-4">
                      <span className="text-blue-400">model=</span>&quot;gpt-4o&quot;,
                    </div>
                    <div className="ml-4">
                      <span className="text-blue-400">tools=</span>[subagent, todo_write]
                    </div>
                    <div className="mt-1">
                      <span className="text-purple-400">)</span>
                    </div>
                    <div className="mt-2 text-yellow-400">✓ 25+ built-in tools</div>
                    <div className="text-yellow-400">✓ Three-tier architecture</div>
                    <div className="text-yellow-400">✓ Enterprise security</div>
                  </code>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


