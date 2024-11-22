import { Link } from "react-router-dom";
import AboutImage from "../../../assets/recovery-page-image.webp";

export function WhoWeAre() {
  return (
    <section className="wrapper pt-16 lg:pt-32" id="homePageAboutSection">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-3xl font-bold uppercase md:text-start lg:text-6xl">
            Quem somos
          </h2>
          <p>
            Na Believe, utilizamos técnicas comprovadas de calistenia que
            garantem resultados reais. Cada treino é projetado para desafiar e
            motivar, ajudando você a atingir seus objetivos de forma eficiente.
          </p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                <span className="h-3 w-3 rounded-full bg-accent"></span>
                Comunidade Inspiradora
              </h3>
              <p>
                Aqui, você encontrará apoio e incentivo, seja de nossos
                treinadores dedicados ou dos colegas de treino que compartilham
                da mesma paixão.
              </p>
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                <span className="h-3 w-3 rounded-full bg-accent"></span>
                Comunidade Inspiradora
              </h3>
              <p>
                Não importa se você é iniciante ou experiente, nossos programas
                são adaptados para todos os níveis de habilidade.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
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
  );
}
