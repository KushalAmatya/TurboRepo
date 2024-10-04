import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  projectImage: z.number().positive(),
});

export type Product = z.infer<typeof productSchema>;
