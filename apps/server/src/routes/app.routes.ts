import express from "express";
import {
  addContact,
  addProject,
  addTech,
  changeCurrentUserPassword,
  deleteMessage,
  deleteUser,
  getMessage,
  getMessageCount,
  getProjectCount,
  getProjects,
  getSelectedMessage,
  getUserCount,
  getUsers,
  sendMessage,
  updateAdmin,
} from "../controllers/appController";
import { validateData } from "../middleware/typeValidationMiddleware";
import { contactSchema, projectSchema } from "../schema/appSchema";
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
appRouter.get("/getprojects", getProjects);

appRouter.get("/getusers", isAuth, getUsers);
appRouter.delete("/deleteuser/:id", isAuth, deleteUser);
appRouter.patch("/updateadmin/:id", isAuth, updateAdmin);
appRouter.post("/addtech", isAuth, addTech);
appRouter.post("/addcontact", addContact, validateData(contactSchema));
appRouter.get("/getmessagecount", getMessageCount);
appRouter.get("/getusercount", isAuth, getUserCount);
appRouter.get("/getprojectcount", getProjectCount);
appRouter.get("/getmessage", isAuth, getMessage);
appRouter.delete("/deletemessage/:id", isAuth, deleteMessage);
appRouter.get("/getselectedmessage/:id", isAuth, getSelectedMessage);
appRouter.post("/sendmessage", isAuth, sendMessage);
appRouter.post("/changepassword", isAuth, changeCurrentUserPassword);
export { appRouter };
