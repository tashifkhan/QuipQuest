'use client';

import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/GameContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Crown, Trophy, Medal, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GameFinalResults() {
  const { room, player, leaveRoom } = useGameContext();
  const router = useRouter();
  
  const handlePlayAgain = () => {
    // Reset game but keep same players
    router.push('/create-room');
  };
  
  const handleQuit = () => {
    leaveRoom();
  };
  
  if (!room || !player) {
    return <div>Loading results...</div>;
  }

  // Sort players by score
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);
  
  // Get top 3 players
  const [first, second, third] = sortedPlayers;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
        <p className="text-muted-foreground">Final Results</p>
      </div>
      
      {/* Winners Podium */}
      {sortedPlayers.length >= 3 && (
        <div className="flex justify-center items-end gap-4 mb-12">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-gray-400 mb-2">
              <Image
                src={second.avatar}
                alt={second.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-semibold">{second.name}</p>
            <div className="flex items-center">
              <Medal className="h-5 w-5 text-gray-400 mr-1" />
              <span className="font-bold">{second.score}</span>
            </div>
            <div className="h-24 w-20 bg-gray-400/70 rounded-t-md mt-2"></div>
          </div>
          
          {/* First Place */}
          <div className="flex flex-col items-center">
            <Crown className="h-8 w-8 text-yellow-500 mb-1" />
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-yellow-500 mb-2">
              <Image
                src={first.avatar}
                alt={first.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-bold text-lg">{first.name}</p>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-bold text-lg">{first.score}</span>
            </div>
            <div className="h-32 w-24 bg-yellow-500/70 rounded-t-md mt-2"></div>
          </div>
          
          {/* Third Place */}
          <div className="flex flex-col items-center">
            <div className="relative h-14 w-14 rounded-full overflow-hidden border-4 border-amber-700 mb-2">
              <Image
                src={third.avatar}
                alt={third.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{third.name}</p>
            <div className="flex items-center">
              <Medal className="h-4 w-4 text-amber-700 mr-1" />
              <span className="font-bold">{third.score}</span>
            </div>
            <div className="h-16 w-18 bg-amber-700/70 rounded-t-md mt-2"></div>
          </div>
        </div>
      )}
      
      {/* Full Leaderboard */}
      <GameCard className="w-full mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center">Final Scores</h3>
          
          <div className="space-y-3 mb-6">
            {sortedPlayers.map((player, index) => {
              let medal = null;
              if (index === 0) medal = <Trophy className="h-5 w-5 text-yellow-500" />;
              else if (index === 1) medal = <Medal className="h-5 w-5 text-gray-400" />;
              else if (index === 2) medal = <Medal className="h-5 w-5 text-amber-700" />;
              
              return (
                <div 
                  key={player.id}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-md',
                    index === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-secondary/30'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold w-6">{index + 1}</div>
                    
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="font-medium">{player.name}</div>
                    
                    {medal && (
                      <div>{medal}</div>
                    )}
                  </div>
                  
                  <div className="font-bold text-xl">{player.score}</div>
                </div>
              );
            })}
          </div>
          
          {/* Game Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            {player.isHost && (
              <Button onClick={handlePlayAgain} size="lg" className="space-x-2">
                <Trophy className="h-5 w-5 mr-1" />
                <span>Play Again</span>
              </Button>
            )}
            
            <Button onClick={handleQuit} variant="outline" size="lg" className="space-x-2">
              <Home className="h-5 w-5 mr-1" />
              <span>Return Home</span>
            </Button>
          </div>
        </div>
      </GameCard>
    </div>
  );
}