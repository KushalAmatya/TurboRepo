import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
export const loginUserSchema = userSchema.omit({ name: true });

export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = z.infer<typeof userSchema>;
