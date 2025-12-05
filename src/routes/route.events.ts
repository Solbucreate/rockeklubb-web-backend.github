import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventscontroller";

const router = Router();

// --------------------------------------------------
// GET all events
// --------------------------------------------------
router.get("/", getAllEvents);

// --------------------------------------------------
// GET event by ID
// --------------------------------------------------
router.get("/:id", getEventById);

// --------------------------------------------------
// CREATE event
// --------------------------------------------------
router.post("/", createEvent);

// --------------------------------------------------
// UPDATE event
// --------------------------------------------------
router.put("/:id", updateEvent);

// --------------------------------------------------
// DELETE event
// --------------------------------------------------
router.delete("/:id", deleteEvent);

export default router;
