import { Router } from "express";
import Review from "../Models/ReviewsModel";
const router = Router();

// start Trip
router.post("/start", async (req, res) => {
  const {
    driver_id,
    passenger_id,
    activity,
    start_location,
    destination,
    price,
    total_time,
  } = req.body;
  try {
    const newTrip = new Review({
      driver_id,
      passenger_id,
      activity,
      start_location,
      destination,
      price,
      total_time,
    });
    await newTrip.save();
    res.status(200).json(newTrip);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update Trip
router.put("/:id", async (req, res) => {
  try {
    const trip = await Review.findByIdAndUpdate(req.params.id);

    if (!trip) {
      res.status(404).json("Trip not found");
    } else {
      const newTrip = await trip.updateOne({ $set: req.body });
      res.status(200).json(newTrip);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get Trip
router.get("/:id", async (req, res) => {
  try {
    const trip = await Review.findById(req.params.id);
    if (!trip) {
      res.status(404).json("trip not found");
    } else {
      res.status(200).json(trip);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get Trip driverId
router.get("/driver/:id", async (req, res) => {
  try {
    const trip = await Review.findOne({ driver_id: req.params.id });
    if (!trip) {
      res.status(404).json("trip not found");
    } else {
      res.status(200).json(trip);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get Trip passengerId
router.get("/passenger/:id", async (req, res) => {
  try {
    const trip = await Review.findOne({ passenger_id: req.params.id });
    if (!trip) {
      res.status(404).json("trip not found");
    } else {
      res.status(200).json(trip);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
