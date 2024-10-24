import { motion } from "framer-motion";
import { Javascript } from "./TechstackIcons/Javascript";
import { Tailwindcss } from "./TechstackIcons/Tailwindcss";
import { Nodejs } from "./TechstackIcons/Nodejs";
import { Expressjs } from "./TechstackIcons/Expressjs";
import { Mongodb } from "./TechstackIcons/Mongodb";
import { Typescript } from "./TechstackIcons/Typescript";
import { Nextjs } from "./TechstackIcons/Nextjs";

export const Hero = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const avatarVariants = {
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { yoyo: Infinity, duration: 0.4 },
    },
  };

  const stackVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <>
      <div className="fixed inset-0 bg-blackA6 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
      />

      <div className="items-center gap-3 flex flex-wrap justify-center">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="h-[40dvh] max-h-[85dvh] w-[90dvw] max-w-[70dvh] rounded-md bg-slate-2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] pointer-events-auto flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-center gap-7">
            <motion.div
              whileHover="hover"
              variants={avatarVariants}
              className="inline-flex h-[65px] w-[65px] items-center justify-center rounded-full bg-gray-2"
            >
              <img
                className="h-full w-full rounded-full object-cover border-2 border-slate-4"
                src="https://avatars.githubusercontent.com/KushalAmatya"
                alt="Kushal Amatya"
              />
            </motion.div>

            <span className="text-[20px] font-medium text-violet-9">
              Kushal Amatya
            </span>
          </div>

          <div>
            <div>Full Stack Developer</div>
            <p>Kathmandu, Nepal</p>
          </div>
        </motion.div>

        <motion.div
          variants={stackVariants}
          initial="hidden"
          animate="visible"
          className="h-[40dvh] max-h-[85dvh] w-[90dvw] max-w-[70dvh] rounded-md bg-slate-2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] pointer-events-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-7 text-[20px] text-violet-9 font-medium pt-3">
            Tech Stack
          </div>
          <div>
            <div className="flex flex-wrap gap-3">
              <Javascript width={30} height={30} />
              <Tailwindcss width={30} height={30} />
              <Nodejs width={30} height={30} />
              <Expressjs width={30} height={30} />
              <Mongodb width={30} height={30} />
              <Typescript width={30} height={30} />
              <Nextjs width={30} height={30} />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
