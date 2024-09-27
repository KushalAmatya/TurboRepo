import { themeStore } from "../utils/themeStore";
import { Navbar } from "./Navbar";

export const Landing = () => {
  const { theme } = themeStore((state) => state);
  return (
    <>
      <div className={`${theme && "dark"}`}>
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-r from-slate-2 to-slate-3 text-gray-12">
          <h1 className="text-4xl font-bold animate-pulse">
            Welcome to the landing page
          </h1>
        </div>
      </div>
    </>
  );
};
