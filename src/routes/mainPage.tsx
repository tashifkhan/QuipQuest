import { useNavigate } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
	const navigate = useNavigate();
	function naviCreate() {
		return navigate("/create");
	}

	return (
		<>
			<div className="[background:linear-gradient(90deg,#3E3E48_56.72%,#191D24_100%)] w-full h-[100vh] overflow-auto">
				<div className="w-[1280px] mx-auto flex justify-center py-[9%]">
					<div className="bg-boxColor w-[40.625%] h-[600px] m-4 rounded-[50px] flex-col justify-center">
						<div>
							<div className="cointainer-input-box-mainpage mt-[14.3%]">
								{/* pt-[14.3%] */}
								<input
									className="input-box-mainpage"
									placeholder="Enter Your Name"
								/>
							</div>
							<div className="flex items-center my-[6.1%]">
								<button className="arrow-buttons ">{"<"}</button>
								<div className="m-auto bg-light-green-01 w-[40.5%] h-[195px] rounded-[5px]"></div>
								<button className="arrow-buttons">{">"}</button>
							</div>
							<div className="cointainer-input-box-mainpage mb-[6.1%]">
								{/* pb-[4.545%] */}
								<input
									className="input-box-mainpage"
									placeholder="Enter Room Code"
								/>
							</div>
							<div className="flex justify-center mb-[16.5%] gap-[4.5%]">
								<button className="bg-green-02 button-general">JOIN</button>
								<button
									className="bg-dark-green-03 button-general "
									onClick={naviCreate}
								>
									CREATE
								</button>
							</div>
						</div>
					</div>
					{/* right box ends here */}
					<div className="w-[40%] m-4">
						<h1 className="text-white font-Head text-[84px] "> Quip Quest </h1>
					</div>
				</div>
			</div>
		</>
	);
}

export default MainPage;
