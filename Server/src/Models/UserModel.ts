import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profile_picture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
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
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number] }, // [longitude, latitude]
  },
});

// Add the 2dsphere index
userSchema.index({ location: "2dsphere" });

const User = models.UserData || mongoose.model("UserData", userSchema);
export default User;
