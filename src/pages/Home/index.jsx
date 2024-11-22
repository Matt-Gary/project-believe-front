import { Link } from "react-router-dom";
import { CardProduct } from "./components/ui/CardProduct";
import { dataProduct } from "./utils/data-product";
import { Intro } from "./components/Intro";
import { Benefits } from "./components/Benefits";
import { WhoWeAre } from "./components/WhoWeAre";
import { Testimonials } from "./components/Testimonials";

export function HomePage() {
  return (
    <>
      <main>
        <Intro />
        <Benefits />
        <WhoWeAre />
        <Testimonials />

        <section className="wrapper grid grid-cols-2 items-center gap-16 pt-48">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {dataProduct.map((product) => (
              <CardProduct
                key={product.src}
                src={product.src}
                type={product.type}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-6xl font-bold uppercase">
              Conheça nossos produtos
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              pariatur, sapiente doloremque quaerat perferendis repellendus
              praesentium est delectus incidunt.
            </p>
            <Link className="button">Navegar</Link>
          </div>
        </section>
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
