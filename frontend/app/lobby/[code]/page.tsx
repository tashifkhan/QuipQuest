"use client";

import { useEffect } from "react";
import { GameCard } from "@/components/ui/game-card";
import { Button } from "@/components/ui/button";
import { RoomCode } from "@/components/ui/room-code";
import { PlayerList } from "@/components/ui/player-list";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { Play, ArrowLeft } from "lucide-react";

// This page should be dynamically rendered since room codes are created at runtime
export const dynamic = "force-dynamic";

export default function Lobby({ params }: { params: { code: string } }) {
	const { room, player, startGame, isLoading, leaveRoom } = useGameContext();
	const router = useRouter();

	// Redirect if no room or player
	useEffect(() => {
		if (!room || !player) {
			router.push("/");
		}
	}, [room, player, router]);

	if (!room || !player) {
		return <div>Loading...</div>;
	}

	const isHost = player.isHost;
	const canStartGame = room.players.length >= 3;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/70">
			<div className="w-full max-w-xl">
				<div className="flex items-center mb-8">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => leaveRoom()}
						className="mr-2"
					>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-bold">Game Lobby</h1>
				</div>

				<div className="mb-6">
					<RoomCode code={room.code} />
				</div>

				<GameCard className="w-full mb-8">
					<PlayerList players={room.players} />

					{isHost ? (
						<div className="mt-8">
							<Button
								onClick={startGame}
								disabled={isLoading || !canStartGame}
								className="w-full"
								size="lg"
							>
								<Play className="mr-2 h-5 w-5" />
								Start Game
							</Button>

							{!canStartGame && (
								<p className="text-sm text-amber-500 mt-2">
									You need at least 3 players to start the game.
								</p>
							)}
						</div>
					) : (
						<div className="mt-8 text-center p-4 bg-secondary/50 rounded-md">
							<p>Waiting for host to start the game...</p>
						</div>
					)}
				</GameCard>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Game Settings</h3>

					<div className="grid grid-cols-2 gap-4">
						<div className="bg-card p-4 rounded-lg">
							<p className="text-sm text-muted-foreground">Rounds</p>
							<p className="font-medium">{room.settings.rounds}</p>
						</div>

						<div className="bg-card p-4 rounded-lg">
							<p className="text-sm text-muted-foreground">Max Players</p>
							<p className="font-medium">{room.settings.maxPlayers}</p>
						</div>

						<div className="bg-card p-4 rounded-lg">
							<p className="text-sm text-muted-foreground">Answer Timer</p>
							<p className="font-medium">{room.settings.answerTimer}s</p>
						</div>

						<div className="bg-card p-4 rounded-lg">
							<p className="text-sm text-muted-foreground">Anonymous Mode</p>
							<p className="font-medium">
								{room.settings.anonymousMode ? "On" : "Off"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
