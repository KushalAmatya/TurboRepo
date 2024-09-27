import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { themeStore } from "../utils/themeStore";

export const Adminpanel = () => {
  const { theme, setTheme } = themeStore((state) => state);
  return (
    <>
      <div
        className={`flex bg-mauve-1 transition-colors duration-200 ${theme && "dark"}`}
      >
        <div className="flex text-xl flex-col gap-4 items-center justify-start w-[300px] h-screen bg-slate-12 text-mauve-1">
          <div className="mt-20">
            <button>Dashboard</button>
          </div>
          <div>
            <button>Users</button>
          </div>
          <div>
            <button>Products</button>
          </div>
          <div>
            <button>Orders</button>
          </div>
          <div>
            <button>Settings</button>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-start  mt-6 text-3xl ml-4 font-semibold text-gray-12 w-full">
          <div className="flex justify-between w-full">
            <h1>Dashboard</h1>

            <button
              className="bg-mauve-1  rounded-full mr-4 w-[25px] h-[25px] flex items-center justify-center hover:bg-mauve-8 transition-colors duration-200"
              onClick={() => setTheme(!theme)}
            >
              {theme ? (
                <MoonIcon width={20} height={20} />
              ) : (
                <SunIcon width={20} height={20} />
              )}
            </button>
          </div>
          <div>jhasdgasgh</div>
        </div>
      </div>
    </>
  );
};
