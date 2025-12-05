import { Request, Response } from "express";
import Event from "../models/model.event";

// --------------------------------------------------
// GET ALL EVENTS
// --------------------------------------------------
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// --------------------------------------------------
// GET EVENT BY ID
// --------------------------------------------------
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

// --------------------------------------------------
// CREATE EVENT
// --------------------------------------------------
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      price,
      capacity,
      ticketsAvailable
    } = req.body;

    if (!title || !description || !date || !price || !capacity || !ticketsAvailable) {
      return res.status(400).json({
        error: "title, description, date, price, capacity og ticketsAvailable er påkrevd"
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time: time || null,
      venue: venue || null,
      price,
      capacity,
      ticketsAvailable,
    });

    res.json(event);
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// --------------------------------------------------
// UPDATE EVENT
// --------------------------------------------------
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

// --------------------------------------------------
// DELETE EVENT
// --------------------------------------------------
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
