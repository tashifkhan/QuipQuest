'use client';

import { useEffect, useState } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/GameContext';
import Image from 'next/image';
import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GameRoundResults() {
  const { roundResults, room, player, nextRound } = useGameContext();
  const [showPlayers, setShowPlayers] = useState(false);
  
  // Get the latest round result
  const currentResult = roundResults.length > 0 ? roundResults[roundResults.length - 1] : null;
  
  // Sort answers by vote count
  const sortedAnswers = currentResult
    ? [...currentResult.answers].sort((a, b) => b.votes - a.votes)
    : [];
  
  // Reveal player names after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayers(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isHost = player?.isHost ?? false;
  const isLastRound = room?.currentRound === room?.totalRounds;
  
  if (!currentResult || !room) {
    return <div>Loading results...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Round {room.currentRound} Results</h2>
        <p className="text-muted-foreground">See how everyone voted</p>
      </div>
      
      <GameCard className="w-full mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Prompt:</h3>
          
          <p className="text-xl font-medium mb-8 p-4 bg-secondary/50 rounded-md">
            "{currentResult.prompt}"
          </p>
          
          <div className="space-y-4 mb-6">
            {sortedAnswers.map((answer, index) => {
              // Determine medal type
              let medal = null;
              if (index === 0) medal = <Trophy className="h-6 w-6 text-yellow-500" />;
              else if (index === 1) medal = <Medal className="h-6 w-6 text-gray-400" />;
              else if (index === 2) medal = <Medal className="h-6 w-6 text-amber-700" />;
              
              return (
                <div 
                  key={answer.id}
                  className={cn(
                    'flex flex-col sm:flex-row justify-between p-4 rounded-md border-2 transition-all',
                    index === 0 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border bg-secondary/30'
                  )}
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <p className="text-lg mb-2">{answer.text}</p>
                    
                    {showPlayers && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Written by: {answer.playerName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {medal && (
                      <div className="flex-shrink-0">
                        {medal}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center bg-primary/20 rounded-full h-10 w-10">
                      <span className="font-bold">{answer.votes}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {isHost && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={nextRound}
                className="min-w-[200px]"
              >
                {isLastRound ? 'View Final Results' : 'Next Round'}
              </Button>
            </div>
          )}
        </div>
      </GameCard>
      
      {!isHost && (
        <p className="text-sm text-muted-foreground text-center">
          Waiting for host to continue to the {isLastRound ? 'final results' : 'next round'}...
        </p>
      )}
    </div>
  );
}