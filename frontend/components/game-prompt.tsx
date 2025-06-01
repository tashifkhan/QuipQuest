'use client';

import { useState } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { Timer } from '@/components/ui/timer';
import { useGameContext } from '@/context/GameContext';
import { useRouter } from 'next/navigation';

export function GamePrompt() {
  const { currentPrompt, timeRemaining, room } = useGameContext();
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  
  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      router.push('/game/answer');
    }, 500);
  };
  
  if (!currentPrompt || !room) {
    return <div>Loading prompt...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Round {room.currentRound} of {room.totalRounds}</h2>
        <p className="text-muted-foreground">Read the prompt and get ready to answer</p>
      </div>
      
      <GameCard className="w-full mb-8 max-w-xl">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-6">Your Prompt</h3>
          
          <p className="text-2xl font-bold text-center mb-8 leading-relaxed">
            "{currentPrompt.text}"
          </p>
          
          <Timer 
            duration={room.settings.promptTimer} 
            timeRemaining={timeRemaining}
            className="mb-8"
          />
          
          <Button
            size="lg"
            className="w-full max-w-xs transition-all duration-300 transform hover:scale-105"
            onClick={handleAccept}
            disabled={accepted}
          >
            {accepted ? 'Accepted!' : 'I Got It!'}
          </Button>
        </div>
      </GameCard>
      
      <p className="text-sm text-muted-foreground text-center">
        Be creative! The funniest answers get the most votes!
      </p>
    </div>
  );
}