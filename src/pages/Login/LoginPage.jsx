import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/login-page-image.webp';
import LogoSmall from '../../assets/logo-sm.png';
import { MdArrowForward } from 'react-icons/md';
import api from '../../api';
import { Input } from './ui/Input';
import { toast } from 'sonner';
import { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function LoginPage() {
  const { setAuthenticated, setUserData } = useContext(AuthContext);
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLogin = async (data) => {
    setIsLoading(true);

    try {
      // Verificar se o código OTP foi preenchido completamente
      if (otpValue.length !== 6) {
        toast.error('O código de verificação deve conter 6 dígitos');
        setIsLoading(false);
        return;
      }

      // Criar payload com email, senha e código OTP
      const payload = {
        email: data.user,
        password: data.password,
        code: otpValue,
      };

      // Verificar o código OTP
      try {
        await api.post('/auth/verify-code', {
          email: data.user,
          code: otpValue,
        });

        // Se chegou aqui, a verificação foi bem-sucedida
        console.log('Código OTP verificado com sucesso');
      } catch (verifyError) {
        console.error('Erro na verificação do código:', verifyError);
        toast.error(
          verifyError.response?.data?.message ||
            'Código de verificação inválido',
        );
        setIsLoading(false);
        return;
      }

      // Proceder com o login
      try {
        const loginResponse = await api.post('/auth/login', {
          email: data.user,
          password: data.password,
        });

        if (loginResponse.data.token) {
          const decodedToken = jwtDecode(loginResponse.data.token);
          setUserData(decodedToken);
          setAuthenticated(true);

          toast.success('Login efetuado com sucesso!');

          Cookies.set('accessToken', loginResponse.data.token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
          });
        } else {
          throw new Error('Token não encontrado na resposta');
        }
      } catch (loginError) {
        console.error('Erro no login:', loginError);
        toast.error(
          loginError.response?.data?.message || 'Usuário ou senha inválidos',
        );
      }
    } catch (error) {
      console.error('Erro geral:', error);
      toast.error(
        error.message || 'Ocorreu um erro durante o processo de login',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value) => {
    setOtpValue(value);
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
            disabled={isLoading}
          />

          <Input
            id="Senha"
            placeholder="Senha"
            type="password"
            {...register('password', { required: true })}
            aria-invalid={errors.password ? 'true' : 'false'}
            className={errors.password ? 'input-error' : ''}
            disabled={isLoading}
          />

          <div>
            <label className="mb-2 block text-sm font-medium">
              Código de verificação
            </label>
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={handleOtpChange}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Link to="/esqueci-minha-senha" className="link w-fit">
            Esqueci minha senha
            <MdArrowForward />
          </Link>
          <button type="submit" className="button w-full" disabled={isLoading}>
            {isLoading ? 'Processando...' : 'Entrar'}
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
