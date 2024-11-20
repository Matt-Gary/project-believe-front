import { Link } from "react-router-dom";
import HeroImage from "../../../assets/home-page-image-1.webp";

export function Intro() {
  return (
    <section className="flex items-center justify-center">
      <div className="wrapper flex items-center gap-32 py-24">
        <div className="flex-1">
          <h1 className="mb-8 text-6xl font-bold uppercase">
            O primeiro box de calistenia do Ceará
          </h1>
          <p className="mb-8 max-w-xl">
            Na Believe, acreditamos que a verdadeira força vem de dentro.
            Junte-se a nós e descubra como a calistenia pode mudar sua vida,
            melhorando seu condicionamento físico, flexibilidade e confiança.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contato" className="button">
              Entrar em Contato
            </Link>
            <a href="#homePageAboutSection" className="button-ghost">
              Saiba Mais
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img src={HeroImage} alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
