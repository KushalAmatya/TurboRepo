import { API } from "../../utils/baseAxios";
import useFetchWithToken from "../../utils/useFetch";
// import * from "../../../../server/uploads/index.ts"
import { useForm } from "react-hook-form";
export const Products = () => {
  const token = localStorage.getItem("authToken");
  const { data } = useFetchWithToken<any[]>("/getprojects", token);
  const { register, handleSubmit, reset } = useForm();

  const handleAddProduct = async (data: any) => {
    console.log("addData", data.projectImage[0]);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("projectImage", data.projectImage[0]);

    await API.post("/addproject", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    reset();
  };

  return (
    <>
      <h2 className="text-2xl mb-6 font-semibold">Add products</h2>
      <div>
        <form
          className="flex flex-col"
          encType="multipart/form-data"
          method="POST"
          action="/addproject"
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="border border-gray-400 p-2 mb-4"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="border border-gray-400 p-2 mb-4 text-black"
          ></textarea>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("projectImage")}
            className="border border-gray-400 p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
      <h2 className="text-2xl mb-6 font-semibold">Products Overview</h2>
      <p>This is where you can see an overview of the system metrics.</p>
      <div>
        <h1>Projects</h1>
        <div className="projects-list">
          {data?.map((project) => {
            console.log(project.image.replace(/\\/g, "/"));

            return (
              <div key={project._id} className="project-item">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <img
                  src={`http://localhost:3000/uploads/${project.image.replace(/\\/g, "/")}`}
                  alt={project.name}
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
