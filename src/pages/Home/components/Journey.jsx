import { Link } from "react-router-dom";

export function Journey() {
  return (
    <section className="wrapper flex flex-col items-center justify-between gap-16 py-32 lg:flex-row">
      <div className="flex flex-col items-center lg:items-start">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase sm:text-start lg:text-6xl">
          Comece agora sua jornada
        </h2>
        <p className="max-w-[60ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
          repudiandae dolor aperiam molestias adipisci exercitationem,
          cupiditate quam alias blanditiis.
        </p>
      </div>
      <Link to="/contato" className="button shrink-0 py-6 text-2xl lg:px-12">
        Entrar em Contato
      </Link>
    </section>
  );
}
