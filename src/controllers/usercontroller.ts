import { Request, Response } from "express";
import User from "../models/model.user";
import bcrypt from "bcryptjs";

// GET ALL USERS (ADMIN)
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

// GET USER BY ID (ADMIN)
export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
};

// CREATE USER (ADMIN)
export const createUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
    role: role || "user"
  });

  res.json(user);
};

// UPDATE USER (ADMIN)
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  const { username, password, role } = req.body;

  await user?.update({
    username,
    password: password ? await bcrypt.hash(password, 10) : user.password,
    role
  });

  res.json(user);
};

// DELETE USER (ADMIN)
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  await user?.destroy();
  res.json({ message: "Deleted" });
};
