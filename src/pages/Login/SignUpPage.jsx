import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SignUpImage from '../../assets/signup-page-image.webp';
import LogoSmall from '../../assets/logo-sm.png';
import api from '../../api';
import { Input } from './ui/Input';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const onSubmit = async (data) => {
    if (!recaptchaToken) {
      toast.error('Por favor, complete o reCAPTCHA');
      return;
    }

    const payload = {
      username: data.name,
      email: data.email,
      password: data.password,
      matricula: data.matricula,
      role: 'USER',
      phoneNumber: data.phone,
      recaptchaToken,
      typeOfPlan: data.typeOfPlan, // Enviar 'typeOfPlan' para o backend
    };

    const promise = () =>
      new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await api.post('/auth/register', payload);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });

    toast.promise(promise(), {
      loading: 'Carregando...',
      success: () => {
        navigate('/login');
        return 'Cadastro efetuado com sucesso!';
      },
      error: (error) => error.response.data?.error || 'Erro ao cadastrar.',
    });
  };

  return (
    <main className="flex min-h-screen items-center">
      <div className="card-glass mx-auto grid min-h-screen w-full grid-cols-1 sm:overflow-hidden md:grid-cols-2 lg:h-auto lg:min-h-max lg:max-w-[800px] lg:rounded-[2rem]">
        <div className="hidden md:block">
          <img
            className="object-cover sm:h-full lg:rounded-bl-[2rem] lg:rounded-tl-[2rem]"
            src={SignUpImage}
            alt="hero"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-5 sm:grid sm:grid-cols-2"
        >
          <div className="flex flex-col items-center justify-start gap-3.5 sm:flex-row">
            <Link to="/">
              <img src={LogoSmall} alt="" />
            </Link>
            <h1 className="text-2xl font-bold">Cadastrar</h1>
          </div>

          <div />

          <div>
            <Input
              id="Nome"
              mandatory
              placeholder="Nome"
              type="text"
              {...register('name', { required: true })}
              aria-invalid={errors.name ? 'true' : 'false'}
              className={errors.name ? 'input-error p-3' : 'p-3'}
            />
          </div>

          <div>
            <Input
              id="Matrícula"
              mandatory
              placeholder="Matrícula"
              type="number"
              {...register('matricula', { required: true })}
              aria-invalid={errors.matricula ? 'true' : 'false'}
              className={errors.matricula ? 'input-error p-3' : 'p-3'}
            />
          </div>

          <div>
            <Input
              id="Número de Telefone"
              mandatory
              placeholder="00000000000"
              type="number"
              {...register('phone', { required: true })}
              aria-invalid={errors.phone ? 'true' : 'false'}
              className={errors.phone ? 'input-error p-3' : 'p-3'}
            />
          </div>

          <div>
            <Input
              id="E-mail"
              mandatory
              placeholder="email@email.com"
              type="email"
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
              className={errors.email ? 'input-error p-3' : 'p-3'}
            />
          </div>

          <div>
            <Input
              id="Senha"
              mandatory
              placeholder="Senha"
              type="password"
              {...register('password', { required: true })}
              aria-invalid={errors.password ? 'true' : 'false'}
              className={errors.password ? 'input-error p-3' : 'p-3'}
            />
          </div>

          <div>
            <Input
              id="Confimar Senha"
              mandatory
              placeholder="Confirme Senha"
              type="password"
              {...register('confirmPassword', {
                required: true,
                validate: (value) =>
                  value === watch('password') || 'As senhas não coincidem',
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              className={errors.confirmPassword ? 'input-error p-3' : 'p-3'}
            />
            {errors.confirmPassword && (
              <span className="text-start text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <Select
              onValueChange={(value) => {
                setValue('typeOfPlan', value);
              }}
            >
              <SelectTrigger className="bg-zinc-700 text-zinc-200 py-6">
                <SelectValue placeholder="Plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 flex justify-center">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

          <div className="col-span-2">
            <button type="submit" className="button mt-2 w-full">
              Cadastrar
            </button>
            <div className="my-2">Já possui cadastro?</div>
            <Link to="/login" className="button-ghost mt-4 w-full">
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
