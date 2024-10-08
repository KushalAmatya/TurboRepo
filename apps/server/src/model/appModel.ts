import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  image?: string;
}

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const TechSchema = new Schema({
  name: { type: String, required: true },
});

export const Tech = mongoose.model("Tech", TechSchema);
const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
