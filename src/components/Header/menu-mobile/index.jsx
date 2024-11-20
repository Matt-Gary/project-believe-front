import { Link } from "react-router-dom";
import Logo from "../../../assets/logo-full.png";
import { IoMenu } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MenuMobile() {
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
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
}
