import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  otp: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model.User || mongoose.model("User", userSchema);
export default User;