'use client';

import { ReactNode } from 'react';
import { GameProvider } from '@/context/GameContext';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
  mockMode?: boolean;
}

export function Providers({ children, mockMode = true }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <GameProvider mockMode={mockMode}>
        {children}
      </GameProvider>
    </ThemeProvider>
  );
}