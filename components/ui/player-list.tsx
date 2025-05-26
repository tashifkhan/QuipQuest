'use client';

import { Player } from '@/lib/types';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerListProps {
  players: Player[];
  showScores?: boolean;
  className?: string;
}

export function PlayerList({ players, showScores = false, className }: PlayerListProps) {
  // Sort players by score if showing scores
  const sortedPlayers = showScores
    ? [...players].sort((a, b) => b.score - a.score)
    : players;

  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-lg font-semibold mb-3">
        Players ({players.length})
      </h3>
      
      <div className="space-y-2">
        {sortedPlayers.map((player) => (
          <div 
            key={player.id}
            className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary/70 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-background">
                <Image
                  src={player.avatar}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex items-center">
                <span className="font-medium">{player.name}</span>
                {player.isHost && (
                  <Crown className="h-4 w-4 ml-2 text-yellow-500" />
                )}
              </div>
            </div>
            
            {showScores && (
              <div className="font-bold text-lg">
                {player.score}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}