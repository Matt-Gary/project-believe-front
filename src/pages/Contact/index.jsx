import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <main className="pb-32 pt-48">
        <div className="wrapper flex flex-col items-center justify-center">
          <div className="mb-32 flex max-w-[780px] flex-col items-center">
            <h1 className="mb-8 text-center text-6xl font-bold uppercase">
              Não hesite em entrar em contato!
            </h1>
            <p className="text-center">
              Preencha o formulário e entraremos em contato com você o mais
              rápido possível para dar procedimento à sua matrícula.
            </p>
          </div>
          <div className="flex w-full gap-16">
            <div className="grid flex-1 grid-cols-2-auto items-start gap-8 rounded-[2rem] border border-white border-opacity-20 bg-[#1e1e1e] p-16">
              <h2 className="col-span-full mb-8 text-4xl">
                Formulário de Contato
              </h2>
              <div className="col-span-1 flex flex-col">
                <label className="mb-4 font-medium">
                  Nome<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.name ? "input-error" : ""
                  } card-glass rounded-lg p-4 transition-colors focus:border focus:border-accent`}
                  type="text"
                  placeholder="Seu nome"
                  {...register("name", { required: true })}
                />
                {errors?.name?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="mb-4 font-medium">
                  Sobrenome <span className="text-neutral-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu sobrenome"
                  {...register("surname")}
                  className="card-glass rounded-lg p-4 transition-colors focus:border focus:border-accent"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="mb-4 font-medium">
                  Endereço de e-mail<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.email ? "input-error" : ""
                  } card-glass rounded-lg p-4 transition-colors focus:border focus:border-accent`}
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  {...register("email", { required: true })}
                />
                {errors?.email?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="mb-4 font-medium">
                  Número de telefone<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.phone ? "input-error" : ""
                  } card-glass rounded-lg p-4 transition-colors focus:border focus:border-accent`}
                  type="number"
                  placeholder="Seu número de telefone"
                  {...register("phone", { required: true, minLength: 11 })}
                />
                {errors?.phone?.type == "minLength" && (
                  <span className="pt-3 text-sm text-red-500">
                    Número incompleto.
                  </span>
                )}
                {errors?.phone?.type == "required" && (
                  <span className="pt-3 text-sm text-red-500">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-full flex flex-col">
                <label className="mb-4 font-medium">
                  Possui alguma dúvida ou mensagem adicional?{" "}
                  <span className="text-neutral-400">(opcional)</span>
                </label>
                <textarea
                  placeholder="Sua mensagem"
                  {...register("message")}
                  className="card-glass min-h-[10em] rounded-lg p-4 transition-colors focus:border focus:border-accent"
                />
              </div>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button col-span-full mt-2 w-auto text-xl"
              >
                Comece sua jornada
              </button>
            </div>
            <div className="flex flex-col gap-8 py-16">
              <div className="flex flex-col gap-3">
                <div className="text-xl font-medium">Fale Conosco</div>
                <div className="text-neutral-400">
                  Entre em contato através dos links abaixo.
                </div>
                <Link className="flex w-fit items-center gap-2 hover:text-accent">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </Link>
                <Link className="flex w-fit items-center gap-2 hover:text-accent">
                  <MdOutlineAlternateEmail />
                  <span>E-mail</span>
                </Link>
                <Link className="flex w-fit items-center gap-2 hover:text-accent">
                  <FaInstagram />
                  <span>Instagram</span>
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xl font-medium">Ligue</div>
                <div className="text-neutral-400">
                  Horário de atendimendo 08h00 às 17h00 (Seg-Sex).
                </div>
                <Link className="flex w-fit items-center gap-2 hover:text-accent">
                  <FaPhoneAlt />
                  <span>(00) 00000-0000</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
