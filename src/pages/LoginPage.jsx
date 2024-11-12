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
        const response = await api.post('/auth/login', payload);
        console.log("Login successful:", response.data);
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error.message);
    }
};

  return (
    <main>
      <section className="min-h-screen flex justify-center items-center pt-32 pb-32">
        <div className="wrapper grid grid-cols-2 card-glass rounded-[2rem] overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src={LoginImage}
              alt=""
              className="absolute bottom-0"
            />
          </div>
          <div className="max-w-[700px] p-24">
            <div className="flex items-center gap-8 mb-16">
              <img src={LogoSmall} alt="" />
              <h1 className="text-4xl font-bold">Entrar</h1>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col">
                <label htmlFor="loginId" className="mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  id="loginId"
                  placeholder="E-mail ou Matrícula"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.user ? "input-error" : ""
                  }`}
                  {...register("user", { required: true })}
                />
                {errors?.user?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
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
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.password ? "input-error" : ""
                  }`}
                  {...register("password", { required: true, minLength: 8 })}
                />
                {errors?.password?.type == "minLength" && (
                  <span className="text-sm text-red-500 pt-3">
                    A senha deve conter no mínimo 8 caracteres.
                  </span>
                )}
                {errors?.password?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
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
