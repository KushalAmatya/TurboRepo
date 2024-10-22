import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  HamburgerMenuIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";
import { Dashboard } from "./AdminComponent/Dashboard";
import { Users } from "./AdminComponent/Users";
import { Products } from "./AdminComponent/Products";
import { Setting } from "./AdminComponent/Setting";
import { Techstack } from "./AdminComponent/Techstack";
import { Chatmessage } from "./AdminComponent/Chatmessage";

const Sidebar = ({
  items,
  onItemSelected,
  isOpen,
  toggleSidebar,
}: {
  items: string[];
  onItemSelected: (item: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <aside
      className={`sm:flex ${
        isOpen ? "flex" : "hidden"
      } flex-col gap-4 items-center justify-start sm:w-[300px] w-[250px] h-screen bg-slate-12 text-mauve-1 py-10 absolute sm:relative top-0 left-0 transition-transform duration-200 z-50`}
    >
      <button
        className="sm:hidden text-mauve-1 absolute top-4 right-4"
        onClick={toggleSidebar}
      >
        <Cross2Icon width={24} height={24} />
      </button>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => {
            onItemSelected(item);
            toggleSidebar();
          }}
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
  toggleSidebar,
}: {
  theme: boolean;
  setTheme: (value: boolean) => void;
  toggleSidebar: () => void;
}) => {
  return (
    <div className="flex justify-between items-center w-full py-4 px-6 bg-mauve-1 text-gray-12 shadow-md">
      <div className="flex items-center gap-4">
        <button className="sm:hidden" onClick={toggleSidebar}>
          <HamburgerMenuIcon width={24} height={24} />
        </button>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>
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
      case "Techstack":
        return <Techstack />;
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    "Dashboard",
    "Techstack",
    "Users",
    "Products",
    "Settings",
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={`relative flex transition-colors duration-200 text-mauve-12 ${
        theme ? "dark" : ""
      }`}
    >
      <Sidebar
        items={sidebarItems}
        onItemSelected={setSelectedItem}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col bg-mauve-2 min-h-screen h-screen overflow-hidden relative">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header
            theme={theme}
            setTheme={setTheme}
            toggleSidebar={toggleSidebar}
          />
          <MainContent selectedItem={selectedItem} />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 -translate-x-4 -translate-y-2">
        <Chatmessage />
      </div>
    </div>
  );
};
