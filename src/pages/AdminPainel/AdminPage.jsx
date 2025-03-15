import { InputOtpAdmin } from '../AdminPainel/components/InputOTP';
import { AuthContext } from '@/contexts/AuthContext';
import { Check, RefreshCcw } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { CardUser } from './components/CardUser';

export function AdminPage() {
  const { userData } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      if (userData.role !== 'ADMIN') {
        navigate('/');
      }
    }
  }, [userData, navigate]);

  async function getUsers() {
    const response = await api.get('auth/all-users');
    console.log(response.data);
    setUsers(response.data.users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="wrapper py-16  flex items-center justify-center flex-col gap-8">
      <h1 className=" text-4xl font-bold">ADMIN PAINEL</h1>
      <InputOtpAdmin />
      <div className="flex flex-wrap gap-8 self-start">
        {users.map((user) => (
          <CardUser
            key={user._id}
            profilePhotoUrl={user.profilePhotoUrl}
            username={user.username}
            matricula={user.matricula}
            typeOfPlan={user.typeOfPlan}
            startDate={user.startDate}
            endDate={user.endDate}
          />
        ))}
      </div>
    </div>
  );
}
