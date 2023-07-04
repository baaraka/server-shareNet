import express from "express";
import {
  createShare,
  deleteShare,
  getShare,
  getShares,
  updateShare,
} from "../controllers/share.js";

const router = express.Router();

router.post("/", createShare);
router.put("/:id", updateShare);
router.delete("/:id", deleteShare);
router.get("/:id", getShare);
router.get("/", getShares);

export default router;
