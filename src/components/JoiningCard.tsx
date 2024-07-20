export default function JoiningCard(props: any) {
	return (
		<>
			<div className="w-[437px] h-[78px] shrink-0 [background:rgba(146,168,161,0.80)] rounded-[54px] mb-[32px] ml-[57px] flex justify-center items-center">
				<div className="text-white text-3xl font-Head">{props.name} joined</div>
			</div>
		</>
	);
}
