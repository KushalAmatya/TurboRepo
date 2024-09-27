import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";
import { ReactNode } from "react";

const Sidebar = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-col gap-4 items-center  justify-start w-[300px] h-screen bg-slate-12 text-mauve-1 py-10">
      {items.map((item) => (
        <button
          key={item}
          className="text-xl hover:bg-mauve-6 hover:text-mauve-12 w-full py-2 transition-all duration-150 first:mt-12"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const Header = ({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: (value: boolean) => void;
}) => {
  return (
    <div className="flex justify-between items-center w-full py-4 px-6 bg-mauve-1 text-gray-12 shadow-md">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <button
        className="bg-mauve-1 rounded-full w-[35px] h-[35px] flex items-center justify-center hover:bg-mauve-8 transition-colors duration-200"
        onClick={() => setTheme(!theme)}
      >
        {theme ? (
          <MoonIcon width={20} height={20} />
        ) : (
          <SunIcon width={20} height={20} />
        )}
      </button>
    </div>
  );
};

const MainContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex-1 p-6">{children}</div>;
};

export const Adminpanel = () => {
  const { theme, setTheme } = themeStore((state) => state);

  const sidebarItems = ["Dashboard", "Users", "Products", "Orders", "Settings"];

  return (
    <div
      className={`flex transition-colors duration-200 text-mauve-12 ${theme ? "dark" : ""}`}
    >
      <Sidebar items={sidebarItems} />

      <div className="flex-1 flex flex-col bg-mauve-2 min-h-screen">
        <Header theme={theme} setTheme={setTheme} />

        <MainContent>
          <h2 className="text-2xl mb-6 font-semibold">
            Welcome to the Admin Dashboard
          </h2>
          <p>
            This is where you can manage your app's users, products, orders, and
            more!
          </p>
        </MainContent>
      </div>
    </div>
  );
};
