import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainPage from "./routes/MainPage.tsx";
import CreatePage from "./routes/CreatePage.js";
import App from "./App.tsx";
import "./index.css";

const Router = createBrowserRouter([
	{ path: "/", element: <MainPage /> },
	{ path: "/create", element: <CreatePage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>
);
