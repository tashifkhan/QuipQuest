'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Circle as CircleNotch } from 'lucide-react';

interface TimerProps {
  duration: number;
  timeRemaining?: number;
  onComplete?: () => void;
  className?: string;
}

export function Timer({ 
  duration, 
  timeRemaining: externalTimeRemaining, 
  onComplete, 
  className 
}: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(externalTimeRemaining || duration);
  const [isActive, setIsActive] = useState(true);
  
  // Calculate progress percentage
  const progress = (timeRemaining / duration) * 100;
  
  // Determine color based on time remaining
  const getTimerColor = () => {
    if (progress > 66) return 'bg-green-500';
    if (progress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  useEffect(() => {
    // If external time remaining is provided, use it
    if (externalTimeRemaining !== undefined) {
      setTimeRemaining(externalTimeRemaining);
      return;
    }

    // Otherwise use local timer
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            if (interval) clearInterval(interval);
            if (onComplete) onComplete();
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, onComplete, externalTimeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            className="text-gray-700" 
            strokeWidth="8" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
          
          {/* Progress circle */}
          <circle 
            className={getTimerColor()}
            strokeWidth="8" 
            strokeDasharray="251.2" 
            strokeDashoffset={251.2 - (251.2 * progress) / 100} 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
        </svg>
        
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-xl font-bold">{formatTime(timeRemaining)}</div>
        </div>
      </div>
      
      {/* Status text */}
      <p className="mt-2 text-sm font-medium text-gray-400">
        {timeRemaining > 0 ? 'Time Remaining' : 'Time Up!'}
      </p>
    </div>
  );
}