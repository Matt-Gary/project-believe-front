import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";


const ContactPage = () => {
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
      <main className="pt-48 pb-32">
        <div className="wrapper flex flex-col items-center justify-center">
          <div className="max-w-[780px] flex flex-col items-center mb-32">
            <h1 className="text-6xl font-bold uppercase text-center mb-8">
              Não hesite em entrar em contato!
            </h1>
            <p className="text-center">
              Preencha o formulário e entraremos em contato com você o mais
              rápido possível para dar procedimento à sua matrícula.
            </p>
          </div>
          <div className="flex gap-16 w-full">
            <div className="flex-1 bg-[#1e1e1e] border border-white border-opacity-20 rounded-[2rem] p-16 grid grid-cols-2-auto items-start gap-8">
              <h2 className="col-span-full text-4xl mb-8">
                Formulário de Contato
              </h2>
              <div className="col-span-1 flex flex-col">
                <label className="font-medium mb-4">
                  Nome<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.name ? "input-error" : ""
                  } card-glass p-4 rounded-lg focus:border focus:border-accent transition-colors`}
                  type="text"
                  placeholder="Seu nome"
                  {...register("name", { required: true })}
                />
                {errors?.name?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="font-medium mb-4">
                  Sobrenome <span className="text-neutral-400">(opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu sobrenome"
                  {...register("surname")}
                  className="card-glass p-4 rounded-lg focus:border focus:border-accent transition-colors"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="font-medium mb-4">
                  Endereço de e-mail<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.email ? "input-error" : ""
                  } card-glass p-4 rounded-lg focus:border focus:border-accent transition-colors`}
                  type="email"
                  placeholder="Seu endereço de e-mail"
                  {...register("email", { required: true })}
                />
                {errors?.email?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="font-medium mb-4">
                  Número de telefone<span className="text-accent">*</span>
                </label>
                <input
                  className={`${
                    errors?.phone ? "input-error" : ""
                  } card-glass p-4 rounded-lg focus:border focus:border-accent transition-colors`}
                  type="number"
                  placeholder="Seu número de telefone"
                  {...register("phone", { required: true, minLength: 11 })}
                />
                {errors?.phone?.type == "minLength" && (
                  <span className="text-sm text-red-500 pt-3">
                    Número incompleto.
                  </span>
                )}
                {errors?.phone?.type == "required" && (
                  <span className="text-sm text-red-500 pt-3">
                    Este campo é obrigatório.
                  </span>
                )}
              </div>
              <div className="col-span-full flex flex-col">
                <label className="font-medium mb-4">
                  Possui alguma dúvida ou mensagem adicional?{" "}
                  <span className="text-neutral-400">(opcional)</span>
                </label>
                <textarea
                  placeholder="Sua mensagem"
                  {...register("message")}
                  className="min-h-[10em] card-glass p-4 rounded-lg focus:border focus:border-accent transition-colors"
                />
              </div>
              <button
                onClick={() => handleSubmit(onSubmit)()}
                className="button w-auto col-span-full text-xl mt-2"
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
                <Link className="w-fit flex items-center gap-2 hover:text-accent">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </Link>
                <Link className="w-fit flex items-center gap-2 hover:text-accent">
                  <MdOutlineAlternateEmail />
                  <span>E-mail</span>
                </Link>
                <Link className="w-fit flex items-center gap-2 hover:text-accent">
                  <FaInstagram />
                  <span>Instagram</span>
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xl font-medium">Ligue</div>
                <div className="text-neutral-400">
                  Horário de atendimendo 08h00 às 17h00 (Seg-Sex).
                </div>
                <Link className="w-fit flex items-center gap-2 hover:text-accent">
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
};

export default ContactPage;
