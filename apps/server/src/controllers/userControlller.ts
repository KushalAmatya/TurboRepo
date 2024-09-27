import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import User from "../model/userModel";
import jwt from "jsonwebtoken";

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    const userRole = existingUser?.isAdmin;
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authToken = jwt.sign(
      { userId: existingUser._id },
      process.env.SECRET as string,
      { expiresIn: "1d" }
    );

    console.log(authToken);

    res.json({ authToken, userRole });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const userRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ name, email, password });
  } catch (err) {
    return res.status(500).json(err);
  }
};
export { userLogin, userRegister };
