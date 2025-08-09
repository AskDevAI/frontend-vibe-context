'use client';

import { Suspense } from 'react';
import AuthForm from '@/components/auth-form';
import { Spinner } from '@heroui/react';

function AuthFormWrapper() {
  return <AuthForm mode="signup" />;
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    }>
      <AuthFormWrapper />
    </Suspense>
  );
}