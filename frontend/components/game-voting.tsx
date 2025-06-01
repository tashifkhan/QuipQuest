'use client';

import { useState } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { Timer } from '@/components/ui/timer';
import { useGameContext } from '@/context/GameContext';
import { cn } from '@/lib/utils';

export function GameVoting() {
  const { currentPrompt, answers, timeRemaining, room, player, submitVote } = useGameContext();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  
  const handleVote = () => {
    if (!selectedAnswer) return;
    
    submitVote(selectedAnswer);
    setVoted(true);
  };
  
  const handleTimeUp = () => {
    if (!voted && selectedAnswer) {
      handleVote();
    }
  };
  
  if (!currentPrompt || !room || !player) {
    return <div>Loading...</div>;
  }

  // Filter out the current player's answer
  const filteredAnswers = room.settings.anonymousMode
    ? answers
    : answers.filter(answer => answer.playerId !== player.id);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Vote Time!</h2>
        <p className="text-muted-foreground">Choose your favorite answer</p>
      </div>
      
      <GameCard className="w-full mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Prompt:</h3>
          
          <p className="text-xl font-medium mb-6 p-4 bg-secondary/50 rounded-md">
            "{currentPrompt.text}"
          </p>
          
          <div className="space-y-3 mb-6">
            <p className="font-medium">Select your favorite answer:</p>
            
            {filteredAnswers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => !voted && setSelectedAnswer(answer.id)}
                className={cn(
                  'w-full text-left p-4 rounded-md border-2 transition-all',
                  selectedAnswer === answer.id 
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary/30 hover:bg-secondary/50',
                  voted && 'cursor-not-allowed opacity-70'
                )}
                disabled={voted}
              >
                <p className="text-lg">{answer.text}</p>
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Timer 
              duration={room.settings.votingTimer} 
              timeRemaining={timeRemaining}
              onComplete={handleTimeUp}
            />
            
            <Button
              size="lg"
              onClick={handleVote}
              disabled={!selectedAnswer || voted}
              className="w-full sm:w-auto"
            >
              {voted ? 'Vote Submitted!' : 'Submit Vote'}
            </Button>
          </div>
        </div>
      </GameCard>
      
      <p className="text-sm text-muted-foreground text-center">
        Choose wisely! You can't vote for your own answer.
      </p>
    </div>
  );
}