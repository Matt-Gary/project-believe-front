import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/Home/index';

import { AboutPage } from './pages/About/index';
import { SignUpPage } from './pages/Login/SignUpPage';
import { LoginPage } from './pages/Login/LoginPage';
import { ForgotPasswordPage } from './pages/Login/ForgotPasswordPage';
import { PasswordRecoveryPage } from './pages/Login/PasswordRecoveryPage';
import { AdminPage } from './pages/AdminPainel/AdminPage';
import { DefaultLayout } from './layouts/DefaultLayout';
import { AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';
import { StudentAreaPage } from './pages/StudentArea';
import { ClubeBeneficios } from './pages/ClubeBeneficios';
import { Calendarios } from './pages/Calendar';
import { Gallery } from './pages/Gallery/index';
import { EventGallery } from './pages/Gallery/components/event-gallery';
import { Tutorials } from './pages/Tutorials';
import { MyProfile } from './pages/MyProfile';
import { EditarBeneficios } from './pages/ClubeBeneficios/EditarBeneficios';
import EditarCalendar from './pages/Calendar/EditarCalendar';
export function Router() {
  const { authenticated, admin } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre" element={<AboutPage />} />
        <Route path="clube-beneficios" element={<ClubeBeneficios />} />
        <Route path="calendarios" element={<Calendarios />} />
        <Route path="galeria" element={<Gallery />} />
        <Route path="galeria/:id" element={<EventGallery />} />
        <Route path="tutoriais" element={<Tutorials />} />
        <Route path="admin" element={<AdminPage />} />
        {authenticated ? (
          <Route path="area-do-aluno" element={<StudentAreaPage />} />
        ) : (
          <Route
            path="area-do-aluno"
            element={<Navigate to="/login" replace />}
          />
        )}
        <Route path="meu-perfil" element={<MyProfile />} />
        <Route path="/editar-beneficios" element={<EditarBeneficios />} />
        <Route path="/editar-calendario" element={<EditarCalendar />} />
      </Route>

      <Route
        path="admin"
        element={admin ? <AdminPage /> : <Navigate to="/" replace />}
      />

      {authenticated ? (
        <>
          <Route
            path="login"
            element={<Navigate to="/area-do-aluno" replace />}
          />
          <Route
            path="cadastro"
            element={<Navigate to="/area-do-aluno" replace />}
          />
          <Route path="esqueci-minha-senha" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:token"
            element={<PasswordRecoveryPage />}
          />
        </>
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<SignUpPage />} />
          <Route path="esqueci-minha-senha" element={<ForgotPasswordPage />} />
          <Route
            path="reset-password/:token"
            element={<PasswordRecoveryPage />}
          />
        </>
      )}
    </Routes>
  );
}
