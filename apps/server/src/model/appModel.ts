import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  image?: string;
}

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
