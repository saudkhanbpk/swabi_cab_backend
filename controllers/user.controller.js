import User from "../models/user.model.js";
import { sendOtp } from "../utils/send.otp.js";
import crypto from "crypto";

export const registerNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }
    const exists = await User.findOne({ phoneNumber });
    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const user = new User({ phoneNumber, otp: hashedOtp });
    await user.save();

    await sendOtp(phoneNumber, otp);
    return res.status(201).json({
      message: "OTP sent successfully. Please verify your phone number.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const login = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({
        message: "User not found. Please register first.",
        success: false,
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Phone number not verified. Please verify your phone number.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Login successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (user.verified) {
      return res
        .status(400)
        .json({ message: "Phone number already verified", success: false });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.otp !== hashedOtp) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }

    user.otp = null;
    user.verified = true;
    await user.save();

    return res.status(200).json({
      message: "Phone number verified successfully",
      success: true,
      verified: user.verified,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
