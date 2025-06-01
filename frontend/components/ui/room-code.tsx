'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomCodeProps {
  code: string;
  className?: string;
}

export function RoomCode({ code, className }: RoomCodeProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const copyLink = () => {
    const url = `${window.location.origin}?code=${code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex flex-col items-center space-y-2', className)}>
      <div className="text-sm font-medium text-muted-foreground">Room Code</div>
      
      <div className="flex items-center space-x-2">
        <div className="bg-secondary p-2 px-4 rounded-md text-2xl font-bold tracking-widest">
          {code}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Copy room code"
        >
          {copied ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <button
        onClick={copyLink}
        className="text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        Copy invite link
      </button>
    </div>
  );
}