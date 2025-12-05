import { Request, Response } from "express";
import Order from "../models/model.order";

// --------------------------------------------------
// GET ALL ORDERS
// --------------------------------------------------
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// --------------------------------------------------
// GET ONE ORDER BY ID
// --------------------------------------------------
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// --------------------------------------------------
// CREATE ORDER
// --------------------------------------------------
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      email,
      fullname,
      phonenumber,
      quantity,
      totalPrice
    } = req.body;

    // Basic validation
    if (!eventId || !email || !quantity || !totalPrice) {
      return res.status(400).json({
        error: "eventId, email, quantity og totalPrice er påkrevd"
      });
    }

    const order = await Order.create({
      eventId,
      email,
      fullname: fullname || null,
      phonenumber: phonenumber || null,
      quantity,
      totalPrice,
      paymentStatus: "pending"
    });

    res.json(order);
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// --------------------------------------------------
// DELETE ORDER
// --------------------------------------------------
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
