import * as Progress from "@radix-ui/react-progress";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../utils/baseAxios";
import toast from "react-hot-toast";
import axios from "axios";

export const Setting = () => {
  const pattern1 = /(?=.*[a-z])/;
  const pattern2 = /(?=.*[a-z])(?=.*[A-Z])/;
  const pattern3 = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  const pattern4 = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!_%&*])/;

  const [progress, setProgress] = useState(0);

  const { register, handleSubmit, watch } = useForm();

  const newPassword = watch("newpass", "");

  useEffect(() => {
    let strength = 0;

    if (pattern1.test(newPassword)) strength = 25;
    if (pattern2.test(newPassword)) strength = 50;
    if (pattern3.test(newPassword)) strength = 75;
    if (pattern4.test(newPassword)) strength = 100;

    setProgress(strength);
  }, [newPassword]);
  const handleChange = async (data: any) => {
    try {
      if (data.newpass !== data.confirmpass) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await API.post("/changepassword", data, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });

      // Check response status here
      if (response.status === 200) {
        toast.success("Password changed successfully");
      } else if (response.status === 400) {
        toast.error("Incorrect password");
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          toast.error("Incorrect old password");
        } else {
          toast.error("An error occurred while changing password");
          console.error(error.response?.data || error.message);
        }
      } else {
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-6 font-semibold">Settings Overview</h2>
      <form
        onSubmit={handleSubmit(handleChange)}
        className="flex flex-col gap-4"
      >
        <h3 className="font-semibold">Change password</h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            {...register("oldpass")}
            className="rounded-lg p-2 text-black border border-gray-300"
            type="password"
            id="oldPassword"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p>Password Strength</p>
          <div className="flex">
            <Progress.Root
              className="relative h-[25px] w-[300px] overflow-hidden rounded-full bg-gray-300"
              value={progress}
            >
              <Progress.Indicator
                className={`h-full transition-transform duration-300 ${progress < 40 ? "bg-red-7" : "bg-green-500 "} ease-out`}
                style={{ transform: `translateX(-${100 - progress}%)` }}
              />
            </Progress.Root>
            <span className="ml-2 font-semibold">{progress}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword">New Password</label>
          <input
            {...register("newpass")}
            className="rounded-lg p-2 text-black border border-gray-300"
            type="password"
            id="newPassword"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmpass")}
            className="rounded-lg p-2 text-black border border-gray-300"
            type="password"
            id="confirmPassword"
          />
        </div>
        <button type="submit" className="bg-slate-9 p-2 rounded-lg">
          Change
        </button>
      </form>
    </div>
  );
};
