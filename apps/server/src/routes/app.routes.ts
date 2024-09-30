import express from "express";
import { addProject, deleteUser, getUsers } from "../controllers/appController";
import { validateData } from "../middleware/typeValidationMiddleware";
import { projectSchema } from "../schema/appSchema";
import multer from "multer";
import { isAuth } from "../middleware/isAuthMiddleware";
import { NextFunction } from "express";
const appRouter = express.Router();

const storage = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1000000,
  },
});
appRouter.post(
  "/addproject",
  storage.single("projectImage"),
  validateData(projectSchema),
  addProject
);

appRouter.delete("/deleteuser/:id", isAuth, deleteUser);
appRouter.get("/getusers", getUsers);

export { appRouter };
