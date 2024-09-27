import { Response, Request } from "express";
import Project from "../model/appModel";

const addProject = (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const image = req.file?.path;
    const project = new Project({
      name,
      description,
      image,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //   res.json({ name, description, image });
};

export { addProject };
