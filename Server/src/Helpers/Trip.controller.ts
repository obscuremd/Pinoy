import { Request, Response } from "express";
import Trip from "../Models/TripModel";

export const start = async (req: Request, res: Response) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res
      .status(200)
      .json({ success: true, message: "trip started", data: newTrip });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!trip) {
      res.status(404).json({ success: false, message: "Trip not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "trip updated", data: trip });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error });
  }
};

export const getRide = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      res.status(404).json("trip not found");
    } else {
      res
        .status(200)
        .json({ success: true, message: "trip found", data: trip });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getActiveRide = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findOne({
      $or: [{ driver_id: req.params.id }, { customers: req.params.id }],
      activity: true,
    });

    if (!trip) {
      res
        .status(404)
        .json({ success: false, message: "No active trip found for this ID" });
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: "there is an active trip",
          data: trip,
        });
    }
  } catch (error) {
    console.error("Error fetching active trip:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

export const getAllTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const trips = await Trip.find({
      $or: [{ customers: userId }, { driver_id: userId }],
    });
    if (!trips.length) {
      res
        .status(404)
        .json({ success: false, message: "No trips found for this passenger" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "trip found", data: trips });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
