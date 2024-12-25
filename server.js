import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import session from "express-session";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.google.route.js";
import passport from "./config/passport.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// app.use(
//   session({
//     secret: "YOUR_SECRET_KEY", // Replace with a strong secret
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Initialize Passport
app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/user", userRouter);
app.use(authRouter);

connectDB();

app.get('/dashboard', (req, res) =>{
  res.send("hello")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
