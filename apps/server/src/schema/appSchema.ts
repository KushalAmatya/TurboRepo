import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  image: z.string().optional(),
});
