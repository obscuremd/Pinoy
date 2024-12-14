import mongoose, { models } from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    driver_id: { type: String },
    passenger_id: { type: String },
    activity: { type: Boolean, default: false },
    start_location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
    },
    destination: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
    },
    price: { type: String },
    total_time: { type: String, default: "--:--" },
  },
  { timestamps: true }
);

// Create an index for geospatial queries
tripSchema.index({ start_location: "2dsphere" });
tripSchema.index({ destination: "2dsphere" });

const Trip = models.tripData || mongoose.model("tripData", tripSchema);
export default Trip;
