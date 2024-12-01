import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import api from "../../api"; // Import Axios instance
import { toast } from "sonner";

export function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Make a POST request to the /forgot-password endpoint
      const response = await api.post("/auth/forgot-password", {
        email: data.email,
      });
      toast.success("E-mail de recuperação enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar e-mail de recuperação.");
    }
  };

  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center bg-[url('../src/assets/recovery-page-image.webp')] bg-cover bg-center">
        <div className="p-3">
          <div className="max-w-xl rounded-[2rem] border border-white border-opacity-20 bg-[#1e1e1e] p-6 sm:p-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold sm:text-4xl">
                Esqueci minha senha
              </h2>
              <p className="text-gray-300">
                Enviaremos um link para a recuperação da sua senha para o seu
                e-mail.
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-8">
              <div className="flex w-full flex-col">
                <label htmlFor="forgotPasswordEmail" className="my-2 mt-6">
                  E-mail
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  placeholder="exemplo@email.com"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${
                    errors?.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Este campo é obrigatório.",
                  })}
                />
                {errors?.email?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button w-full"
              >
                Enviar
              </button>
              <Link to="/login" className="link w-fit">
                <MdOutlineArrowBack />
                Voltar para tela de login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
