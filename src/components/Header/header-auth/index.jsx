import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo-full.png';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
export function HeaderAuth() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData } = useContext(AuthContext);

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
              to="/calendario"
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
        <div className="flex items-center gap-4">
          <p>{userData?.username}</p>
          <p>{userData?.matricula}</p>
          <button className="text-red-600">
            <FaSignOutAlt onClick={handleLogout} />
          </button>
        </div>
      </nav>
    </header>
  );
}
