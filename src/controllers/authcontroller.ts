import { Request, Response } from "express";
import User from "../models/model.user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------------------------------------------
// CREATE DEFAULT ADMIN (brukes ved server-oppstart)
// --------------------------------------------------
export async function createAdmin() {
  try {
    const adminExists = await User.findOne({ where: { email: "admin@rock.no" } });

    if (adminExists) {
      console.log("✔ Admin already exists");
      return;
    }

    const hashed = await bcrypt.hash("Admin123!", 10);

    await User.create({
      name: "Administrator",
      email: "admin@rock.no",
      password: hashed,
      role: "admin",
    });

    console.log("✨ Default admin created: admin@rock.no / Admin123!");

  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
}

// --------------------------------------------------
// LOGIN
// --------------------------------------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email }});
  if (!user) return res.status(401).json({ error: "Feil e-post eller passord" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Feil e-post eller passord" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "12h" }
  );

  res.json({ token });
};

// --------------------------------------------------
// VERIFY TOKEN
// --------------------------------------------------
export const verify = async (req: Request, res: Response) => {
  res.json({ valid: true });
};
