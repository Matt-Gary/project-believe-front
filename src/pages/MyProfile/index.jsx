import { useEffect, useRef, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/contexts/AuthContext';
import { Input } from '../Login/ui/Input';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/api';
import { toast } from 'sonner';
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function MyProfile() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { avatar, setAvatar, userData, setUserData } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState(null);
  const [preview, setPreview] = useState(avatar);
  const [selectedPlan, setSelectedPlan] = useState(userData?.typeOfPlan);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const fileInputRef = useRef(null);

  const isExpired =
    new Date(userData?.endDate).getTime() < new Date().getTime();

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username);
      setValue('email', userData.email);
      const formattedPhone = userData.phoneNumber?.startsWith('55')
        ? userData.phoneNumber.slice(2)
        : userData.phoneNumber;
      setValue('phoneNumber', formattedPhone);
      setValue('matricula', userData.matricula);
      setSelectedPlan(userData.typeOfPlan);
    }
  }, [userData, setValue]);

  useEffect(() => {
    // Verifica se há mudanças nos valores do formulário
    const subscription = watch((values) => {
      const hasChanges =
        values.username !== userData.username ||
        values.email !== userData.email ||
        values.phoneNumber !== userData.phoneNumber ||
        selectedPlan !== userData.typeOfPlan ||
        inputValue !== null;

      setIsFormChanged(hasChanges);
    });

    return () => subscription.unsubscribe();
  }, [watch, userData, selectedPlan, inputValue]);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setInputValue(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleFileUpload() {
    if (!inputValue) return null;

    const formData = new FormData();
    formData.append('image', inputValue);

    try {
      const response = await api.post('/auth/update-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setAvatar(response.data.profilePhotoUrl);
        return response.data.profilePhotoUrl;
      }
    } catch (error) {
      console.error('Erro ao atualizar foto:', error.response?.data?.error);
      return null;
    }
  }

  async function handleSubmitForm(data) {
    try {
      const updatedData = {
        ...data,
        matricula: userData?.matricula,
        typeOfPlan: selectedPlan,
        endDate: calculateNewEndDate(selectedPlan),
      };

      const response = await api.put('auth/userUpdateByMatricula', updatedData);

      let updatedPhotoUrl = null;
      if (inputValue) {
        updatedPhotoUrl = await handleFileUpload();
      }

      if (updatedPhotoUrl) {
        setUserData({
          ...userData,
          profilePhotoUrl: updatedPhotoUrl,
        });
      }

      setUserData(updatedData);
      toast.success('Dados atualizados com sucesso!');
      setIsFormChanged(false);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
      toast.error('Erro ao atualizar os dados');
    }
  }

  function calculateNewEndDate(plan) {
    const startDate = new Date();
    switch (plan) {
      case 'mensal':
        startDate.setMonth(startDate.getMonth() + 1);
        break;
      case 'trimestral':
        startDate.setMonth(startDate.getMonth() + 3);
        break;
      case 'semestral':
        startDate.setMonth(startDate.getMonth() + 6);
        break;
      case 'anual':
        startDate.setFullYear(startDate.getFullYear() + 1);
        break;
      default:
        break;
    }
    return startDate.toISOString();
  }

  return (
    <main className="wrapper flex justify-center py-16">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center md:justify-items-start">
          <div className="relative">
            <img
              src={preview}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border border-gray-300"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-full"
            >
              Trocar
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold  md:text-5xl">
              {userData?.username}
            </h1>
            <p className="text-gray-500">{userData?.email}</p>
          </div>

          <div>
            <span className="font-bold text-lg">Nome</span>
            <Input {...register('username')} />
          </div>
          <div>
            <span className="font-bold text-lg">Email</span>
            <Input {...register('email')} />
          </div>
          <div>
            <span className="font-bold text-lg">Telefone</span>
            <Input {...register('phoneNumber')} />
          </div>
          <div>
            <span className="font-bold text-lg">Senha</span>
            <Input placeholder="***********" disabled={!!userData} />
            <Link
              to="/esqueci-minha-senha"
              className="flex gap-1 items-center underline cursor-pointer"
            >
              <span className="font-bold text-base">Alterar senha</span>
              <ExternalLink size={16} />
            </Link>
          </div>
          <div className="w-full">
            <span className="font-bold text-lg">Tipo de plano</span>
            <Select
              disabled={!isExpired}
              value={selectedPlan}
              onValueChange={setSelectedPlan}
            >
              <SelectTrigger className="w-64 h-14 mt-1 border border-white border-opacity-20 bg-white bg-opacity-5">
                <SelectValue
                  className="first-letter:uppercase"
                  placeholder={selectedPlan}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <span>Data de expiração</span>
            <Input
              type="text"
              placeholder={
                userData?.endDate
                  ? new Date(userData.endDate).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : ''
              }
              disabled
            />
          </div>
          <div>
            <span className="font-bold text-lg">Matrícula</span>
            <Input disabled {...register('matricula')} />
          </div>
        </div>

        {/* Botão de envio */}
        <div className="place-self-center">
          <button
            type="submit"
            className="mt-8 bg-[#00B4D8] px-16 py-2 rounded-full font-bold text-xl"
          >
            Salvar
          </button>
        </div>
      </form>
    </main>
  );
}
