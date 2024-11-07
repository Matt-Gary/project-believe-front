import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage"
import ErrorPage from "./pages/ErrorPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "cadastro",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "esqueci_minha_senha",
        element: <ForgotPasswordPage />,
      },
      {
        path: "recuperar_senha",
        element: <PasswordRecoveryPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "sobre",
        element: <AboutPage />,
      },
      {
        path: "contato",
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
