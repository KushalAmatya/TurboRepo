import { Toggle } from "@radix-ui/react-toggle";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";
import { useEffect, useState } from "react";
import { Logo } from "./HomeComponent/Logo";
export const Navbar = () => {
  const { theme, setTheme } = themeStore((state) => state);
  const [showNav, setShowNav] = useState(true);
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 transition-all duration-200 ${showNav ? "bg-gray-3 text-slate-12" : "bg-transparent sm:text-slate-12 text-transparent"} `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={
              "text-2xl font-bold tracking-wider hover:text-indigo-4 transition-colors"
            }
          >
            <Logo />
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-4 transition-colors">
            Projects
          </Link>
          <Link to="" className="hover:text-indigo-4 transition-colors">
            Contact
          </Link>
          <Link to="/" className="hover:text-indigo-4 transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Toggle
            pressed={theme}
            onPressedChange={setTheme}
            className={`p-2 rounded-full  ${showNav && "hover:bg-slate-1 cursor-pointer"} cursor-default  transition-all`}
          >
            {theme ? <MoonIcon /> : <SunIcon />}
          </Toggle>

          <div></div>
        </div>
      </div>
    </nav>
  );
};
