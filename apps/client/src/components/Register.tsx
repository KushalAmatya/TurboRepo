import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, userSchema } from "../schema/userSchema";
export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
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

              {errors?.name && (
                <p className="text-red-500 mt-1">{errors.name.message}</p>
              )}

              <input
                type="text"
                {...register("email")}
                placeholder="Email"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />
              {errors?.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-[300px] h-10 bg-slate-800 border-2 border-white rounded-lg text-white p-2 mt-4"
              />
              {errors?.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
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
    </div>
  );
};
