import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contacttype, contactSchema } from "../../schema/contactSchema";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { motion, useInView } from "framer-motion";
import { API } from "../../utils/baseAxios";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const contactVariant = {
    hidden: { opacity: 0, x: -200 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contacttype>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message || "Name is required", {
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
    if (errors.message) {
      toast.error(errors.message.message || "Message is required", {
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

  const ContactSubmit = async (data: Contacttype) => {
    console.log(data);
    const dat = await API.post("/addcontact", data);
    if (dat.status === 201 || dat.status === 200) {
      toast.success("Message sent successfully");
      reset();
    }
  };

  return (
    <div className="flex flex-col gap-4" id="contact">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <motion.div
        ref={ref}
        variants={contactVariant}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="sm:min-w-[1000px] min-w-[400px] mx-auto p-10 bg-slate-3 shadow-xl rounded-lg"
      >
        <form onSubmit={handleSubmit(ContactSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className={`w-full text-lg text-slate-7 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-5 ${
                errors.name ? "border-red-5" : "border-gray-3"
              }`}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className={`w-full text-lg text-slate-7 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-5 ${
                errors.email ? "border-red-5" : "border-gray-3"
              }`}
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              {...register("message")}
              className={`w-full h-[200px] text-lg text-slate-7 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-5 ${
                errors.message ? "border-red-5" : "border-gray-3"
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-5 text-slate-12 text-lg py-3 rounded-lg hover:bg-indigo-6 transition duration-300"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};
