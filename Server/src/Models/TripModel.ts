import mongoose, { models } from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    driver_id: { type: String },
    customers: {
      type: [String],
      default: [],
      validate: {
        validator: function (value: []) {
          return value.length > 0; // Ensures at least one customer exists
        },
        message: "The customers array must contain at least one user.",
      },
    },
    images: { type: [String] },
    receiver_email: { type: String },
    receiver_phone_number: { type: String },
    object_description: { type: String },
    activity: { type: Boolean, default: false },
    pickup: { type: Boolean, default: false },
    driver_location: {
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
