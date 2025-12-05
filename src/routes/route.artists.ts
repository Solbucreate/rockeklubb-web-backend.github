import { Router } from "express";
import * as artistscontroller from "../controllers/artistscontroller";
import { requireAdmin } from "../middleware/requireAdmin";

const router = Router();

// PUBLIC
router.get("/", artistscontroller.getAllArtists);
router.get("/:id", artistscontroller.getArtistById);

// ADMIN
router.post("/", requireAdmin, artistscontroller.createArtist);
router.put("/:id", requireAdmin, artistscontroller.updateArtist);
router.delete("/:id", requireAdmin, artistscontroller.deleteArtist);

export default router;
