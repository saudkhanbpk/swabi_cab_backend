import mongoose from "mongoose";

const driverProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cnicFront: {
    type: String,
    required: true,
  },
  cnicBack: {
    type: String,
    required: true,
  },
  carCategory: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  carDocument: {
    type: String,
    required: true,
  },
  licenceFront: {
    type: String,
    required: true,
  },
  licenceBack: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  licenceBack: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DriverProfile =
  mongoose.model.DriverProfile ||
  mongoose.model("DriverProfile", driverProfileSchema);
export default DriverProfile;
