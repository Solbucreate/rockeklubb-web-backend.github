import { Request, Response } from "express";
import Ticket from "../models/model.ticket";

// --------------------------------------------------
// GET ALL TICKETS
// --------------------------------------------------
export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// --------------------------------------------------
// GET TICKET BY ID
// --------------------------------------------------
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

// --------------------------------------------------
// CREATE FULL TICKET (ONE PER PERSON)
// --------------------------------------------------
export const createTicket = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      orderId,
      qrCode,
      quantity,
      ticketid,
      price,
      email,
      name
    } = req.body;

    const ticket = await Ticket.create({
      eventId,
      orderId,
      qrCode,
      quantity,
      ticketid,
      price,
      email,
      name,
      used: false
    });

    res.json(ticket);
  } catch (error) {
    console.error("CREATE TICKET ERROR:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

// --------------------------------------------------
// UPDATE TICKET
// --------------------------------------------------
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.update(req.body);
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

// --------------------------------------------------
// DELETE TICKET
// --------------------------------------------------
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    await ticket.destroy();
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ticket" });
  }
};

// --------------------------------------------------
// VALIDATE TICKET (QR SCANNER + EVENT CHECK + USED FLAG)
// --------------------------------------------------
export const validateTicket = async (req: Request, res: Response) => {
  try {
    const { qr, eventId } = req.body;

    if (!qr) {
      return res.status(400).json({ error: "QR-kode mangler" });
    }

    if (!eventId) {
      return res.status(400).json({ error: "Event-ID mangler" });
    }

    // Finn billetten ved QR-koden
    const ticket = await Ticket.findOne({
      where: { qrCode: qr }
    });

    if (!ticket) {
      return res.status(404).json({ error: "Billett ikke funnet" });
    }

    // EVENT CHECK
    if (ticket.eventId !== Number(eventId)) {
      return res.status(400).json({
        error: "Denne billetten er for et annet arrangement!"
      });
    }

    // BRUKT-SJEKK
    if (ticket.used === true) {
      return res.status(400).json({
        error: "Billetten er allerede brukt!"
      });
    }

    // MARKER SOM BRUKT (REALTIME LOCK)
    await ticket.update({ used: true });

    return res.json({
      success: true,
      message: "Billett gyldig!",
      ticketId: ticket.ticketid,
      name: ticket.name,
      eventId: ticket.eventId
    });

  } catch (error) {
    console.error("VALIDATE ERROR:", error);
    return res.status(500).json({ error: "Validering feilet" });
  }
};
