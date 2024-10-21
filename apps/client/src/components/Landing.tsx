import { themeStore } from "../utils/themeStore";
import { Contact } from "./HomeComponent/Contact";
import { Hero } from "./HomeComponent/Hero";
import { Projects } from "./HomeComponent/Projects";
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
        <div className="w-[100dvh-10px] border-b-2 border-slate-12 "></div>
        <div className="h-full pt-8 flex items-center justify-center bg-gradient-to-r from-slate-2 to-slate-3 text-gray-12">
          <Projects />
        </div>
        <div className="h-full pt-8 py-4 flex items-center justify-center bg-gradient-to-r from-slate-2 to-slate-3 text-gray-12">
          <Contact />
        </div>
        <footer className="bg-slate-3 text-gray-12 py-8 text-center">
          <p className="text-sm">© 2024 Your Website. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};
