import { Router } from "express";
import { login } from "../controllers/authcontroller";

const router = Router();

// LOGIN
router.post("/login", login);

export default router;
