import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-full.png";
import FooterImage from "../assets/footer-image.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-5 border-t border-t-white border-opacity-20">
      <div className="wrapper flex gap-8 pt-16 pb-24">
        <div className="flex-[2] flex flex-col">
          <Link to="/" className="w-fit">
            <img src={Logo} alt="" className="max-w-[16rem] w-[16rem] mb-8" />
          </Link>
          <span>© Believe, 2024. Todos os direitos reservados.</span>
        </div>
        <div className="flex-[1] flex flex-col gap-2.5 mr-32">
          <h3 className="font-medium text-neutral-400">Localização</h3>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/Believe+Calistenia/@-3.7397854,-38.501303,17z/data=!3m1!4b1!4m6!3m5!1s0x7c749af97042693:0x98777f38a47b6c52!8m2!3d-3.7397908!4d-38.4964321!16s%2Fg%2F11f64ckbmd?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D"
            className="hover:text-accent transition-colors"
          >
            R. Vicente Leite, 1536 - Aldeota, Fortaleza - CE, 60150-165
          </a>
        </div>
        <div className="flex-[1] flex flex-col gap-2.5">
          <h3 className="font-medium text-neutral-400">Mapa do Site</h3>
          <Link
            to="/"
            className="w-fit hover:text-accent transition-colors"
          >
            Início
          </Link>
          <Link
            to="/sobre"
            className="w-fit hover:text-accent transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/galeria"
            className="w-fit hover:text-accent transition-colors"
          >
            Galeria
          </Link>
          <Link
            to="/calendario"
            className="w-fit hover:text-accent transition-colors"
          >
            Calendário
          </Link>
          <Link
            to="/tutoriais"
            className="w-fit hover:text-accent transition-colors"
          >
            Tutoriais
          </Link>
          <Link
            to="/login"
            className="w-fit hover:text-accent transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/contato"
            className="w-fit hover:text-accent transition-colors"
          >
            Contato
          </Link>
        </div>
        <div className="flex-[1] flex flex-col gap-2.5">
          <h3 className="font-medium text-neutral-400">Redes Sociais</h3>
          <Link className="w-fit flex items-center gap-1 hover:text-accent transition-colors">
            Facebook
            <MdOutlineArrowOutward />
          </Link>
          <Link className="w-fit flex items-center gap-1 hover:text-accent transition-colors">
            Instagram
            <MdOutlineArrowOutward />
          </Link>
          <Link className="w-fit flex items-center gap-1 hover:text-accent transition-colors">
            Whatsapp
            <MdOutlineArrowOutward />
          </Link>
          <Link className="w-fit flex items-center gap-1 hover:text-accent transition-colors">
            Youtube
            <MdOutlineArrowOutward />
          </Link>
        </div>
      </div>
      <img src={FooterImage} alt="" className="wrapper w-full pb-4 brightness-50" />
    </footer>
  );
};

export default Footer;
