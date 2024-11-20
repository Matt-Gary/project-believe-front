import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api"; // Import Axios instance

export function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const { token } = useParams(); // Get the token from the URL

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Ensure the password and token are sent to the backend
    try {
      const payload = {
        token: token,
        password: data.password,
      };
      const response = await api.post("/auth/reset-password", payload);
      console.log("Password reset successful:", response.data);
      alert("Senha redefinida com sucesso! Faça login novamente.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error(
        "Password reset error:",
        error.response ? error.response.data : error.message,
      );
      alert("Erro ao redefinir senha. Tente novamente.");
    }
  };

  const password = watch("password");

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center bg-[url('../src/assets/recovery-page-image.webp')] bg-cover bg-[0%_24%] pb-32 pt-32">
        <div className="absolute z-0 h-full w-full bg-black opacity-70"></div>
        <div className="wrapper relative z-10 flex max-w-[700px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-white border-opacity-20 bg-[#1e1e1e] px-32 py-16">
          <div className="mb-8 flex flex-col items-start gap-8">
            <h2 className="text-4xl font-bold">Recuperação de Senha</h2>
            <p className="text-gray-300">
              A nova senha deve conter no mínimo 8 caracteres e ser diferente da
              anterior.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex w-full flex-col">
              <label htmlFor="recoveryPassword" className="mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                id="recoveryPassword"
                placeholder="Nova Senha"
                className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${
                  errors?.password ? "input-error" : ""
                }`}
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors?.password?.type === "minLength" && (
                <span className="pt-3 text-sm text-red-500">
                  A senha deve conter no mínimo 8 caracteres.
                </span>
              )}
              {errors?.password?.type === "required" && (
                <span className="pt-3 text-sm text-red-500">
                  Este campo é obrigatório.
                </span>
              )}
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="recoveryConfirmPassword" className="mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="recoveryConfirmPassword"
                placeholder="Confirmar Senha"
                className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${
                  errors?.confirmPassword ? "input-error" : ""
                }`}
                {...register("confirmPassword", {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    value === password || "As senhas devem ser iguais.",
                })}
              />
              {errors?.confirmPassword?.type === "minLength" && (
                <span className="pt-3 text-sm text-red-500">
                  A senha deve conter no mínimo 8 caracteres.
                </span>
              )}
              {errors?.confirmPassword?.message && (
                <span className="pt-3 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
              {errors?.confirmPassword?.type === "required" && (
                <span className="pt-3 text-sm text-red-500">
                  Este campo é obrigatório.
                </span>
              )}
            </div>
            <button type="submit" className="button mt-4 w-full">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
