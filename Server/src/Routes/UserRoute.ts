import { Router } from "express";
import User from "../Models/UserModel";
const router = Router();

// get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create user
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    phone_number,
    admin,
    admin_data_id,
    driver,
    drivers_license,
    car_picture,
    car_number,
    activity,
    status,
    trips,
    location,
  } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      phone_number,
      admin,
      admin_data_id,
      driver,
      drivers_license,
      car_picture,
      car_number,
      activity,
      status,
      trips: trips,
      location: location,
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// find by email
router.get("/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json("no such user found");
    } else {
      const updatedUser = await user?.updateOne({ $set: req.body });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json("no such user found");
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: `user has been deleted` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
