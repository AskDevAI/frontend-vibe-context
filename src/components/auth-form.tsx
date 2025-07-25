'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardBody, Link } from '@heroui/react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const supabase = createSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;

        if (data.user && !data.user.email_confirmed_at) {
          setError('Please check your email to confirm your account.');
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="bg-white shadow-lg">
      <CardBody className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {mode === 'login' 
              ? 'Welcome back! Please sign in to continue.' 
              : 'Join thousands of developers using AskBudi.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              startContent={<User className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              isRequired
            />
          )}

          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            variant="bordered"
            isRequired
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            startContent={<Lock className="w-4 h-4 text-gray-400" />}
            endContent={
              <button 
                className="focus:outline-none" 
                type="button" 
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            variant="bordered"
            isRequired
          />

          {error && (
            <div className="bg-danger-50 border border-danger-200 rounded-md p-3">
              <p className="text-danger-600 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={loading}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-medium">
                Sign in
              </Link>
            </p>
          )}
        </div>

        {mode === 'login' && (
          <div className="mt-4 text-center">
            <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-primary">
              Forgot your password?
            </Link>
          </div>
        )}

        {mode === 'signup' && (
          <div className="mt-6 text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary">Privacy Policy</Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
}