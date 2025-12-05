import { Router } from "express";
import { adminLogin } from "../controllers/admincontroller";

const router = Router();

router.post("/login", adminLogin);

export default router;
