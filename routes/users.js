import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//get user
router.get("/:id", getUser);

//get users
router.get("/", getUsers);

export default router;
