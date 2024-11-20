import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo-full.png";
import { IoBook, IoCalendar, IoHome, IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaInfoCircle } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";

export function MenuMobile() {
  const location = useLocation();

  const homePage = () => location.pathname === "/";
  const aboutPage = () => location.pathname === "/sobre";
  const galleryPage = () => location.pathname === "/galeria";
  const calendarPage = () => location.pathname === "/calendario";
  const tutorialsPage = () => location.pathname === "/tutoriais";

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
              <Link
                to="/"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl ${
                  homePage() ? "!bg-accent" : ""
                }`}
              >
                <IoHome />
                Início
              </Link>
              <Link
                to="/sobre"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl ${
                  aboutPage() ? "!bg-accent" : ""
                }`}
              >
                <FaInfoCircle />
                Sobre
              </Link>
              <Link
                to="/galeria"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl ${
                  galleryPage() ? "!bg-accent" : ""
                }`}
              >
                <MdPhotoLibrary />
                Galeria
              </Link>
              <Link
                to="/calendario"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl ${
                  calendarPage() ? "!bg-accent" : ""
                }`}
              >
                <IoCalendar />
                Calendário
              </Link>
              <Link
                to="/tutoriais"
                className={`flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-accent-variant sm:text-2xl ${
                  tutorialsPage() ? "!bg-accent" : ""
                }`}
              >
                <IoBook />
                Tutoriais
              </Link>

              <div className="mb-auto mt-4 flex items-center gap-3 sm:text-2xl">
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
