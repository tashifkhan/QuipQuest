// Game Types
export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  players: Player[];
  settings: GameSettings;
  status: GameStatus;
  currentRound: number;
  totalRounds: number;
}

export interface GameSettings {
  maxPlayers: number;
  rounds: number;
  promptTimer: number;
  answerTimer: number;
  votingTimer: number;
  wordLimit: number;
  anonymousMode: boolean;
}

export interface Prompt {
  id: string;
  text: string;
}

export interface Answer {
  id: string;
  playerId: string;
  promptId: string;
  text: string;
  votes: string[]; // Array of player IDs who voted for this answer
}

export interface RoundResult {
  promptId: string;
  prompt: string;
  answers: {
    id: string;
    playerId: string;
    playerName: string;
    text: string;
    votes: number;
  }[];
}

export type GameStatus = 
  | 'waiting' 
  | 'prompt' 
  | 'answering' 
  | 'voting' 
  | 'results' 
  | 'leaderboard' 
  | 'finished';

export interface GameState {
  player: Player | null;
  room: Room | null;
  prompts: Prompt[];
  currentPrompt: Prompt | null;
  answers: Answer[];
  roundResults: RoundResult[];
  timeRemaining: number;
}