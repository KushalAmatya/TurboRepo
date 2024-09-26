import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div>
        <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-slate-800 to-slate-950 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">logo</span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <NavLink
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Home
              </NavLink>
              <NavLink
                to="/register"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
              >
                Login
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
