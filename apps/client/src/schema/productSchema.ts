import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  projectImage: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    {
      message: "Image is required",
    }
  ),
});

export type Product = z.infer<typeof productSchema>;
