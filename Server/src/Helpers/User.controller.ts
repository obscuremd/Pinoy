import { Request, Response } from "express";
import User from "../Models/UserModel";

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

export const getNearbyDrivers = async (req: Request, res: Response) => {
  try {
    const locationParam = req.params.location.split(","); // Split the coordinates
    const longitude = parseFloat(locationParam[0]);
    const latitude = parseFloat(locationParam[1]);

    // Query nearby drivers within 5km
    const drivers = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude], // [Longitude, Latitude]
          },
          distanceField: "distance",
          maxDistance: 5000, // 5 kilometers
          spherical: true,
          query: { driver: true }, // Filter to ensure only drivers are returned
        },
      },
    ]);

    if (!drivers) {
      res.status(401).send({ success: false, message: "user not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user found", data: drivers });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

export const findById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(401).send({ success: false, message: "user not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user found", data: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

export const findByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      res.status(401).send({ success: false, message: "user not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "user found", data: user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      res.status(404).json("no such user found");
    } else {
      res.status(200).json({ success: true, message: "user updated", user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ success: false, message: "no such user found" });
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: `user has been deleted` });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error", data: error });
  }
};
