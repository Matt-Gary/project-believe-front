import { AuthContext } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EditarBeneficios() {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData && userData.role !== 'ADMIN') {
      navigate('/');
    }
  }, [userData, navigate]);
  return (
    <main className="wrapper py-16">
      <h1 className="text-4xl font-bold">Editar Benefícios</h1>
      <div className="border-dashed border-2 border-gray-500 max-w-[300px] h-[250px] mt-6 p-4 rounded-md flex justify-center items-center cursor-pointer">
        <Plus size={64} className="text-gray-500" />
      </div>
    </main>
  );
}
