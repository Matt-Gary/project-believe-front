import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/Home/index";
import { ContactPage } from "./pages/Contact/index";
import { AboutPage } from "./pages/About/index";
import { SignUpPage } from "./pages/Login/SignUpPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { ForgotPasswordPage } from "./pages/Login/ForgotPasswordPage";
import { PasswordRecoveryPage } from "./pages/Login/PasswordRecoveryPage";
import { AdminPage } from "./pages/AdminPage";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

export function Router() {
  const { authenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="admin"
          element={
            authenticated ? <AdminPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {authenticated ? (
        <>
          <Route path="login" element={<Navigate to="/" replace />} />
          <Route path="cadastro" element={<Navigate to="/" replace />} />
          <Route path="esqueci_minha_senha" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:token"
            element={<PasswordRecoveryPage />}
          />
        </>
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<SignUpPage />} />
          <Route path="esqueci_minha_senha" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:token"
            element={<PasswordRecoveryPage />}
          />
        </>
      )}
    </Routes>
  );
}
