import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/contactcontroller";

const router = Router();

// PUBLIC – send melding fra kontaktskjema
router.post("/", sendMessage);

// ADMIN – hent alle meldinger
router.get("/", getMessages);

export default router;
