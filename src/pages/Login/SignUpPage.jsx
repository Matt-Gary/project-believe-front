import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SignUpImage from "../../assets/signup-page-image.webp";
import LogoSmall from "../../assets/logo-sm.png";
import api from "../../api"; // Import the Axios instance
import { Input } from "./ui/Input";
import { toast } from "sonner";

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Map form data to backend expectations
    const payload = {
      username: data.name,
      email: data.email,
      password: data.password,
      matricula: data.matricula,
      role: "USER", // Or any role as per your system's role setup
      phoneNumber: data.phone,
    };

    try {
      // Send registration data to backend
      const response = await api.post("/auth/register", payload);
      toast.success("Você foi cadastrado com sucesso!");
    } catch (error) {
      const errorMessage =
        error.response.data?.error.message || "Não foi possível cadastrar";
      toast.error(errorMessage);
    }
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
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
              className={errors.name ? "input-error p-3" : "p-3"}
            />
          </div>

          <div>
            <Input
              id="Matrícula"
              mandatory
              placeholder="Matrícula"
              type="number"
              {...register("matricula", { required: true })}
              aria-invalid={errors.matricula ? "true" : "false"}
              className={errors.matricula ? "input-error p-3" : "p-3"}
            />
          </div>

          <div>
            <Input
              id="Número de Telefone"
              mandatory
              placeholder="00000000000"
              type="number"
              {...register("phone", { required: true })}
              aria-invalid={errors.phone ? "true" : "false"}
              className={errors.phone ? "input-error p-3" : "p-3"}
            />
          </div>

          <div>
            <Input
              id="E-mail"
              mandatory
              placeholder="email@email.com"
              type="email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              className={errors.email ? "input-error p-3" : "p-3"}
            />
          </div>
          <div>
            <Input
              id="Senha"
              mandatory
              placeholder="Senha"
              type="password"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              className={errors.password ? "input-error p-3" : "p-3"}
            />
          </div>

          <div>
            <Input
              id="Confimar Senha"
              mandatory
              placeholder="Confime Senha"
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === watch("password") || "As senhas não coincidem",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              className={errors.confirmPassword ? "input-error p-3" : "p-3"}
            />
            {errors.confirmPassword && (
              <span className="text-start text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
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
