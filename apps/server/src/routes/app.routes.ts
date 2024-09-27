import express from "express";
import { addProject } from "../controllers/appController";
import { validateData } from "../middleware/typeValidationMiddleware";
import { projectSchema } from "../schema/appSchema";
import multer from "multer";
import { isAuth } from "../middleware/isAuthMiddleware";
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
  validateData(projectSchema),
  storage.single("projectImage"),
  isAuth,
  addProject
);

export { appRouter };
