import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LoginImage from "../assets/login-page-image.webp";
import LogoSmall from "../assets/logo-sm.png";
import { MdArrowForward } from "react-icons/md";
import api from "../api"; // Import the loginUser function

const LoginPage = () => {
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
    <main>
      <section className="flex min-h-screen items-center justify-center pb-32 pt-32">
        <div className="wrapper card-glass grid grid-cols-2 overflow-hidden rounded-[2rem]">
          <div className="relative overflow-hidden">
            <img src={LoginImage} alt="" className="absolute bottom-0" />
          </div>
          <div className="max-w-[700px] p-24">
            <div className="mb-16 flex items-center gap-8">
              <img src={LogoSmall} alt="" />
              <h1 className="text-4xl font-bold">Entrar</h1>
            </div>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="loginId" className="mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  id="loginId"
                  placeholder="E-mail ou Matrícula"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${
                    errors?.user ? "input-error" : ""
                  }`}
                  {...register("user", { required: true })}
                />
                {errors?.user?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="loginPassword" className="mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Senha"
                  className={`card-glass rounded-lg p-4 focus:border focus:border-accent ${
                    errors?.password ? "input-error" : ""
                  }`}
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors?.password?.type == "minLength" && (
                  <span className="pt-3 text-sm text-red-500">
                    A senha deve conter no mínimo 8 caracteres.
                  </span>
                )}
                {errors?.password?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <Link to="/esqueci_minha_senha" className="link w-fit">
                Esqueci minha senha
                <MdArrowForward />
              </Link>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button w-full"
              >
                Entrar
              </button>
            </div>
            <div className="mb-4">Não possui cadastro?</div>
            <Link to="/cadastro" className="button-ghost w-full">
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
