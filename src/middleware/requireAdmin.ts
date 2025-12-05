import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) return res.status(403).json({ error: "Invalid token" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
