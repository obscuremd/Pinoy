import { Router } from "express";
import Trip from "../Models/TripModel";
import {
  getActiveRide,
  getAllTrips,
  getRide,
  start,
  update,
} from "../Helpers/Trip.controller";
const router = Router();

// start Trip
router.post("/start", start);

// update Trip
router.put("/:id", update);

// get Trip
router.get("/:id", getRide);

// active ride
router.get("/active/:id", getActiveRide);

// get all trips by passengerId
router.get("/:id/all", getAllTrips);

export default router;
