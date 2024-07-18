import { useState } from "react";

function SmallButton(props) {
	return (
		<>
			<div className="w-28 h-[43px] shrink-0 [background:#A4BAB5] flex justify-between items-center">
				<button
					className="w-3 h-5 shrink-0 text-[rgba(25,29,36,0.39)] font-Arrow text-xl font-normal leading-[normal] tracking-[3.2px] mx-1"
					onClick={props.decrease}
				>
					{"<"}
				</button>
				<div className="text-[rgba(25,29,36,0.70)] text-center font-Arrow text-xl font-normal leading-[normal] pt-1">
					{typeof props.atribute === "number"
						? props.atribute
						: props.atribute
						? "ON"
						: "OFF"}
				</div>
				<button
					className="w-3 h-5 shrink-0 text-[rgba(25,29,36,0.39)] font-Arrow text-xl font-normal leading-[normal] tracking-[3.2px] mx-1"
					onClick={props.increase}
				>
					{">"}
				</button>
			</div>
		</>
	);
}

export default SmallButton;
