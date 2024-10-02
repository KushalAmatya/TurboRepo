import { useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";
import { Dashboard } from "./AdminComponent/Dashboard";
import { Users } from "./AdminComponent/Users";
import { Products } from "./AdminComponent/Products";
import { Setting } from "./AdminComponent/Setting";

const Sidebar = ({
  items,
  onItemSelected,
}: {
  items: string[];
  onItemSelected: (item: string) => void;
}) => {
  return (
    <aside className="flex flex-col gap-4 items-center justify-start w-[300px] h-screen bg-slate-12 text-mauve-1 py-10">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onItemSelected(item)}
          className="text-xl hover:bg-mauve-6 hover:text-mauve-12 w-full py-2 transition-all duration-150 first:mt-12"
        >
          {item}
        </button>
      ))}
    </aside>
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

const MainContent = ({ selectedItem }: { selectedItem: string }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Products":
        return <Products />;

      case "Settings":
        return <Setting />;
      default:
        return (
          <div>
            <h2 className="text-2xl mb-6 font-semibold">Welcome</h2>
            <p>
              Select an item from the sidebar to manage different parts of the
              app.
            </p>
          </div>
        );
    }
  };

  return <div className="flex-1 p-6">{renderContent()}</div>;
};

export const Adminpanel = () => {
  const { theme, setTheme } = themeStore((state) => state);
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const sidebarItems = ["Dashboard", "Users", "Products", "Settings"];

  return (
    <div
      className={`flex transition-colors duration-200 text-mauve-12 max-h-screen overflow-y-hidden ${
        theme ? "dark" : ""
      }`}
    >
      <Sidebar items={sidebarItems} onItemSelected={setSelectedItem} />

      <div className="flex-1 flex flex-col bg-mauve-2 min-h-screen">
        <Header theme={theme} setTheme={setTheme} />

        <MainContent selectedItem={selectedItem} />
      </div>
    </div>
  );
};
