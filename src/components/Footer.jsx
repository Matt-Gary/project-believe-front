import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-full.png";
import FooterImage from "../assets/footer-image.png";
import { MdOutlineArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="border-t border-t-white border-opacity-20 bg-white bg-opacity-5">
      <div className="wrapper flex gap-8 pb-24 pt-16">
        <div className="flex flex-[2] flex-col">
          <Link to="/" className="w-fit">
            <img src={Logo} alt="" className="mb-8 w-[16rem] max-w-[16rem]" />
          </Link>
          <span>© Believe, 2024. Todos os direitos reservados.</span>
        </div>
        <div className="mr-32 flex flex-[1] flex-col gap-2.5">
          <h3 className="font-medium text-neutral-400">Localização</h3>
          <a
            target="_blank"
            href="https://www.google.com/maps/place/Believe+Calistenia/@-3.7397854,-38.501303,17z/data=!3m1!4b1!4m6!3m5!1s0x7c749af97042693:0x98777f38a47b6c52!8m2!3d-3.7397908!4d-38.4964321!16s%2Fg%2F11f64ckbmd?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D"
            className="transition-colors hover:text-accent"
          >
            R. Vicente Leite, 1536 - Aldeota, Fortaleza - CE, 60150-165
          </a>
        </div>
        <div className="flex flex-[1] flex-col gap-2.5">
          <h3 className="font-medium text-neutral-400">Mapa do Site</h3>
          <Link to="/" className="w-fit transition-colors hover:text-accent">
            Início
          </Link>
          <Link
            to="/sobre"
            className="w-fit transition-colors hover:text-accent"
          >
            Sobre
          </Link>
          <Link
            to="/galeria"
            className="w-fit transition-colors hover:text-accent"
          >
            Galeria
          </Link>
          <Link
            to="/calendario"
            className="w-fit transition-colors hover:text-accent"
          >
            Calendário
          </Link>
          <Link
            to="/tutoriais"
            className="w-fit transition-colors hover:text-accent"
          >
            Tutoriais
          </Link>
          <Link
            to="/login"
            className="w-fit transition-colors hover:text-accent"
          >
            Entrar
          </Link>
          <Link
            to="/contato"
            className="w-fit transition-colors hover:text-accent"
          >
            Contato
          </Link>
        </div>
        <div className="flex flex-[1] flex-col gap-2.5">
          <h3 className="font-medium text-neutral-400">Redes Sociais</h3>
          <Link className="flex w-fit items-center gap-1 transition-colors hover:text-accent">
            Facebook
            <MdOutlineArrowOutward />
          </Link>
          <Link className="flex w-fit items-center gap-1 transition-colors hover:text-accent">
            Instagram
            <MdOutlineArrowOutward />
          </Link>
          <Link className="flex w-fit items-center gap-1 transition-colors hover:text-accent">
            Whatsapp
            <MdOutlineArrowOutward />
          </Link>
          <Link className="flex w-fit items-center gap-1 transition-colors hover:text-accent">
            Youtube
            <MdOutlineArrowOutward />
          </Link>
        </div>
      </div>
      <img
        src={FooterImage}
        alt=""
        className="wrapper w-full pb-4 brightness-50"
      />
    </footer>
  );
};

export default Footer;
