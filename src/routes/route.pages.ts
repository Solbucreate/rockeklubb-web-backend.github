import { Router } from "express";
import * as pagecontroller from "../controllers/pagecontroller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// PUBLIC
router.get("/", pagecontroller.getAllPages);
router.get("/:slug", pagecontroller.getPageBySlug);

// ADMIN
router.post("/", requireAdmin, pagecontroller.createPage);
router.put("/:slug", requireAdmin, pagecontroller.updatePage);
router.delete("/:slug", requireAdmin, pagecontroller.deletePage);

export default router;
