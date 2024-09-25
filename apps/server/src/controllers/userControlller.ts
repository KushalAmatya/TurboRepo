import { Request, Response } from "express";

const userLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.json({ email, password });
};

const userRegister = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
};
export { userLogin, userRegister };
