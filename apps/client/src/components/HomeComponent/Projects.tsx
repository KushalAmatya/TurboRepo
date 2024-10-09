import { useMemo, useState } from "react";
import { API } from "../../utils/baseAxios";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

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

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="text-xl text-center">Projects:</div>
      {projects.length > 0 ? (
        projects.slice(0, 3).map((project) => (
          <div
            key={project.id}
            className="border rounded-lg first:py-5 last:mb-4 p-4 shadow-lg sm:odd:translate-x-[9rem] sm:even:translate-x-[-9rem] transition-transform flex gap-3"
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
              <p className="text-base ">{project.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center">No projects available</div>
      )}
    </div>
  );
};
