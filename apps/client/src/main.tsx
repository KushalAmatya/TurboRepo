import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login.tsx";
import { Register } from "./components/Register.tsx";
import { Landing } from "./components/Landing.tsx";
import { Adminpanel } from "./components/Adminpanel.tsx";
import ProtectedRoute from "./components/Protected.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Landing />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole={true}>
            <Adminpanel />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
