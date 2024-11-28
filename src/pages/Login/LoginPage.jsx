import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/login-page-image.webp";
import LogoSmall from "../../assets/logo-sm.png";
import { MdArrowForward } from "react-icons/md";
import api from "../../api"; // Import the loginUser function
import { Input } from "./ui/Input";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Adjust data structure to match backend expectations
      const payload = { email: data.user, password: data.password };
      const response = await api.post("/auth/login", payload);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center">
      <div className="card-glass mx-auto grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2 lg:h-auto lg:max-w-[800px] lg:rounded-[2rem]">
        <div className="hidden md:block">
          <img
            className="object-cover md:h-full lg:rounded-bl-[2rem] lg:rounded-tl-[2rem]"
            src={LoginImage}
            alt="hero"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 p-5"
        >
          <Link
            className="flex flex-col items-center justify-start gap-6 md:flex-row"
            to="/"
          >
            <img src={LogoSmall} alt="" />
            <h1 className="text-3xl font-bold">Entrar</h1>
          </Link>

          <Input
            id="Usuário"
            placeholder="E-mail ou Matrícula"
            type="text"
            {...register("user", { required: true })}
            aria-invalid={errors.user ? "true" : "false"}
          />
          {errors.user && (
            <span className="text-start text-sm text-red-500">
              Este campo é obrigatório.
            </span>
          )}

          <Input
            id="Senha"
            placeholder="Senha"
            type="password"
            {...register("password", { required: true })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <span className="text-start text-sm text-red-500">
              Este campo é obrigatório.
            </span>
          )}

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
