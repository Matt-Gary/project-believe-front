import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../../assets/logo-full.png';
import { IoBook, IoCalendar, IoHome, IoMenu } from 'react-icons/io5';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FaDumbbell, FaSignOutAlt } from 'react-icons/fa';
import { MdPhotoLibrary } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';

export function MenuMobileAuth() {
  const { userData } = useContext(AuthContext);

  function handleLogout() {
    navigate('/login');
    Cookies.remove('accessToken');
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-b-white border-opacity-20 bg-[#1e1e1e] p-6 lg:hidden">
      <Link to="/">
        <img src={Logo} alt="" className="h-12" />
      </Link>
      <Sheet>
        <SheetTrigger>
          <IoMenu size={36} />
        </SheetTrigger>
        <SheetContent className="border-l border-l-white border-opacity-20 bg-[#1e1e1e]">
          <SheetHeader>
            <SheetDescription className="mt-16 flex flex-col items-center gap-3">
              <NavLink
                to="/"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl`}
              >
                <IoHome />
                Início
              </NavLink>
              <NavLink
                to="/area-do-aluno"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl `}
              >
                <FaDumbbell />
                Área do aluno
              </NavLink>
              <NavLink
                to="/galeria"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl `}
              >
                <MdPhotoLibrary />
                Galeria
              </NavLink>
              <NavLink
                to="/calendario"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl `}
              >
                <IoCalendar />
                Calendário
              </NavLink>
              <NavLink
                to="/tutoriais"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl `}
              >
                <IoBook />
                Tutoriais
              </NavLink>

              <div className="mb-auto mt-4 flex items-center gap-3 sm:text-2xl">
                <p> {userData.username}</p>
                <p>{userData.matricula}</p>
                <button className="text-red-600">
                  <FaSignOutAlt onClick={handleLogout} />
                </button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
