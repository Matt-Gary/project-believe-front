import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo-full.png";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const homePage = () => location.pathname === "/";
  const aboutPage = () => location.pathname === "/sobre";
  const galleryPage = () => location.pathname === "/galeria";
  const calendarPage = () => location.pathname === "/calendario";
  const tutorialsPage = () => location.pathname === "/tutoriais";
  const loginPage = () =>
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <header className="fixed z-50 w-full bg-[#1e1e1e] border-b border-b-white border-opacity-20 items-center justify-center flex">
      <nav className="wrapper flex justify-between items-center py-3">
        <Link to="/">
          <img src={Logo} alt="" className="h-12" />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              to="/"
              className={`font-medium px-4 py-3 rounded-lg hover:bg-accent-variant transition-colors ${
                homePage() ? "!bg-accent" : ""
              }`}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/sobre"
              className={`font-medium px-4 py-3 rounded-lg hover:bg-accent-variant transition-colors ${
                aboutPage() ? "!bg-accent" : ""
              }`}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link
              to="/galeria"
              className={`font-medium px-4 py-3 rounded-lg hover:bg-accent-variant transition-colors ${
                galleryPage() ? "!bg-accent" : ""
              }`}
            >
              Galeria
            </Link>
          </li>
          <li>
            <Link
              to="/calendario"
              className={`font-medium px-4 py-3 rounded-lg hover:bg-accent-variant transition-colors ${
                calendarPage() ? "!bg-accent" : ""
              }`}
            >
              Calendário
            </Link>
          </li>
          <li>
            <Link
              to="/tutoriais"
              className={`font-medium px-4 py-3 rounded-lg hover:bg-accent-variant transition-colors ${
                tutorialsPage() ? "!bg-accent" : ""
              }`}
            >
              Tutoriais
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="button-ghost min-w-fit px-7 py-3 hover:bg-accent-variant hover:text-white"
          >
            Entrar
          </Link>
          <Link
            to="/contato"
            className="button min-w-fit px-7 py-3 hover:bg-accent-variant hover:text-white"
          >
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
