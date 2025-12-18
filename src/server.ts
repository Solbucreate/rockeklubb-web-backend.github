import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/db";

// ROUTES
import authRoutes from "./routes/route.auth";
import eventRoutes from "./routes/route.events";
import orderRoutes from "./routes/route.orders";
import ticketRoutes from "./routes/route.tickets";


import { createAdmin } from "./controllers/authcontroller";

const app = express();

// -------------------------------------
// MIDDLEWARE
// -------------------------------------
app.use(cors());
app.use(express.json());

// Opplastede bilder
app.use("/uploads", express.static("uploads"));

// -------------------------------------
// ROOT TEST
// -------------------------------------
app.get("/", (_req, res) => {
  res.send("🚀 Larvik Rockeklubb Backend is running!");
});

// -------------------------------------
// ROUTES
// -------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tickets", ticketRoutes);

// -------------------------------------
// DATABASE
// -------------------------------------
sequelize.authenticate()
  .then(() => console.log("✔ Database connected"))
  .catch((err) => console.error("❌ DB ERROR:", err));

sequelize.sync()
  .then(() => {
    console.log("✔ Tables synced");
    createAdmin();
  })
  .catch((err) => console.error("❌ SYNC ERROR:", err));

// -------------------------------------
// START SERVER
// -------------------------------------
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});