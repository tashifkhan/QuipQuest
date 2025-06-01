'use client';

import { useState, useEffect } from 'react';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useGameContext } from '@/context/GameContext';
import { ArrowLeft, Users, Timer, Clock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockAvatars } from '@/lib/mock-data';

export default function CreateRoom() {
  const [settings, setSettings] = useState({
    maxPlayers: 8,
    rounds: 3,
    promptTimer: 30,
    answerTimer: 60,
    votingTimer: 30,
    wordLimit: 100,
    anonymousMode: false,
  });
  const { createRoom, isLoading, error } = useGameContext();
  const router = useRouter();

  // Get player info from localStorage
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState(mockAvatars[0]);

  useEffect(() => {
    const name = localStorage.getItem('playerName');
    const avatar = localStorage.getItem('playerAvatar');
    
    if (name) setPlayerName(name);
    if (avatar) setPlayerAvatar(avatar);
    
    if (!name) router.push('/');
  }, [router]);

  const handleSettingChange = (key: string, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateRoom = () => {
    if (playerName) {
      createRoom(playerName, playerAvatar, settings);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/70">
      <div className="w-full max-w-xl">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Create Room</h1>
        </div>
        
        <GameCard className="w-full mb-8">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Player Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="maxPlayers">Max Players</Label>
                    <span className="text-sm text-muted-foreground">{settings.maxPlayers}</span>
                  </div>
                  <Slider
                    id="maxPlayers"
                    min={3}
                    max={12}
                    step={1}
                    value={[settings.maxPlayers]}
                    onValueChange={(value) => handleSettingChange('maxPlayers', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Min: 3, Max: 12 players</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymousMode">Anonymous Mode</Label>
                    <p className="text-xs text-muted-foreground">Hide player names during voting</p>
                  </div>
                  <Switch
                    id="anonymousMode"
                    checked={settings.anonymousMode}
                    onCheckedChange={(checked) => handleSettingChange('anonymousMode', checked)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Game Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="rounds">Number of Rounds</Label>
                    <span className="text-sm text-muted-foreground">{settings.rounds}</span>
                  </div>
                  <Slider
                    id="rounds"
                    min={1}
                    max={10}
                    step={1}
                    value={[settings.rounds]}
                    onValueChange={(value) => handleSettingChange('rounds', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="wordLimit">Answer Word Limit</Label>
                    <span className="text-sm text-muted-foreground">{settings.wordLimit} words</span>
                  </div>
                  <Slider
                    id="wordLimit"
                    min={50}
                    max={200}
                    step={10}
                    value={[settings.wordLimit]}
                    onValueChange={(value) => handleSettingChange('wordLimit', value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Timer className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Timer Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="promptTimer">Prompt Timer</Label>
                    <span className="text-sm text-muted-foreground">{settings.promptTimer} seconds</span>
                  </div>
                  <Slider
                    id="promptTimer"
                    min={10}
                    max={60}
                    step={5}
                    value={[settings.promptTimer]}
                    onValueChange={(value) => handleSettingChange('promptTimer', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="answerTimer">Answer Timer</Label>
                    <span className="text-sm text-muted-foreground">{settings.answerTimer} seconds</span>
                  </div>
                  <Slider
                    id="answerTimer"
                    min={30}
                    max={180}
                    step={10}
                    value={[settings.answerTimer]}
                    onValueChange={(value) => handleSettingChange('answerTimer', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="votingTimer">Voting Timer</Label>
                    <span className="text-sm text-muted-foreground">{settings.votingTimer} seconds</span>
                  </div>
                  <Slider
                    id="votingTimer"
                    min={15}
                    max={90}
                    step={5}
                    value={[settings.votingTimer]}
                    onValueChange={(value) => handleSettingChange('votingTimer', value[0])}
                  />
                </div>
              </div>
            </div>
            
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            
            <Button 
              onClick={handleCreateRoom} 
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              Create Game
            </Button>
          </div>
        </GameCard>
      </div>
    </div>
  );
}