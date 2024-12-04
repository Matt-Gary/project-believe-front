import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoginImage from '../../assets/login-page-image.webp';
import LogoSmall from '../../assets/logo-sm.png';
import { MdArrowForward } from 'react-icons/md';
import api from '../../api'; // Import the loginUser function
import { Input } from './ui/Input';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function LoginPage() {
  const { setAuthenticated, setUserData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = async (data) => {
    try {
      const payload = { email: data.user, password: data.password };
      const response = await api.post('/auth/login', payload);

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        setUserData(decodedToken);
        setAuthenticated(true);

        const promise = () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: 'Sonner' }), 1000),
          );

        toast.promise(promise, {
          loading: 'Carregando...',
          success: () => 'Login efetuado com sucesso!',
        });

        Cookies.set('accessToken', response.data.token, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
      } else {
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      const promise = () =>
        new Promise((_, reject) => setTimeout(() => reject(error), 1000));

      toast.promise(promise, {
        loading: 'Carregando...',
        error: (err) =>
          err.response?.data?.error || 'Usuário ou senha inválidos',
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center">
      <div className="card-glass mx-auto grid h-screen w-full grid-cols-1 overflow-hidden sm:grid-cols-2 lg:h-auto lg:max-w-[800px] lg:rounded-[2rem]">
        <div className="hidden sm:block">
          <img
            className="object-cover sm:h-full lg:rounded-bl-[2rem] lg:rounded-tl-[2rem]"
            src={LoginImage}
            alt="hero"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmitLogin)}
          className="flex flex-col space-y-4 p-5"
        >
          <div className="flex flex-col items-center justify-start gap-6 sm:flex-row">
            <Link to="/">
              <img src={LogoSmall} alt="" />
            </Link>
            <h1 className="text-3xl font-bold">Entrar</h1>
          </div>

          <Input
            id="Usuário"
            placeholder="E-mail"
            type="text"
            {...register('user', { required: true })}
            aria-invalid={errors.user ? 'true' : 'false'}
            className={errors.user ? 'input-error' : ''}
          />

          <Input
            id="Senha"
            placeholder="Senha"
            type="password"
            {...register('password', { required: true })}
            aria-invalid={errors.password ? 'true' : 'false'}
            className={errors.password ? 'input-error' : ''}
          />

          <Link to="/esqueci_minha_senha" className="link w-fit">
            Esqueci minha senha
            <MdArrowForward />
          </Link>
          <button type="submit" className="button w-full">
            Entrar
          </button>
          <div className="mb-4">Não possui cadastro?</div>
          <Link to="/cadastro" className="button-ghost w-full">
            Cadastre-se
          </Link>
        </form>
      </div>
    </main>
  );
}
