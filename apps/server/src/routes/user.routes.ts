import express from "express";
import { userLogin, userRegister } from "../controllers/userControlller";
import { validateData } from "../middleware/typeValidationMiddleware";
import { loginUserSchema, userSchema } from "../schema/userSchema";

const userRouter = express.Router();

userRouter.post("/login", validateData(loginUserSchema), userLogin);
userRouter.post("/register", validateData(userSchema), userRegister);

export { userRouter };
