import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Visualize from "./modules/visualize/Visualize.tsx";
import Compare from "./modules/compare/Compare.tsx";
import { initializeTheme } from "./common/utils/appUtils.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/visualize", element: <Visualize /> },
  { path: "/compare", element: <Compare /> },
]);

initializeTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
