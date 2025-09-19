import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Stories from "./pages/Stories";
import Resources from "./pages/Resources";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import Offline from "./pages/Offline";

export const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/solutions", element: <Solutions/> },
  { path: "/pricing", element: <Pricing/> },
  { path: "/stories", element: <Stories/> },
  { path: "/resources", element: <Resources/> },
  { path: "/get-started", element: <GetStarted/> },
  { path: "/login", element: <Login/> },
  { path: "/report", element: <Report/> },
  { path: "/dashboard", element: <Dashboard/> },
  { path: "/status", element: <Status/> },
  { path: "/offline", element: <Offline/> },
  { path: "*", element: <Home/> }
]);

export default function AppRouter(){ return <RouterProvider router={router} />; }
