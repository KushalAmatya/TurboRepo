import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.routes";
import { appRouter } from "./routes/app.routes";
import path from "path";
dotenv.config();
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", appRouter);
app.use("/", userRouter);
app.use("/uploads", express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB as string).then(() => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
