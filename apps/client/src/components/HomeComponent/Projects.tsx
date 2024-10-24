import { useMemo, useState } from "react";
import { API } from "../../utils/baseAxios";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useMemo(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/getprojects");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,

      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-6 h-full"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      <div id="projects" className="text-3xl font-bold text-center">
        Projects:
      </div>
      {projects.length > 0 ? (
        projects.slice(0, 3).map((project) => (
          <motion.div
            variants={itemVariants}
            key={project.id}
            className="border border-opacity-5 rounded-lg first:py-5 last:mb-4 p-4 shadow-md shadow-slate-12 transition-transform flex gap-3"
          >
            <div className="w-[80dvh] h-[30dvh] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={`http://localhost:3000/uploads/${project.image.replace(
                  /^public[\\\/]/,
                  ""
                )}`}
                alt={project.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="mt-4 text-lg font-semibold">{project.name}</h2>
              <p className="text-base">{project.description}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-3 text-center">No projects available</div>
      )}
      <div className="flex justify-center items-center pb-4">
        <a
          href="https://github.com/KushalAmatya?tab=repositories"
          target="_blank"
          className="text-center text-lg text-violet-9 hover:text-violet-10"
        >
          View all projects
        </a>
      </div>
    </motion.div>
  );
};
