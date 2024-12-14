import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  residential_address: { type: String, required: true },
  admin: { type: Boolean, default: false },
  admin_data_id: { type: String },
  driver: { type: Boolean, default: false },
  drivers_license: { type: String },
  car_picture: { type: String },
  car_number: { type: String },
  activity: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["registered", "unregistered"],
    default: "unregistered",
  },
  trips: { type: [String], default: [] },
  location: { type: [Number, Number], default: [] },
});

const User = models.UserData || mongoose.model("UserData", userSchema);
export default User;
