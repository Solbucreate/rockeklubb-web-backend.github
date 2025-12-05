import { Request, Response } from "express";

// midlertidig lagring i minne (til vi legger inn sequelize model)
let messages: any[] = [];

// PUBLIC – bruk av kontaktskjema
export const sendMessage = (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newMsg = {
      id: messages.length + 1,
      name,
      email,
      message,
      createdAt: new Date()
    };

    messages.push(newMsg);

    return res.json({
      success: true,
      message: "Message received",
      data: newMsg
    });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// ADMIN – hent alle meldinger
export const getMessages = (req: Request, res: Response) => {
  return res.json(messages);
};
