// import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
import JoiningCard from "./JoiningCard";

function WaitAfterCreate() {
	return (
		<>
			<div className="[background:linear-gradient(90deg,#3E3E48_56.72%,#191D24_100%)] w-full h-[100vh] overflow-scroll">
				<div className="w-[1280px] h-[100vh] mx-auto">
					<div className="text-white font-Head text-[64px] font-bold leading-[normal] mb-[51px] pt-[51px] mx-auto text-center">
						Waiting for players to join...
					</div>
					<div className="ml-16 grid grid-cols-2 gap-10">
						<div className="">
							<div className="shrink-0 [background:#191D24] rounded-[36px]">
								<div className="text-white font-Head text-[39px] font-normal leading-[normal] text-center">
									<div className="pt-[37px] pb-[14px]">Share Room Code</div>
								</div>
								<div className="flex justify-center mb-3">
									<div className="flex justify-center items-center w-[415px] h-[61px] shrink-0 bg-[#A4BAB5] rounded-[15px] text-[rgba(25,29,36,0.71)] font-Head text-[40px] font-normal leading-[normal]">
										CODE lalala
									</div>
								</div>
								<div className="flex justify-end gap-2 mr-7 pb-[30px]">
									<span className="text-[#71B2AB] font-Head text-2xl">
										Copy Code
									</span>
									<FaLink size="28" className="text-[#71B2AB]" />
								</div>
							</div>
							<button className="w-[183px] h-[51px] shrink-0 [background:#71B2AB] rounded-[13px] text-white font-Butto text-2xl font-black leading-[normal] tracking-[3.84px] ml-[10px] mt-[30px]">
								START
							</button>
						</div>
						<div className="">
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="dsfhsfhnfgndhdrgf" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
							<JoiningCard name="Abc" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default WaitAfterCreate;
