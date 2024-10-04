import { API } from "../../utils/baseAxios";
// import useFetchWithToken from "../../utils/useFetch";
// import * from "../../../../server/uploads/index.ts"
import { useForm } from "react-hook-form";
import Producttable from "./Producttable";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, productSchema } from "../../schema/productSchema";
import { useMemo } from "react";
export const Products = () => {
  const token = localStorage.getItem("authToken");
  // const { data } = useFetchWithToken<any[]>("/getprojects", token);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  useMemo(() => {
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
    if (errors.description) {
      toast.error(errors.description.message || "Description is required", {
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
    if (errors.projectImage) {
      toast.error(errors.projectImage.message || "Image is required", {
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
  const handleAddProduct = async (data: any) => {
    console.log("addData", data.projectImage[0]);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("projectImage", data.projectImage[0]);

    const adddata = await API.post("/addproject", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(adddata.status);
    if (adddata.status === 200 || adddata.status === 201) {
      toast.success("Product added successfully", {
        position: "bottom-right",
        duration: 4000,
      });
    }
    reset();
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl mb-6 font-semibold">Add products</h2>
        <Producttable />
      </div>
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
      {/* <h2 className="text-2xl mb-6 font-semibold">Products Overview</h2>
      <p>This is where you can see an overview of the system metrics.</p>
      <div>
        <h1>Projects</h1>
        <div className="projects-list">
          {data?.map((project) => {
            console.log(project.image.replace(/^uploads[\\\/]/, ""));
            const image = project.image.replace(/^uploads[\\\/]/, "");
            return (
              <div key={project._id} className="project-item">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <img
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={project.name}
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            );
          })}
        </div>
      </div> */}
      <Toaster />
    </>
  );
};
