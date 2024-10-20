import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import PendingRequestsPage from "./pages/pendingRequestsPage/PendingRequestsPage";
import UnprotectedRoute from "./services/auth/UnprotectedRoute";
import RegisterProPage from "./pages/registerProPage/RegisterProPage";
import ProtectedRoute from "./services/auth/ProtectedRoute";
import RequestsPage from "./pages/requestsPage/requestsPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import SearchPage from "./pages/searchPage/SearchPage";
import LoginPage from "./pages/loginPage/LoginPage";
import HomePage from "./pages/homePage/HomePage";
import React from "react";
import { ToastContainer } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css';   
import "./styles/Colors.css";
import "./index.css";

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
    path: "/profile/:email/:comesFromRequest",
    element: <ProtectedRoute element={<ProfilePage />} />,
  },
  {
    path: "/requestsPage",
    element: <ProtectedRoute element={<RequestsPage />} />,
  },
  {
    path: "/pendingRequests",
    element: <ProtectedRoute element={<PendingRequestsPage />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer 
      position="top-left"   // Aquí defines la nueva posición
      autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
    />
  </React.StrictMode>
);
