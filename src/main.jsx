import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Game from "./pages/Game.jsx";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "game",
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
