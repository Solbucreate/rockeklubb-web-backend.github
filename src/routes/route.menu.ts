import { Router } from "express";
import * as menucontroller from "../controllers/menucontroller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// PUBLIC GET ROUTES
router.get("/", menucontroller.getAllMenu);
router.get("/:id", menucontroller.getMenuById);

// ADMIN PROTECTED ROUTES
router.post("/", requireAdmin, menucontroller.createMenu);
router.put("/:id", requireAdmin, menucontroller.updateMenu);
router.delete("/:id", requireAdmin, menucontroller.deleteMenu);

export default router;
