import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/**
 * Componente de rota protegida para administradores
 * Redireciona para a página inicial caso o usuário não seja administrador
 */
export function AdminRoute({ children }) {
  const { authenticated, admin } = useContext(AuthContext);

  if (!authenticated) {
    toast.error('Você precisa estar logado para acessar esta página');
    return <Navigate to="/login" replace />;
  }

  if (!admin) {
    toast.error('Você não tem permissão para acessar esta página');
    return <Navigate to="/" replace />;
  }

  return children;
}
