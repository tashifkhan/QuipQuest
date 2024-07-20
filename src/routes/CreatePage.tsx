import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreatePageComp from "../components/CreatePageComp";
import WaitAfterCrete from "../components/WaitAfterCreate";

function CreatePage() {
	const [created, setCreated] = useState(false);
	const navigate = useNavigate();
	// function naviMain() {
	// 	return navigate("/");
	// }

	return (
		<>
			{created ? (
				<WaitAfterCrete />
			) : (
				<CreatePageComp
					showWait={() => {
						setCreated(true);
					}}
				/>
			)}
		</>
	);
}

export default CreatePage;
