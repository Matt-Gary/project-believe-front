import { Routes, Route } from "react-router-dom";
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

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cadastro" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="esqueci_minha_senha" element={<ForgotPasswordPage />} />
        <Route
          path="reset-password/:token"
          element={<PasswordRecoveryPage />}
        />
        <Route path="admin" element={<AdminPage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
