import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  image?: string;
}

export interface ITech extends Document {
  name: string;
}

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
}
const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const TechSchema = new Schema({
  name: { type: String, required: true },
});

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
export const Tech = mongoose.model("Tech", TechSchema);
const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
