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
  const [loginStep, setLoginStep] = useState('login'); // 'login' ou 'verification'
  const [temporaryToken, setTemporaryToken] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // Primeiro passo - fazer login e obter token
  const onSubmitLogin = async (data) => {
    setIsLoading(true);

    try {
      // Realizar login primeiro para obter o token
      const loginResponse = await api.post('/auth/login', {
        email: data.user,
        password: data.password,
      });

      if (loginResponse.data.token) {
        // Armazenar o token temporariamente (não definir autenticado ainda)
        setTemporaryToken(loginResponse.data.token);

        // Configurar o token para próximas requisições
        api.defaults.headers.common['Authorization'] =
          `Bearer ${loginResponse.data.token}`;

        // Avançar para o passo de verificação
        setLoginStep('verification');
        toast.success(
          'Credenciais verificadas. Por favor, insira o código de verificação.',
        );
      } else {
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Usuário ou senha inválidos',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Segundo passo - verificar o código
  const onVerifyCode = async () => {
    if (otpValue.length !== 6) {
      toast.error('O código de verificação deve conter 6 dígitos');
      return;
    }

    setIsLoading(true);

    try {
      // Enviar o código para verificação com o token já configurado no cabeçalho
      await api.post('/auth/verify-code', {
        code: otpValue,
      });

      // Se chegou aqui, a verificação foi bem-sucedida
      const decodedToken = jwtDecode(temporaryToken);
      setUserData(decodedToken);
      setAuthenticated(true);

      // Salvar o token de acesso como cookie
      Cookies.set('accessToken', temporaryToken, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });

      toast.success('Login efetuado com sucesso!');
    } catch (error) {
      console.error('Erro na verificação:', error);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Código de verificação inválido',
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

        {loginStep === 'login' ? (
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

            <Link to="/esqueci-minha-senha" className="link w-fit">
              Esqueci minha senha
              <MdArrowForward />
            </Link>
            <button
              type="submit"
              className="button w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Continuar'}
            </button>
            <div className="mb-4">Não possui cadastro?</div>
            <Link to="/cadastro" className="button-ghost w-full">
              Cadastre-se
            </Link>
          </form>
        ) : (
          <div className="flex flex-col space-y-4 p-5">
            <div className="flex flex-col items-center justify-start gap-6 sm:flex-row">
              <Link to="/">
                <img src={LogoSmall} alt="" />
              </Link>
              <h1 className="text-3xl font-bold">Verificação</h1>
            </div>

            <p className="text-center">
              Por favor, insira o código de verificação de 6 dígitos
            </p>

            <div className="my-4">
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

            <button
              onClick={onVerifyCode}
              className="button w-full"
              disabled={isLoading || otpValue.length !== 6}
            >
              {isLoading ? 'Verificando...' : 'Verificar código'}
            </button>

            <button
              onClick={() => {
                setLoginStep('login');
                setOtpValue('');
                api.defaults.headers.common['Authorization'] = '';
              }}
              className="button-ghost w-full"
              disabled={isLoading}
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
