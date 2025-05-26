'use client';

import { useEffect } from 'react';
import { GameAnswer } from '@/components/game-answer';
import { useGameContext } from '@/context/GameContext';
import { useRouter } from 'next/navigation';

export default function AnswerPage() {
  const { room, player } = useGameContext();
  const router = useRouter();
  
  // Redirect if no room, player, or wrong game state
  useEffect(() => {
    if (!room || !player) {
      router.push('/');
    } else if (room.status !== 'answering') {
      // Redirect based on current game state
      switch (room.status) {
        case 'waiting':
          router.push('/lobby/' + room.code);
          break;
        case 'prompt':
          router.push('/game/prompt');
          break;
        case 'voting':
          router.push('/game/vote');
          break;
        case 'results':
          router.push('/game/round-results');
          break;
        case 'finished':
          router.push('/game/final-results');
          break;
        default:
          router.push('/');
      }
    }
  }, [room, player, router]);
  
  if (!room || !player) {
    return <div>Loading...</div>;
  }

  return <GameAnswer />;
}