import { InputOtpAdmin } from '../AdminPainel/components/InputOTP';
import { AuthContext } from '@/contexts/AuthContext';
import { User } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

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
      <div className="flex gap-8 self-start">
        {users.map((user) => (
          <div className="flex flex-col items-center justify-center p-6 w-[300px] self-start  rounded-lg">
            <div className="bg-[#D9D9D9] w-full rounded-t-lg flex justify-center p-6">
              <User size={100} />
            </div>
            <div className="bg-[#3C3C3C] w-full  justify-center p-6 rounded-b-lg flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <h2>atualizar usuario</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
