'use client';

import { useState, useEffect } from 'react';
import { AvatarSelector } from '@/components/ui/avatar-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GameCard } from '@/components/ui/game-card';
import { useGameContext } from '@/context/GameContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { MicIcon, Users } from 'lucide-react';
import { mockAvatars } from '@/lib/mock-data';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(mockAvatars[0]);
  const { joinRoom, isLoading, error, resetError } = useGameContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for room code in URL params
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setRoomCode(code);
    }
  }, [searchParams]);

  const handleCreateRoom = () => {
    if (playerName.trim() === '') return;
    router.push('/create-room');
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerAvatar', selectedAvatar);
  };

  const handleJoinRoom = () => {
    if (playerName.trim() === '' || roomCode.trim() === '') return;
    joinRoom(playerName, selectedAvatar, roomCode);
  };

  // Handle form input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    resetError();
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value.toUpperCase());
    resetError();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/70">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <MicIcon className="h-10 w-10 text-primary mr-2" />
            <h1 className="text-4xl font-bold">Quip Quest</h1>
          </div>
          <p className="text-muted-foreground">The party game of quick wit and funny answers</p>
        </div>
        
        <GameCard className="w-full mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Your Name
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={playerName}
                onChange={handleNameChange}
                autoComplete="off"
                maxLength={20}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium leading-none mb-2">
                Choose Your Avatar
              </p>
              <AvatarSelector
                onSelect={setSelectedAvatar}
                className="mb-4"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="roomCode" className="text-sm font-medium leading-none">
                Room Code (to join existing game)
              </label>
              <Input
                id="roomCode"
                placeholder="Enter 4-letter code"
                value={roomCode}
                onChange={handleRoomCodeChange}
                autoComplete="off"
                maxLength={4}
              />
            </div>
            
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={handleJoinRoom} 
                disabled={isLoading || playerName.trim() === '' || roomCode.trim() === ''}
                className="w-full"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Game
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleCreateRoom} 
                disabled={isLoading || playerName.trim() === ''}
                variant="outline"
                className="w-full"
              >
                Create New Game
              </Button>
            </div>
          </div>
        </GameCard>
        
        <p className="text-sm text-center text-muted-foreground">
          Create a game and invite friends to join with your room code!
        </p>
      </div>
    </div>
  );
}