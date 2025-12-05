import { Request, Response } from "express";
import Artist from "../models/model.artist";

// GET ALL ARTISTS
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artists" });
  }
};

// GET ARTIST BY ID
export const getArtistById = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artist" });
  }
};

// CREATE ARTIST (ADMIN)
export const createArtist = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;

    const artist = await Artist.create({
      name,
      description,
      image: image || null
    });

    res.json(artist);
  } catch (error) {
    console.error("CREATE ARTIST ERROR:", error);
    res.status(500).json({ error: "Failed to create artist" });
  }
};

// UPDATE ARTIST (ADMIN)
export const updateArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    const { name, description, image } = req.body;

    await artist.update({
      name: name ?? artist.name,
      description: description ?? artist.description,
      image: image ?? artist.image
    });

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to update artist" });
  }
};

// DELETE ARTIST (ADMIN)
export const deleteArtist = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    await artist.destroy();
    res.json({ message: "Artist deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete artist" });
  }
};
