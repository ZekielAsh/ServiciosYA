import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import UnprotectedRoute from "./services/auth/UnprotectedRoute";
import RegisterProPage from "./pages/registerProPage/RegisterProPage";
import ProtectedRoute from "./services/auth/ProtectedRoute";
import RegisterPage from "./pages/registerPage/RegisterPage";
import SearchPage from "./pages/searchPage/SearchPage";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import Profile from "./pages/profilePage/Profile";
import React from "react";
import "./styles/Colors.css";
import "./index.css";
import BackgroundSection from './components/backgroundSection/BackgroundSection';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <UnprotectedRoute element={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <UnprotectedRoute element={<RegisterPage />} />,
  },
  {
    path: "/registerPro",
    element: <ProtectedRoute element={<RegisterProPage />} />,
  },
  {
    path: "/search/:text",
    element: <SearchPage />,
  },
  {
    path: "/profile/:email",
    element: <ProtectedRoute element={<Profile />} />,
  }
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
