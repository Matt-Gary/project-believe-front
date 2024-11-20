import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HomePage } from "./pages/Home/index.jsx";
import "./index.css";
import { AboutPage } from "./pages/About/index.jsx";
import { SignUpPage } from "./pages/Login/SignUpPage";
import { LoginPage } from "./pages/Login/LoginPage.jsx";
import { ForgotPasswordPage } from "./pages/Login/ForgotPasswordPage.jsx";
import { PasswordRecoveryPage } from "./pages/Login/PasswordRecoveryPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { ContactPage } from "./pages/Contact/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
        path: "reset-password/:token",
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
  </React.StrictMode>,
);
