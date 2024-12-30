import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.google.route.js";
import passport from "./config/passport.js";
import driverRouter from "./routes/driver.profile.route.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());


app.use(passport.initialize());

app.use("/api/user", userRouter);
app.use("/api/driver", driverRouter);
app.use(authRouter);

connectDB();

app.get('/dashboard', (req, res) =>{
  res.send("hello")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
