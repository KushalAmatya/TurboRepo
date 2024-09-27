import { Navigate } from "react-router-dom";
import { authStore } from "../utils/authStore";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: boolean;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { isAdmin } = authStore();

    if (isAdmin !== requiredRole) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
