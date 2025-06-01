'use client';

import { GameCard } from '@/components/ui/game-card';
import { useGameContext } from '@/context/GameContext';
import { Timer } from '@/components/ui/timer';
import { Circle as CircleNotch } from 'lucide-react';

export function GameWaiting() {
  const { room, timeRemaining } = useGameContext();
  
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Waiting for other players</h2>
        <p className="text-muted-foreground">Please wait while others finish</p>
      </div>
      
      <GameCard className="w-full mb-8 max-w-md">
        <div className="flex flex-col items-center py-8">
          <div className="animate-spin mb-6">
            <CircleNotch className="h-16 w-16 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold mb-6">
            Waiting for others to finish...
          </h3>
          
          {timeRemaining > 0 && (
            <Timer 
              duration={60} 
              timeRemaining={timeRemaining}
            />
          )}
        </div>
      </GameCard>
      
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Once everyone has finished, we'll move on to the next phase automatically.
      </p>
    </div>
  );
}