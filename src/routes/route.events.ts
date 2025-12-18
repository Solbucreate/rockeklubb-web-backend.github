import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventscontroller";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// PUBLIC
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// ADMIN
router.post("/", requireAdmin, createEvent);
router.put("/:id", requireAdmin, updateEvent);
router.delete("/:id", requireAdmin, deleteEvent);

export default router;
