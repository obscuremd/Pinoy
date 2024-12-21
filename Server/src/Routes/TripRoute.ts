import { Router } from "express";
import Trip from "../Models/TripModel";
const router = Router();

// start Trip
router.post("/start", async (req, res) => {
  const {
    driver_id,
    passenger_id,
    receiver_email,
    receiver_phone_number,
    object_description,
    images,
    activity,
    start_location,
    destination,
    price,
    total_time,
  } = req.body;
  try {
    const newTrip = new Trip({
      driver_id,
      passenger_id,
      receiver_email,
      receiver_phone_number,
      object_description,
      images,
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
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!trip) {
      res.status(404).json("Trip not found");
    } else {
      res.status(200).json(trip);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get Trip
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
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
// router.get("/driver/:id", async (req, res) => {
//   try {
//     const trip = await Trip.findOne({ driver_id: req.params.id });
//     if (!trip) {
//       res.status(404).json("trip not found");
//     } else {
//       res.status(200).json(trip);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// get Trip passengerId
// router.get("/passenger/:id", async (req, res) => {
//   try {
//     const trip = await Trip.findOne({ passenger_id: req.params.id });
//     if (!trip) {
//       res.status(404).json("trip not found");
//     } else {
//       res.status(200).json(trip);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// active ride
router.get("/active/:id", async (req, res) => {
  try {
    const trip = await Trip.findOne({
      $or: [{ driver_id: req.params.id }, { passenger_id: req.params.id }],
      activity: true,
    });

    if (!trip) {
      res.status(404).json({ message: "No active trip found for this ID" });
    } else {
      res.status(200).json(trip);
    }
  } catch (error) {
    console.error("Error fetching active trip:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all trips by passengerId
router.get("/passenger/:id/all", async (req, res) => {
  try {
    const trips = await Trip.find({ passenger_id: req.params.id });
    if (!trips.length) {
      res.status(404).json("No trips found for this passenger");
    } else {
      res.status(200).json(trips);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
