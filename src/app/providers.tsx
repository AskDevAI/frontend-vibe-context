'use client';

import { HeroUIProvider } from "@heroui/react";
import { AutumnProvider } from "autumn-js/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <AutumnProvider backendUrl={process.env.NEXT_PUBLIC_AUTUMN_BACKEND_URL || window.location.origin}>
        {children}
      </AutumnProvider>
    </HeroUIProvider>
  );
}