// Socket client utility
import { io, Socket } from 'socket.io-client';
import { GameState, Player, Room, Prompt, Answer, RoundResult } from './types';

// We'll replace this with the actual backend URL in production
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const connectSocket = (): void => {
  const socket = initializeSocket();
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = (): void => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};

// Socket event emitters
export const createRoom = (playerName: string, avatar: string, settings: any): void => {
  if (socket) socket.emit('create_room', { playerName, avatar, settings });
};

export const joinRoom = (playerName: string, avatar: string, roomCode: string): void => {
  if (socket) socket.emit('join_room', { playerName, avatar, roomCode });
};

export const startGame = (roomId: string): void => {
  if (socket) socket.emit('start_game', { roomId });
};

export const submitAnswer = (roomId: string, promptId: string, answer: string): void => {
  if (socket) socket.emit('submit_answer', { roomId, promptId, answer });
};

export const submitVote = (roomId: string, answerId: string): void => {
  if (socket) socket.emit('submit_vote', { roomId, answerId });
};

export const nextRound = (roomId: string): void => {
  if (socket) socket.emit('next_round', { roomId });
};

export const leaveRoom = (): void => {
  if (socket) socket.emit('leave_room');
};

// Event listeners
export const onRoomCreated = (callback: (room: Room) => void): void => {
  if (socket) socket.on('room_created', callback);
};

export const onRoomJoined = (callback: (data: { room: Room; player: Player }) => void): void => {
  if (socket) socket.on('room_joined', callback);
};

export const onPlayerJoined = (callback: (player: Player) => void): void => {
  if (socket) socket.on('player_joined', callback);
};

export const onPlayerLeft = (callback: (playerId: string) => void): void => {
  if (socket) socket.on('player_left', callback);
};

export const onGameStarted = (callback: (prompt: Prompt) => void): void => {
  if (socket) socket.on('game_started', callback);
};

export const onPromptReceived = (callback: (prompt: Prompt) => void): void => {
  if (socket) socket.on('prompt_received', callback);
};

export const onAnsweringPhase = (callback: () => void): void => {
  if (socket) socket.on('answering_phase', callback);
};

export const onVotingPhase = (callback: (answers: Answer[]) => void): void => {
  if (socket) socket.on('voting_phase', callback);
};

export const onRoundResults = (callback: (results: RoundResult) => void): void => {
  if (socket) socket.on('round_results', callback);
};

export const onGameResults = (callback: (players: Player[]) => void): void => {
  if (socket) socket.on('game_results', callback);
};

export const onTimerUpdate = (callback: (timeRemaining: number) => void): void => {
  if (socket) socket.on('timer_update', callback);
};

export const onError = (callback: (error: { message: string }) => void): void => {
  if (socket) socket.on('error', callback);
};

export const removeAllListeners = (): void => {
  if (socket) socket.removeAllListeners();
};