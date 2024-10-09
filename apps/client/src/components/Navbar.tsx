import { Toggle } from "@radix-ui/react-toggle";
import { Link } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";
import { useEffect, useState } from "react";
import { Logo } from "./HomeComponent/Logo";

export const Navbar = () => {
  const { theme, setTheme } = themeStore((state) => state);
  const [showNav, setShowNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full p-4 transition-all duration-200 ${
        showNav ? "bg-gray-3 text-slate-12" : "bg-transparent  text-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider hover:text-indigo-4 transition-colors"
          >
            <Logo />
          </Link>
        </div>

        <div className="hidden sm:flex space-x-6 items-center">
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
            className={`p-2 rounded-full ${
              showNav && "hover:bg-slate-1 cursor-pointer"
            } cursor-default  transition-all`}
          >
            {theme ? <MoonIcon /> : <SunIcon />}
          </Toggle>

          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-slate-1 cursor-pointer transition-all"
            >
              <HamburgerMenuIcon />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-3 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="p-2">
            <Cross1Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-4 p-6">
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
      </div>
    </nav>
  );
};
