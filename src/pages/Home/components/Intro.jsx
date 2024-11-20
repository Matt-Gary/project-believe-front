import { Link } from "react-router-dom";
import HeroImage from "../../../assets/home-page-image-1.webp";

export function Intro() {
  return (
    <section className="flex items-center justify-center">
      <div className="wrapper grid grid-cols-1 gap-16 py-16 sm:gap-32 sm:py-24 lg:grid-cols-2">
        <div className="flex-1">
          <h1 className="lg mb-8 text-center text-3xl font-bold uppercase sm:text-6xl lg:text-start">
            O primeiro box de calistenia do Ceará
          </h1>
          <p className="mx-auto mb-8 max-w-xl sm:text-center lg:mx-0 lg:text-start">
            Na Believe, acreditamos que a verdadeira força vem de dentro.
            Junte-se a nós e descubra como a calistenia pode mudar sua vida,
            melhorando seu condicionamento físico, flexibilidade e confiança.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link to="/contato" className="button">
              Entrar em Contato
            </Link>
            <a href="#homePageAboutSection" className="button-ghost">
              Saiba Mais
            </a>
          </div>
        </div>
        <div>
          <img src={HeroImage} alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
