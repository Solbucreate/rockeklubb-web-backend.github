import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./src/config/db";

// ROUTES
import authRoutes from "./src/routes/route.auth";
import bandRoutes from "./src/routes/route.bands";
import eventRoutes from "./src/routes/route.events";
import menuRoutes from "./src/routes/route.menu";
import orderRoutes from "./src/routes/route.orders";
import ticketRoutes from "./src/routes/route.tickets";
import userRoutes from "./src/routes/route.users";
import settingsRoutes from "./src/routes/route.settings";
import contactRoutes from "./src/routes/route.contact";
import artistsRoutes from "./src/routes/route.artists";
import pagesRoutes from "./src/routes/route.pages";

import { createAdmin } from "./src/controllers/authcontroller";

const app = express();

// -------------------------------------
// MIDDLEWARE
// -------------------------------------
app.use(cors());
app.use(express.json());

// -------------------------------------
// BASIC ROOT ROUTE (for testing Render)
// -------------------------------------
app.get("/", (req, res) => {
  res.send("🚀 Larvik Rockeklubb Backend is running!");
});

// -------------------------------------
// ROUTES REGISTER
// -------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/bands", bandRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/artists", artistsRoutes);
app.use("/api/pages", pagesRoutes);

// -------------------------------------
// DATABASE CONNECT + SYNC
// -------------------------------------
sequelize
  .authenticate()
  .then(() => {
    console.log("✔ Database connected");
  })
  .catch((err) => console.error("❌ DB ERROR:", err));

sequelize
  .sync()
  .then(() => {
    console.log("✔ Tables synced");
    createAdmin(); // Create default admin if missing
  })
  .catch((err) => console.error("❌ SYNC ERROR:", err));

// -------------------------------------
// START SERVER
// -------------------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
