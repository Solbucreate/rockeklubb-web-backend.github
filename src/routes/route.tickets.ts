import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  validateTicket
} from "../controllers/ticketscontroller";

const router = Router();

// --------------------------------------------------
// GET all tickets
// --------------------------------------------------
router.get("/", getAllTickets);

// --------------------------------------------------
// GET ticket by ID
// --------------------------------------------------
router.get("/:id", getTicketById);

// --------------------------------------------------
// CREATE new ticket
// --------------------------------------------------
router.post("/", createTicket);

// --------------------------------------------------
// UPDATE ticket
// --------------------------------------------------
router.put("/:id", updateTicket);

// --------------------------------------------------
// DELETE ticket
// --------------------------------------------------
router.delete("/:id", deleteTicket);

// --------------------------------------------------
// VALIDATE TICKET (QR-scanning with event check + used check)
// --------------------------------------------------
router.post("/validate", validateTicket);

export default router;
