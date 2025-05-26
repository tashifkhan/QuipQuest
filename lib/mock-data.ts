// Mock data for development
import { Player, Room, GameSettings, Prompt, Answer, RoundResult } from './types';

export const mockAvatars = [
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Felix',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Aneka',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Milo',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Zoe',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Max',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Lucy',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Tom',
  'https://api.dicebear.com/6.x/fun-emoji/svg?seed=Emma',
];

export const mockPlayers: Player[] = [
  { id: '1', name: 'Player 1', avatar: mockAvatars[0], score: 0, isHost: true },
  { id: '2', name: 'Player 2', avatar: mockAvatars[1], score: 0, isHost: false },
  { id: '3', name: 'Player 3', avatar: mockAvatars[2], score: 0, isHost: false },
  { id: '4', name: 'Player 4', avatar: mockAvatars[3], score: 0, isHost: false },
];

export const mockSettings: GameSettings = {
  maxPlayers: 8,
  rounds: 3,
  promptTimer: 30,
  answerTimer: 60,
  votingTimer: 30,
  wordLimit: 100,
  anonymousMode: false,
};

export const mockRoom: Room = {
  id: '123',
  code: 'ABCD',
  hostId: '1',
  players: mockPlayers,
  settings: mockSettings,
  status: 'waiting',
  currentRound: 0,
  totalRounds: 3,
};

export const mockPrompts: Prompt[] = [
  { id: '1', text: 'The worst superpower to have would be...' },
  { id: '2', text: 'A terrible name for a new cologne or perfume...' },
  { id: '3', text: 'The most surprising thing to find in your grandparents\' attic...' },
  { id: '4', text: 'The strangest item to bring on a first date...' },
  { id: '5', text: 'An unusual use for a rubber duck...' },
];

export const mockAnswers: Answer[] = [
  { id: 'a1', playerId: '1', promptId: '1', text: 'The ability to turn invisible, but only when nobody is looking at you.', votes: ['3', '4'] },
  { id: 'a2', playerId: '2', promptId: '1', text: 'Super strength, but only in your pinky finger.', votes: [] },
  { id: 'a3', playerId: '3', promptId: '1', text: 'Reading minds, but only of people who are thinking about cabbage.', votes: ['2'] },
  { id: 'a4', playerId: '4', promptId: '1', text: 'Flying, but only 2 inches off the ground.', votes: ['1'] },
];

export const mockRoundResult: RoundResult = {
  promptId: '1',
  prompt: 'The worst superpower to have would be...',
  answers: [
    { id: 'a1', playerId: '1', playerName: 'Player 1', text: 'The ability to turn invisible, but only when nobody is looking at you.', votes: 2 },
    { id: 'a2', playerId: '2', playerName: 'Player 2', text: 'Super strength, but only in your pinky finger.', votes: 0 },
    { id: 'a3', playerId: '3', playerName: 'Player 3', text: 'Reading minds, but only of people who are thinking about cabbage.', votes: 1 },
    { id: 'a4', playerId: '4', playerName: 'Player 4', text: 'Flying, but only 2 inches off the ground.', votes: 1 },
  ],
};

export const generateMockGameState = () => ({
  player: mockPlayers[0],
  room: mockRoom,
  prompts: mockPrompts,
  currentPrompt: mockPrompts[0],
  answers: mockAnswers,
  roundResults: [mockRoundResult],
  timeRemaining: 30,
});