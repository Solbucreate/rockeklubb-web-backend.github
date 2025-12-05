import { Router } from "express";
import * as usercontroller from "../controllers/usercontroller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// ADMIN ONLY
router.get("/", requireAdmin, usercontroller.getAllUsers);
router.get("/:id", requireAdmin, usercontroller.getUserById);
router.post("/", requireAdmin, usercontroller.createUser);
router.put("/:id", requireAdmin, usercontroller.updateUser);
router.delete("/:id", requireAdmin, usercontroller.deleteUser);

export default router;
