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
      const response = await api.post("/auth/forgot-password", {
        email: data.email,
      });
      console.log("Forgot password response:", response.data);
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.response ? error.response.data : error.message,
      );
      alert("Error in sending password reset link. Please try again.");
    }
  };

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center bg-[url('../src/assets/recovery-page-image.webp')] bg-cover bg-[0%_24%] pb-32 pt-32">
        <div className="absolute z-0 h-full w-full bg-black opacity-70"></div>
        <div className="wrapper relative z-10 flex max-w-[700px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white border-opacity-20 bg-[#1e1e1e] px-32 py-16">
          <div className="mb-8 flex flex-col items-start gap-8">
            <h2 className="text-4xl font-bold">Esqueci minha senha</h2>
            <p className="text-gray-300">
              Enviaremos um link para a recuperação da sua senha para o seu
              e-mail.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col">
              <label htmlFor="forgotPasswordEmail" className="mb-2">
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
      </section>
    </main>
  );
};

export default ForgotPasswordPage;
