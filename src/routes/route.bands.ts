import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import {
  getAllBand,
  getBandById,
  createBand,
  updateBand,
  deleteBand
} from "../controllers/bandscontroller";

const router = Router();

router.get("/", getAllBand);
router.get("/:id", getBandById);

router.post("/", requireAdmin, createBand);
router.put("/:id", requireAdmin, updateBand);
router.delete("/:id", requireAdmin, deleteBand);

export default router;
