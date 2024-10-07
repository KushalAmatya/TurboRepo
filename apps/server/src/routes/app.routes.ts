import express from "express";
import {
  addProject,
  addTech,
  deleteUser,
  getProjects,
  getUsers,
  updateAdmin,
} from "../controllers/appController";
import { validateData } from "../middleware/typeValidationMiddleware";
import { projectSchema } from "../schema/appSchema";
import { isAuth } from "../middleware/isAuthMiddleware";
import storage from "../utils/fileUpload";
const appRouter = express.Router();

appRouter.post(
  "/addproject",
  isAuth,
  storage.single("projectImage"),
  validateData(projectSchema),
  addProject
);
appRouter.get("/getprojects", isAuth, getProjects);

appRouter.get("/getusers", getUsers, isAuth);
appRouter.delete("/deleteuser/:id", isAuth, deleteUser);
appRouter.patch("/updateadmin/:id", isAuth, updateAdmin);
appRouter.post("/addtech", isAuth, addTech);
export { appRouter };
