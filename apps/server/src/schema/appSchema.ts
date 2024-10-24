import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  // image: z.instanceof(File).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
});
