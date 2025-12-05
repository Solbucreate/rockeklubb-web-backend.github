import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
    expiresIn: "12h",
  });

  res.json({ status: "ok", token });
};
