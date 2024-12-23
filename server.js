import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";

const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
