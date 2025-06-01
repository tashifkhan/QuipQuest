'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameState, Player, Room, Prompt, Answer, RoundResult, GameStatus } from '@/lib/types';
import * as socketService from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { generateMockGameState } from '@/lib/mock-data';

// Initial game state
const initialState: GameState = {
  player: null,
  room: null,
  prompts: [],
  currentPrompt: null,
  answers: [],
  roundResults: [],
  timeRemaining: 0,
};

interface GameContextType extends GameState {
  createRoom: (playerName: string, avatar: string, settings: any) => void;
  joinRoom: (playerName: string, avatar: string, roomCode: string) => void;
  startGame: () => void;
  submitAnswer: (answer: string) => void;
  submitVote: (answerId: string) => void;
  nextRound: () => void;
  leaveRoom: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  resetError: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children, mockMode = false }: { children: ReactNode, mockMode?: boolean }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize with mock data in development
  useEffect(() => {
    if (mockMode) {
      setGameState(generateMockGameState());
    }
  }, [mockMode]);

  // Initialize socket connection
  useEffect(() => {
    if (!mockMode) {
      socketService.initializeSocket();
      socketService.connectSocket();
      
      // Socket event listeners
      setupSocketListeners();
      
      return () => {
        socketService.removeAllListeners();
        socketService.disconnectSocket();
      };
    }
  }, [mockMode]);

  const setupSocketListeners = () => {
    socketService.onRoomCreated((room: Room) => {
      setGameState(prev => ({ ...prev, room }));
      router.push(`/lobby/${room.code}`);
    });

    socketService.onRoomJoined((data: { room: Room; player: Player }) => {
      setGameState(prev => ({ 
        ...prev, 
        room: data.room, 
        player: data.player 
      }));
      router.push(`/lobby/${data.room.code}`);
    });

    socketService.onPlayerJoined((player: Player) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            players: [...prev.room.players, player]
          }
        };
      });
    });

    socketService.onPlayerLeft((playerId: string) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            players: prev.room.players.filter(p => p.id !== playerId)
          }
        };
      });
    });

    socketService.onGameStarted((prompt: Prompt) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            status: 'prompt',
            currentRound: 1
          },
          currentPrompt: prompt
        };
      });
      router.push(`/game/prompt`);
    });

    socketService.onPromptReceived((prompt: Prompt) => {
      setGameState(prev => ({
        ...prev,
        currentPrompt: prompt
      }));
    });

    socketService.onAnsweringPhase(() => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            status: 'answering'
          }
        };
      });
      router.push(`/game/answer`);
    });

    socketService.onVotingPhase((answers: Answer[]) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            status: 'voting'
          },
          answers
        };
      });
      router.push(`/game/vote`);
    });

    socketService.onRoundResults((results: RoundResult) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            status: 'results'
          },
          roundResults: [...prev.roundResults, results]
        };
      });
      router.push(`/game/round-results`);
    });

    socketService.onGameResults((players: Player[]) => {
      setGameState(prev => {
        if (!prev.room) return prev;
        
        return {
          ...prev,
          room: {
            ...prev.room,
            status: 'finished',
            players
          }
        };
      });
      router.push(`/game/final-results`);
    });

    socketService.onTimerUpdate((timeRemaining: number) => {
      setGameState(prev => ({
        ...prev,
        timeRemaining
      }));
    });

    socketService.onError((error: { message: string }) => {
      setError(error.message);
    });
  };

  const resetError = () => setError(null);

  const createRoom = (playerName: string, avatar: string, settings: any) => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock room creation
        const mockPlayer: Player = {
          id: '1',
          name: playerName,
          avatar,
          score: 0,
          isHost: true
        };
        
        const mockRoom: Room = {
          id: '123',
          code: 'ABCD',
          hostId: '1',
          players: [mockPlayer],
          settings,
          status: 'waiting',
          currentRound: 0,
          totalRounds: settings.rounds
        };
        
        setGameState(prev => ({
          ...prev,
          player: mockPlayer,
          room: mockRoom
        }));
        
        setIsLoading(false);
        router.push(`/lobby/ABCD`);
      }, 1000);
    } else {
      socketService.createRoom(playerName, avatar, settings);
      setIsLoading(false);
    }
  };

  const joinRoom = (playerName: string, avatar: string, roomCode: string) => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock join room
        const mockPlayer: Player = {
          id: '5',
          name: playerName,
          avatar,
          score: 0,
          isHost: false
        };
        
        const existingGameState = generateMockGameState();
        existingGameState.room!.players.push(mockPlayer);
        existingGameState.player = mockPlayer;
        
        setGameState(existingGameState);
        setIsLoading(false);
        router.push(`/lobby/${roomCode}`);
      }, 1000);
    } else {
      socketService.joinRoom(playerName, avatar, roomCode);
      setIsLoading(false);
    }
  };

  const startGame = () => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock start game
        setGameState(prev => {
          if (!prev.room) return prev;
          
          return {
            ...prev,
            room: {
              ...prev.room,
              status: 'prompt',
              currentRound: 1
            },
            currentPrompt: { id: '1', text: 'The worst superpower to have would be...' }
          };
        });
        
        setIsLoading(false);
        router.push('/game/prompt');
      }, 1000);
    } else if (gameState.room) {
      socketService.startGame(gameState.room.id);
      setIsLoading(false);
    }
  };

  const submitAnswer = (answer: string) => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock submit answer
        setGameState(prev => {
          if (!prev.room || !prev.currentPrompt) return prev;
          
          return {
            ...prev,
            room: {
              ...prev.room,
              status: 'waiting'
            }
          };
        });
        
        setIsLoading(false);
        router.push('/game/waiting');
      }, 1000);
    } else if (gameState.room && gameState.currentPrompt) {
      socketService.submitAnswer(gameState.room.id, gameState.currentPrompt.id, answer);
      setIsLoading(false);
    }
  };

  const submitVote = (answerId: string) => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock submit vote
        setGameState(prev => {
          if (!prev.room) return prev;
          
          return {
            ...prev,
            room: {
              ...prev.room,
              status: 'waiting'
            }
          };
        });
        
        setIsLoading(false);
        router.push('/game/waiting');
      }, 1000);
    } else if (gameState.room) {
      socketService.submitVote(gameState.room.id, answerId);
      setIsLoading(false);
    }
  };

  const nextRound = () => {
    setIsLoading(true);
    resetError();
    
    if (mockMode) {
      setTimeout(() => {
        // Mock next round
        setGameState(prev => {
          if (!prev.room) return prev;
          
          const nextRound = prev.room.currentRound + 1;
          const isLastRound = nextRound > prev.room.totalRounds;
          
          if (isLastRound) {
            return {
              ...prev,
              room: {
                ...prev.room,
                status: 'finished'
              }
            };
          }
          
          return {
            ...prev,
            room: {
              ...prev.room,
              status: 'prompt',
              currentRound: nextRound
            },
            currentPrompt: { id: '2', text: 'A terrible name for a new cologne or perfume...' }
          };
        });
        
        setIsLoading(false);
        
        if (gameState.room && gameState.room.currentRound >= gameState.room.totalRounds) {
          router.push('/game/final-results');
        } else {
          router.push('/game/prompt');
        }
      }, 1000);
    } else if (gameState.room) {
      socketService.nextRound(gameState.room.id);
      setIsLoading(false);
    }
  };

  const leaveRoom = () => {
    resetError();
    
    if (mockMode) {
      setGameState(initialState);
      router.push('/');
    } else {
      socketService.leaveRoom();
      setGameState(initialState);
      router.push('/');
    }
  };

  return (
    <GameContext.Provider
      value={{
        ...gameState,
        createRoom,
        joinRoom,
        startGame,
        submitAnswer,
        submitVote,
        nextRound,
        leaveRoom,
        isLoading,
        error,
        setError,
        resetError,
        setIsLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};