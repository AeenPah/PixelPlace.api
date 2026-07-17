import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Auth/Register/Register";
import LoginPage from "../pages/Auth/Login/Login";
import Canvas from "../pages/Canvas/Canvas";

export const router = createBrowserRouter([
  { path: "/", element: <Canvas /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
]);
