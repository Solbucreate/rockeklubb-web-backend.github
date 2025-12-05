import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingscontroller";
import { requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getSettings);
router.put("/", requireAdmin, updateSettings);

export default router;
