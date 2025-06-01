'use client';

import { useState } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { Timer } from '@/components/ui/timer';
import { useGameContext } from '@/context/GameContext';
import { Textarea } from '@/components/ui/textarea';

export function GameAnswer() {
  const { currentPrompt, timeRemaining, room, submitAnswer } = useGameContext();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = () => {
    if (answer.trim() === '') return;
    
    submitAnswer(answer);
    setSubmitted(true);
  };
  
  const handleTimeUp = () => {
    if (!submitted && answer.trim() !== '') {
      handleSubmit();
    }
  };
  
  if (!currentPrompt || !room) {
    return <div>Loading...</div>;
  }

  const maxWords = room.settings.wordLimit;
  const wordCount = answer.trim() === '' ? 0 : answer.trim().split(/\s+/).length;
  const isOverLimit = wordCount > maxWords;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Answer</h2>
        <p className="text-muted-foreground">Be creative and funny!</p>
      </div>
      
      <GameCard className="w-full mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Prompt:</h3>
          
          <p className="text-xl font-medium mb-6 p-4 bg-secondary/50 rounded-md">
            "{currentPrompt.text}"
          </p>
          
          <div className="space-y-2 mb-6">
            <label htmlFor="answer" className="text-lg font-medium">
              Your answer:
            </label>
            
            <Textarea
              id="answer"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[120px] text-lg"
              disabled={submitted}
            />
            
            <div className="flex justify-between text-sm">
              <span className={isOverLimit ? 'text-red-500 font-medium' : 'text-muted-foreground'}>
                {wordCount}/{maxWords} words
              </span>
              
              {isOverLimit && (
                <span className="text-red-500 font-medium">
                  Word limit exceeded!
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Timer 
              duration={room.settings.answerTimer} 
              timeRemaining={timeRemaining}
              onComplete={handleTimeUp}
            />
            
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={answer.trim() === '' || isOverLimit || submitted}
              className="w-full sm:w-auto"
            >
              {submitted ? 'Submitted!' : 'Submit Answer'}
            </Button>
          </div>
        </div>
      </GameCard>
      
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Think outside the box! The most creative and funny answers tend to get the most votes.
      </p>
    </div>
  );
}