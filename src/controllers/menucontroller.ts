import { Request, Response } from "express";
import Menu from "../models/model.menu";

// GET ALL MENU ITEMS
export const getAllMenu = async (req: Request, res: Response) => {
  try {
    const menu = await Menu.findAll({
      order: [["order", "ASC"]],
    });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};

// GET MENU ITEM BY ID
export const getMenuById = async (req: Request, res: Response) => {
  try {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Menu item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

// CREATE MENU ITEM (ADMIN)
export const createMenu = async (req: Request, res: Response) => {
  try {
    const item = await Menu.create(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

// UPDATE MENU ITEM (ADMIN)
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Menu item not found" });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// DELETE MENU ITEM (ADMIN)
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const item = await Menu.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Menu item not found" });

    await item.destroy();
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
