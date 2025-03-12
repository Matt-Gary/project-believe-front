import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo-full.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';

import { User } from 'lucide-react';

export function HeaderAuth() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, avatar } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
    Cookies.remove('accessToken');
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 hidden items-center justify-center border-b border-b-white border-opacity-20 bg-[#1e1e1e] lg:flex">
      <nav className="wrapper flex items-center justify-between py-3">
        <Link to="/">
          <img src={Logo} alt="" className="h-12" />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              to="area-do-aluno"
              className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
            >
              Área do aluno
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
              to="/calendarios"
              className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant `}
            >
              Calendário
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tutoriais"
              className={`rounded-lg px-4 py-3 font-medium transition-colors hover:bg-accent-variant`}
            >
              Tutoriais
            </NavLink>
          </li>
        </ul>
        <Link to="/meu-perfil" className="flex items-center gap-4">
          <p className=" font-bold">
            Bem vindo,{' '}
            <span className="text-accent font-bold">{userData?.username}</span>
          </p>
          {avatar ? (
            <img
              src={avatar}
              className="h-12 w-12 rounded-full cursor-pointer"
              alt="Avatar"
            />
          ) : (
            <User className="h-12 w-12 rounded-full border border-zinc-300 p-3" />
          )}
          <button className="text-red-600">
            <FaSignOutAlt onClick={handleLogout} />
          </button>
        </Link>
      </nav>
    </header>
  );
}
