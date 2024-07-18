// import React from "react";
import { useState } from "react";
import "./CreatePage.css";
import SmallButton from "../components/SmallButton";

type Details = {
	maxPlayers: number;
	numRounds: number;
	roundTime: number;
	indiRoundTime: number;
	timeQuesDeciding: number;
	wordLimit: number;
	anonymous: boolean;
};

function CreatePage() {
	const [roomDetails, setRoomDetails] = useState({
		maxPlayers: 8,
		numRounds: 10,
		roundTime: 120,
		indiRoundTime: 240,
		timeQuesDeciding: 120,
		wordLimit: 200,
		anonymous: false,
	});

	function increase(atri: string) {
		setRoomDetails((prev: Details) => {
			let value: number | boolean = prev[atri];
			if (typeof value === "boolean") {
				value = !prev[atri];
			} else {
				value = prev[atri] + 1;
			}
			return {
				...prev,
				[atri]: value,
			};
		});
	}

	function decrease(atri: string) {
		setRoomDetails((prev: Details) => {
			let value: number | boolean = prev[atri];
			if (typeof value === "boolean") {
				value = !prev[atri];
			} else {
				value = prev[atri] - 1;
			}
			return {
				...prev,
				[atri]: value,
			};
		});
	}

	return (
		<>
			<div className="[background:linear-gradient(90deg,#3E3E48_56.72%,#191D24_100%)] w-full h-[100vh]">
				<div className="text-white font-Head text-[74px] font-bold leading-[normal] py-[57px] text-center">
					Create Your Room
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Maximum number of players</div>
					<SmallButton
						atribute={roomDetails.maxPlayers}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Number of rounds</div>
					<SmallButton
						atribute={roomDetails.numRounds}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Time per Round</div>
					<SmallButton
						atribute={roomDetails.roundTime}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Time for deciding a question</div>
					<SmallButton
						atribute={roomDetails.timeQuesDeciding}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Word limit for each answer</div>
					<SmallButton
						atribute={roomDetails.wordLimit}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Maximum number of players</div>
					<SmallButton
						atribute={roomDetails.maxPlayers}
						increase={increase}
						decrease={decrease}
					/>
				</div>
				<div className="flex justify-between w-[80%] mx-auto">
					<div className="display-text">Anonymous Round</div>
					<SmallButton
						atribute={roomDetails.anonymous}
						increase={increase}
						decrease={decrease}
					/>
				</div>
			</div>
		</>
	);
}

export default CreatePage;
