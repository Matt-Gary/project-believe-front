import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import api from '../../api';
import { CardUser } from './components/CardUser';
import { SkeletonCard } from './components/SkeletonCard';
import { InputOtpAdmin } from '../AdminPainel/components/InputOTP';

export function AdminPage() {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUsers() {
    setLoading(true);
    try {
      const response = await api.get('auth/all-users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="wrapper py-16 flex items-center justify-center flex-col gap-8">
      <h1 className="text-4xl font-bold">ADMIN PAINEL</h1>
      <InputOtpAdmin />
      <div className="flex flex-wrap gap-8 self-start">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : users.map((user) => (
              <CardUser
                key={user.id}
                profilePhotoUrl={user.profilePhotoUrl}
                username={user.username}
                matricula={user.matricula}
                typeOfPlan={user.typeOfPlan}
                startDate={user.startDate}
                endDate={user.endDate}
                getUsers={getUsers}
              />
            ))}
      </div>
    </div>
  );
}
