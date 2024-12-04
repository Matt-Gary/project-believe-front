import { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-full.png';
import { MenuMobile } from './menu-mobile';
import { AuthContext } from '@/contexts/AuthContext';
import { HeaderAuth } from './header-auth';
import { MenuMobileAuth } from './header-auth/menu-mobile-auth';

export function Header() {
  const { authenticated } = useContext(AuthContext);

  return (
    <>
      {authenticated ? <MenuMobileAuth /> : <MenuMobile />}
      {authenticated ? (
        <HeaderAuth />
      ) : (
        <header className="sticky top-0 z-50 hidden items-center justify-center border-b border-b-white border-opacity-20 bg-[#1e1e1e] lg:flex">
          <nav className="wrapper flex items-center justify-between py-3">
            <Link to="/">
              <img src={Logo} alt="" className="h-12" />
            </Link>
            <ul className="flex items-center gap-4">
              <li>
                <NavLink
                  to="/"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
                >
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sobre"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
                >
                  Sobre
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/galeria"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
                >
                  Galeria
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendario"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
                >
                  Calendário
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tutoriais"
                  className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
                >
                  Tutoriais
                </NavLink>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="button-ghost min-w-fit px-7 py-3 hover:bg-accent-variant hover:text-white"
              >
                Entrar
              </NavLink>
              <NavLink
                to="/contato"
                className="button min-w-fit px-7 py-3 hover:bg-accent-variant hover:text-white"
              >
                Contato
              </NavLink>
            </div>
          </nav>
        </header>
      )}
    </>
  );
}
