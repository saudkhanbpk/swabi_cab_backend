import express from "express";
import { login, registerNumber, verifyOtp } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerNumber);
userRouter.post("/login", login);
userRouter.post("/verify", verifyOtp);

export default userRouter;
