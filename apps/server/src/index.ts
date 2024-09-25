import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
dotenv.config();
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
