import { Router } from "express";
import * as pagescontroller from "../controllers/pagescontroller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// PUBLIC
router.get("/", pagescontroller.getAllPages);
router.get("/:slug", pagescontroller.getPageBySlug);

// ADMIN
router.post("/", requireAdmin, pagescontroller.createPage);
router.put("/:slug", requireAdmin, pagescontroller.updatePage);
router.delete("/:slug", requireAdmin, pagescontroller.deletePage);

export default router;
