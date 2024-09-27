import { Toggle } from "@radix-ui/react-toggle";
// import { Avatar } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";

export const Navbar = () => {
  const { theme, setTheme } = themeStore((state) => state);

  return (
    <nav
      className={
        "fixed top-0 left-0 right-0 z-50 w-full p-4 transition-all bg-gray-1 text-slate-12"
      }
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className={
              "text-2xl font-bold tracking-wider hover:text-indigo-4 transition-colors"
            }
          >
            logo
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Link
            to="/features"
            className="hover:text-indigo-4 transition-colors"
          >
            Features
          </Link>
          <Link to="/pricing" className="hover:text-indigo-4 transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-indigo-4 transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Toggle
            pressed={theme}
            onPressedChange={setTheme}
            className={
              "p-2 rounded-full  text-gray-12 bg-gray-1 hover:bg-indigo-4 transition-all"
            }
          >
            {theme ? <MoonIcon /> : <SunIcon />}
          </Toggle>

          <div></div>
        </div>
      </div>
    </nav>
  );
};
