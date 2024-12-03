import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo-full.png";
import { MenuMobile } from "./menu-mobile";
import { AuthContext } from "@/contexts/AuthContext";

export function Header() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const homePage = () => location.pathname === "/";
  const aboutPage = () => location.pathname === "/sobre";
  const galleryPage = () => location.pathname === "/galeria";
  const calendarPage = () => location.pathname === "/calendario";
  const tutorialsPage = () => location.pathname === "/tutoriais";

  const { authenticated, userData } = useContext(AuthContext);

  return (
    <>
      <MenuMobile />
      {authenticated ? (
        <div>Header de quem logou !</div>
      ) : (
        <header className="sticky top-0 z-50 hidden items-center justify-center border-b border-b-white border-opacity-20 bg-[#1e1e1e] lg:flex">
          <nav className="wrapper flex items-center justify-between py-3">
            <Link to="/">
              <img src={Logo} alt="" className="h-12" />
            </Link>
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  to="/"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant ${
                    homePage() ? "!bg-accent" : ""
                  }`}
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant ${
                    aboutPage() ? "!bg-accent" : ""
                  }`}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/galeria"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant ${
                    galleryPage() ? "!bg-accent" : ""
                  }`}
                >
                  Galeria
                </Link>
              </li>
              <li>
                <Link
                  to="/calendario"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant ${
                    calendarPage() ? "!bg-accent" : ""
                  }`}
                >
                  Calendário
                </Link>
              </li>
              <li>
                <Link
                  to="/tutoriais"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant ${
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
      )}
    </>
  );
}
