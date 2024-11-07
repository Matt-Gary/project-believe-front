import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SignUpImage from "../assets/signup-page-image.webp";
import LogoSmall from "../assets/logo-sm.png";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main>
      <section className="min-h-screen flex justify-center items-center pt-32 pb-32">
        <div className="wrapper grid grid-cols-2 card-glass rounded-[2rem] overflow-hidden">
          <div className="relative overflow-hidden">
            <img src={SignUpImage} alt="" className="absolute w-full h-full" />
          </div>
          <div className="p-24">
            <div className="flex items-center gap-8 mb-16">
              <img src={LogoSmall} alt="" />
              <h1 className="text-4xl font-bold">Cadastro</h1>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col">
                <label htmlFor="signUpName" className="flex mb-2">
                  Nome<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpName"
                  placeholder="Nome"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.name ? "input-error" : ""
                  }`}
                  {...register("name", { required: true })}
                />
                {errors?.name?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="signUpId" className="flex mb-2">
                  Matrícula<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpId"
                  placeholder="Matrícula"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.id ? "input-error" : ""
                  }`}
                  {...register("id", { required: true })}
                />
                {errors?.id?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="signUpPhone" className="flex mb-2">
                  Número do Telefone<span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="signUpPhone"
                  placeholder="Número do Telefone"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.phone ? "input-error" : ""
                  }`}
                  {...register("phone", { required: true })}
                />
                {errors?.phone?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="signUpEmail" className="flex mb-2">
                  E-mail
                  <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="signUpEmail"
                  placeholder="exemplo@email.com"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.email ? "input-error" : ""
                  }`}
                  {...register("email", { required: true })}
                />
                {errors?.email?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="signUpPassword" className="flex mb-2">
                  Senha
                  <span className="text-accent">*</span>
                </label>
                <input
                  type="password"
                  id="signUpPassword"
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
              <div className="flex flex-col">
                <label htmlFor="signUpConfirmPassword" className="flex mb-2">
                  Confirmar Senha
                  <span className="text-accent">*</span>
                </label>
                <input
                  type="password"
                  id="signUpConfirmPassword"
                  placeholder="Confirmar Senha"
                  className={`card-glass p-4 rounded-lg focus:border focus:border-accent ${
                    errors?.confirmPassword ? "input-error" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                  })}
                />
                {errors?.confirmPassword?.type == "minLength" && (
                  <span className="text-sm text-red-500 pt-3">
                    A senha deve conter no mínimo 8 caracteres.
                  </span>
                )}
                {errors?.confirmPassword?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button w-full mt-4"
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
};

export default SignUpPage;
