import { Response, Request } from "express";
import Project from "../model/appModel";
import User from "../model/userModel";

const addProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const image = req.file?.path;
    const project = new Project({ name, description, image });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addProject, getUsers, deleteUser };
