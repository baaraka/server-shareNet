import express from "express";
import {
  createShare,
  deleteShare,
  getShare,
  getShares,
  updateShare,
} from "../controllers/share.js";

const router = express.Router();

//create share
router.post("/", createShare);

//update share
router.put("/:id", updateShare);

//delete share
router.delete("/:id", deleteShare);

//get share
router.get("/:id", getShare);

//get shares
router.get("/", getShares);

export default router;
