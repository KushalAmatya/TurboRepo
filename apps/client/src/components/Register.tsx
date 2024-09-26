import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, userSchema } from "../schema/userSchema";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message || "Name is required", {
        duration: 4000,
        position: "bottom-right",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "300px",
        },
      });
    }
    if (errors.email) {
      toast.error(errors.email.message || "Email is required", {
        duration: 4000,
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
        duration: 4000,
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
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      if (response.status === 200) {
        toast.success("Registered successfully");
        console.log(response.data);
        // setTimeout(() => {
        navigate("/login");
        // }, 2000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("User already exists");
      } else {
        toast.error("Registration failed");
      }
    }
  };
  console.log(errors);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-slate-950 text-white">
      <div className="card-wrapper h-[500px] w-[400px] flex items-center justify-center">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-content flex flex-col items-center justify-center text-xs gap-5">
            <p className="text-5xl font-luckiestguy text-white animate-pulse ">
              Register
            </p>
            <div className="flex flex-col items-center justify-center gap-1">
              <input
                type="text"
                {...register("name")}
                placeholder="Username"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />

              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />

              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <button className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4 hover:border-slate-900 hover:bg-slate-500 transition-colors duration-200">
                Login
              </button>
              <p className="flex gap-2 text-base">
                ALready have an account?
                <NavLink to="/login" className="text-blue-400">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
