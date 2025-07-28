'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import { type User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          // Redirect to login with next_url parameter
          const nextUrl = encodeURIComponent(pathname);
          router.push(`/auth/login?next_url=${nextUrl}`);
          return;
        }
        
        setUser(user);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Redirect to login on error
        const nextUrl = encodeURIComponent(pathname);
        router.push(`/auth/login?next_url=${nextUrl}`);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session?.user) {
          // Redirect to login with next_url parameter
          const nextUrl = encodeURIComponent(pathname);
          router.push(`/auth/login?next_url=${nextUrl}`);
        } else if (event === 'SIGNED_IN') {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router, pathname]);

  if (loading) {
    return (
      fallback || (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}