import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/profile", profileRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    ssl: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
