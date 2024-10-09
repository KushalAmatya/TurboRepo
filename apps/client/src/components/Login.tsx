import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Routepick from "./Routepick";
import { LoginUser, loginUserSchema } from "../schema/userSchema";
import { authStore } from "../utils/authStore";

export const Login = () => {
  const [showDialog, setShowDialog] = useState(false);
  const setIsAdmin = authStore((state) => state.setIsAdmin);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
  });

  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message || "Email is required", {
        duration: 2000,
        position: "bottom-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "300px",
        },
      });
    }
    if (errors.password) {
      toast.error("Password is required and should be minimum 6 characters", {
        duration: 2000,
        position: "bottom-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "300px",
        },
      });
    }
  }, [errors]);

  const handleLogin = async (data: LoginUser) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      if (response.status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("authToken", response.data.authToken);

        if (response.data.userRole === true) {
          setIsAdmin(true);
          setShowDialog(true);
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error("Invalid credentials");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white">
      <div className="card-wrapper h-[500px] w-[400px] flex items-center justify-center">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="card-content flex flex-col items-center justify-center text-xs gap-5">
            <p className="text-5xl font-luckiestguy text-white animate-pulse">
              Login
            </p>
            <div className="flex flex-col items-center justify-center">
              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                tabIndex={0}
                className="w-[300px]  h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />
              <input
                type="password"
                {...register("password")}
                tabIndex={0}
                placeholder="Password"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <button
                tabIndex={1}
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4 hover:border-slate-900 hover:bg-slate-500 transition-colors duration-200"
              >
                Login
              </button>
              <p className="flex gap-2 text-base">
                Don't have an account?
                <NavLink to="/register" className="text-blue-400">
                  Register
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Toaster />

      {showDialog && <Routepick />}
    </div>
  );
};
