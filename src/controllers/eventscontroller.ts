import { Request, Response } from "express";
import Event from "../models/model.event";

export const getAllEvents = async (_req: Request, res: Response) => {
  const events = await Event.findAll({ order: [["date", "ASC"]] });
  res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: "Not found" });
  res.json(event);
};

export const createEvent = async (req: Request, res: Response) => {
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const event = await Event.create({
    ...req.body,
    image
  });

  res.json(event);
};

export const updateEvent = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: "Not found" });

  const image = req.file ? `/uploads/${req.file.filename}` : event.image;

  await event.update({
    ...req.body,
    image
  });

  res.json(event);
};

export const deleteEvent = async (req: Request, res: Response) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ error: "Not found" });

  await event.destroy();
  res.json({ message: "Deleted" });
};
