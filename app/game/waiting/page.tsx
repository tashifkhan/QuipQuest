"use client";

import { GameWaiting } from "@/components/game-waiting";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WaitingPage() {
	const { room, player } = useGameContext();
	const router = useRouter();

	// Redirect if game state changes
	// useEffect(() => {
	//   if (!room || !player) {
	//     router.push('/');
	//   } else if (room.status !== 'waiting') {
	//     // Redirect based on current game state
	//     switch (room.status) {
	//       case 'prompt':
	//         router.push('/game/prompt');
	//         break;
	//       case 'answering':
	//         router.push('/game/answer');
	//         break;
	//       case 'voting':
	//         router.push('/game/vote');
	//         break;
	//       case 'results':
	//         router.push('/game/round-results');
	//         break;
	//       case 'finished':
	//         router.push('/game/final-results');
	//         break;
	//       default:
	//         router.push('/');
	//     }
	//   }
	// }, [room, player, router]);

	if (!room || !player) {
		return <div>Loading...</div>;
	}

	return <GameWaiting />;
}
