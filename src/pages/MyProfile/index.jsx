import { useEffect, useRef, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/contexts/AuthContext';
import { Input } from '../Login/ui/Input';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/api';

export function MyProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const { avatar, setAvatar, userData, setUserData } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState(null);
  const [preview, setPreview] = useState(avatar);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username);
      setValue('email', userData.email);
      const formattedPhone = userData.phoneNumber?.startsWith('55')
        ? userData.phoneNumber.slice(2)
        : userData.phoneNumber;
      setValue('phoneNumber', formattedPhone);
      setValue('matricula', userData.matricula);
    }
  }, [userData, setValue]);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setInputValue(file);
      setPreview(URL.createObjectURL(file)); // Atualiza a prévia da imagem
    }
  }

  async function handleFileUpload() {
    if (!inputValue) {
      console.log('Foto não alterada');
      return null; // Retorna null se não houver foto selecionada
    }

    const formData = new FormData();
    formData.append('image', inputValue);

    try {
      const response = await api.post('/auth/update-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setAvatar(response.data.profilePhotoUrl); // Atualiza o avatar com a URL do backend
        return response.data.profilePhotoUrl; // Retorna a nova URL da foto
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
      };

      const response = await api.put('auth/userUpdateByMatricula', updatedData);
      console.log('Dados atualizados:', response);

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
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
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
