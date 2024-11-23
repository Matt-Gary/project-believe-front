import { Link } from "react-router-dom";
import { CardProduct } from "./components/ui/CardProduct";
import { dataProduct } from "./utils/data-product";
import { Intro } from "./components/Intro";
import { Benefits } from "./components/Benefits";
import { WhoWeAre } from "./components/WhoWeAre";
import { Testimonials } from "./components/Testimonials";
import { Products } from "./components/Products";

export function HomePage() {
  return (
    <>
      <main>
        <Intro />
        <Benefits />
        <WhoWeAre />
        <Testimonials />
        <Products />
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
