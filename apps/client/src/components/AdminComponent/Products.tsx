import { API } from "../../utils/baseAxios";
import { useForm } from "react-hook-form";
import Producttable from "./Producttable";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, productSchema } from "../../schema/productSchema";
import { useMemo } from "react";
export const Products = () => {
  const token = localStorage.getItem("authToken");
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
            className="border h-[200px] border-gray-400 p-2 mb-4 text-black"
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
            className="bg-slate-11 text-white p-2 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>

      <Toaster />
    </>
  );
};
