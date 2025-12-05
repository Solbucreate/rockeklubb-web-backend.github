import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder
} from "../controllers/orderscontroller";

const router = Router();

// --------------------------------------------------
// GET all orders
// --------------------------------------------------
router.get("/", getAllOrders);

// --------------------------------------------------
// GET order by ID
// --------------------------------------------------
router.get("/:id", getOrderById);

// --------------------------------------------------
// CREATE order
// --------------------------------------------------
router.post("/", createOrder);

// --------------------------------------------------
// DELETE order
// --------------------------------------------------
router.delete("/:id", deleteOrder);

export default router;
