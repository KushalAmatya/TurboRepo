import { Response, Request } from "express";
import Project, { Contact, Tech } from "../model/appModel";
import User from "../model/userModel";
import nodemailer from "nodemailer";
const addProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const token = req.header("Authorization");
    console.log("token from add project", token);
    const image = req.file?.path;
    const project = new Project({ name, description, image });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const updateAdmin = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isAdmin: true });
    res.status(200).json({ message: "User is now an admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTech = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const tech = new Tech({ name });
    await tech.save();
    res.status(201).json(tech);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addContact = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MY_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessageCount = async (req: Request, res: Response) => {
  try {
    const count = await Contact.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserCount = async (req: Request, res: Response) => {
  try {
    const count = await User.countDocuments();
    const adminCount = await User.countDocuments().where("isAdmin", true);
    res.status(200).json({ count, adminCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProjectCount = async (req: Request, res: Response) => {
  try {
    const project = await Project.find().where("isAdmin", true);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  addProject,
  getUsers,
  deleteUser,
  updateAdmin,
  getProjects,
  addTech,
  addContact,
  getMessageCount,
  getUserCount,
  getProjectCount,
};
