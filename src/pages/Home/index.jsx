import { Link } from "react-router-dom";
import AboutImage from "../../assets/recovery-page-image.webp";
import { CardTestimonials } from "./components/ui/CardTestimonial";
import { CardProduct } from "./components/ui/CardProduct";

import { dataTestimonials } from "./utils/data-testimonials";
import { dataProduct } from "./utils/data-product";
import { Intro } from "./components/Intro";
import { Benefits } from "./components/Benefits";

export function HomePage() {
  return (
    <>
      <main>
        <Intro />
        <Benefits />
        <section className="wrapper pt-16 lg:pt-32" id="homePageAboutSection">
          <div className="grid grid-cols-2 items-center gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="text-6xl font-bold uppercase">Quem somos</h2>
              <p>
                Na Believe, utilizamos técnicas comprovadas de calistenia que
                garantem resultados reais. Cada treino é projetado para desafiar
                e motivar, ajudando você a atingir seus objetivos de forma
                eficiente.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    Comunidade Inspiradora
                  </h3>
                  <p>
                    Aqui, você encontrará apoio e incentivo, seja de nossos
                    treinadores dedicados ou dos colegas de treino que
                    compartilham da mesma paixão.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    Comunidade Inspiradora
                  </h3>
                  <p>
                    Não importa se você é iniciante ou experiente, nossos
                    programas são adaptados para todos os níveis de habilidade.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/contato" className="button">
                  Quero Fazer Parte
                </Link>
                <Link to="/sobre" className="button-ghost">
                  Saiba Mais
                </Link>
              </div>
            </div>
            <img
              src={AboutImage}
              alt=""
              className="max-h-[30rem] w-full rounded-2xl"
            />
          </div>
        </section>

        <section className="wrapper flex flex-col gap-8 pt-48">
          <h2 className="text-6xl font-bold uppercase">Depoimentos</h2>
          <p className="max-w-[60ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            velit ex, dignissimos corporis quisquam fugit necessitatibus totam.
          </p>
          <div className="grid grid-cols-3 gap-8">
            {dataTestimonials.map((testimonial) => (
              <CardTestimonials
                description={testimonial.description}
                student={testimonial.student}
              />
            ))}
          </div>
        </section>

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
