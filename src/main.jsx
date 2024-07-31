import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Home.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import NoteProvider from "./context/NoteContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router} />
      </NoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
