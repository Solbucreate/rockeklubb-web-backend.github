import { Request, Response } from "express";
import User from "../models/model.user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// -----------------------------
// LOGIN
// -----------------------------
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// -----------------------------
// CREATE FIRST ADMIN USER
// -----------------------------
export const createAdmin = async () => {
  try {
    const exists = await User.findOne({ where: { email: "admin@rock.no" } });
    if (exists) return;

    const hashed = await bcrypt.hash("Admin123", 10);

    await User.create({
      username: "admin",         // ← FIX
      email: "admin@rock.no",
      password: hashed,
      role: "admin",
    });

    console.log("✔ Default admin created: admin@rock.no / Admin123");
  } catch (err) {
    console.error("ADMIN CREATE ERROR:", err);
  }
};
