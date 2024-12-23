import express from "express";
import { registerNumber, verifyOtp } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerNumber);
userRouter.post("/verify", verifyOtp);

export default userRouter;
