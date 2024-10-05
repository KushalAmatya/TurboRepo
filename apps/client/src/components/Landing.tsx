import { themeStore } from "../utils/themeStore";
import { Hero } from "./HomeComponent/Hero";
import { Navbar } from "./Navbar";

export const Landing = () => {
  const { theme } = themeStore((state) => state);

  return (
    <>
      <div className={`${theme && "dark"}`}>
        <Navbar />

        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-slate-2 to-slate-3 text-gray-12">
          <Hero />
        </div>
        <footer className="bg-slate-3 text-gray-12 py-4 text-center">
          <p className="text-sm">© 2024 Your Website. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};
