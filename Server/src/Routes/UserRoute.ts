import { Router } from "express";
import User from "../Models/UserModel";
import {
  deleteUser,
  findByEmail,
  findById,
  getNearbyDrivers,
  register,
  updateUser,
} from "../Helpers/User.controller";
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
router.post("/register", register);

// get nearby drivers
router.get("/nearby/:location", getNearbyDrivers);

// find by id
router.get("/:id", findById);

// find by email
router.get("/email/:email", findByEmail);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

export default router;
