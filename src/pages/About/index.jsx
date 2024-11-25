import { Link } from "react-router-dom";
import { About } from "./components/About";
import { Comunity } from "./components/Comunity";
import { AllLevels } from "./components/AllLevels";
import { Team } from "./components/Team";

export function AboutPage() {
  return (
    <>
      <main>
        <section className="flex items-center justify-center">
          <div className="wrapper flex flex-col items-center justify-center py-44 lg:pb-32 lg:pt-48">
            <h1 className="mb-8 max-w-[23ch] text-center text-3xl font-bold uppercase sm:text-6xl">
              <span className="italic text-accent">{'"'}</span>Focando no
              impossível, porque lá a concorrência é menor.
              <span className="italic text-accent">{'"'}</span>
            </h1>
            <p className="mb-8 text-2xl italic">– Walt Disney</p>
          </div>
        </section>
        <About />
        <Comunity />
        <AllLevels />
        <Team />

        <section className="wrapper flex items-center justify-between gap-16 py-32">
          <div>
            <h2 className="mb-8 text-6xl font-bold uppercase">
              Comece agora sua jornada
            </h2>
            <p className="max-w-[60ch]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              repudiandae dolor aperiam molestias adipisci exercitationem,
              cupiditate quam alias blanditiis.
            </p>
          </div>
          <Link to="/contato" className="button shrink-0 px-12 py-6 text-2xl">
            Entrar em Contato
          </Link>
        </section>
      </main>
    </>
  );
}
