import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SignUpImage from "../../assets/signup-page-image.webp";
import LogoSmall from "../../assets/logo-sm.png";
import api from "../../api"; // Import the Axios instance

export function SignUpPage() {
  const {
    register,
    handleSubmit,
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
      console.log("Registration successful:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message,
      );
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main>
      <section className="flex min-h-screen items-center justify-center pb-32 pt-32">
        <div className="wrapper card-glass grid grid-cols-2 overflow-hidden rounded-[2rem]">
          <div className="relative overflow-hidden">
            <img src={SignUpImage} alt="" className="absolute h-full w-full" />
          </div>
          <div className="p-24">
            <div className="mb-16 flex items-center gap-8">
              <img src={LogoSmall} alt="" />
              <h1 className="text-4xl font-bold">Cadastro</h1>
            </div>
            <div className="mb-8 flex flex-col gap-4">
              {/* Username field */}
              <div className="flex flex-col">
                <label htmlFor="signUpName" className="mb-2 flex">
                  Nome<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpName"
                  placeholder="Nome"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.name ? "input-error" : ""}`}
                  {...register("name", { required: true })}
                />
                {errors?.name && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>

              {/* Matrícula field */}
              <div className="flex flex-col">
                <label htmlFor="signUpId" className="mb-2 flex">
                  Matrícula<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpId"
                  placeholder="Matrícula"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.matricula ? "input-error" : ""}`}
                  {...register("matricula", { required: true })}
                />
                {errors?.matricula && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>

              {/* Phone Number field */}
              <div className="flex flex-col">
                <label htmlFor="signUpPhone" className="mb-2 flex">
                  Número do Telefone<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpPhone"
                  placeholder="Número do Telefone"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.phone ? "input-error" : ""}`}
                  {...register("phone", { required: true })}
                />
                {errors?.phone && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>

              {/* Email field */}
              <div className="flex flex-col">
                <label htmlFor="signUpEmail" className="mb-2 flex">
                  E-mail<span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="signUpEmail"
                  placeholder="exemplo@email.com"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.email ? "input-error" : ""}`}
                  {...register("email", { required: true })}
                />
                {errors?.email && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>

              {/* Password field */}
              <div className="flex flex-col">
                <label htmlFor="signUpPassword" className="mb-2 flex">
                  Senha<span className="text-accent">*</span>
                </label>
                <input
                  type="password"
                  id="signUpPassword"
                  placeholder="Senha"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.password ? "input-error" : ""}`}
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors?.password && errors.password.type === "minLength" && (
                  <span className="pt-3 text-sm text-red-500">
                    A senha deve conter no mínimo 8 caracteres.
                  </span>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="flex flex-col">
                <label htmlFor="signUpConfirmPassword" className="mb-2 flex">
                  Confirmar Senha<span className="text-accent">*</span>
                </label>
                <input
                  type="password"
                  id="signUpConfirmPassword"
                  placeholder="Confirmar Senha"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${errors?.confirmPassword ? "input-error" : ""}`}
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                  })}
                />
                {errors?.confirmPassword &&
                  errors.confirmPassword.type === "minLength" && (
                    <span className="pt-3 text-sm text-red-500">
                      A senha deve conter no mínimo 8 caracteres.
                    </span>
                  )}
              </div>

              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button mt-4 w-full"
              >
                Cadastrar
              </button>
            </div>
            <div className="mb-4">Já possui cadastro?</div>
            <Link to="/login" className="button-ghost w-full">
              Entrar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
