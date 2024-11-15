import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import api from "../api"; // Import Axios instance

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Make a POST request to the /forgot-password endpoint
      const response = await api.post("/auth/forgot-password", { email: data.email });
      console.log("Forgot password response:", response.data);
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error("Forgot password error:", error.response ? error.response.data : error.message);
      alert("Error in sending password reset link. Please try again.");
    }
  };

  return (
    <main>
      <section className="min-h-screen bg-[url('../src/assets/recovery-page-image.webp')] bg-cover bg-[0%_24%] flex justify-center items-center pt-32 pb-32 relative">
        <div className="w-full h-full absolute z-0 bg-black opacity-70"></div>
        <div className="wrapper max-w-[700px] flex flex-col items-center justify-center bg-[#1e1e1e] border border-white border-opacity-20 px-32 py-16 rounded-[2rem] overflow-hidden relative z-10">
          <div className="flex flex-col items-start gap-8 mb-8">
            <h2 className="text-4xl font-bold">Esqueci minha senha</h2>
            <p className="text-gray-300">
              Enviaremos um link para a recuperação da sua senha para o seu
              e-mail.
            </p>
          </div>
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full flex flex-col">
              <label htmlFor="forgotPasswordEmail" className="mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="forgotPasswordEmail"
                placeholder="exemplo@email.com"
                className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                  errors?.email ? "input-error" : ""
                }`}
                {...register("email", { required: "Este campo é obrigatório." })}
              />
              {errors?.email?.type == "required" && (
                <span className="text-sm text-red-500 pt-3">
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
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
