import express from "express";
import cors from "cors";
import { connectDB } from "../config/db.js";

import movieRoutes from "../routes/movieRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import watchlistRoutes from "../routes/watchlistRoutes.js";

const app = express();

// Connect DB
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://movie-watchlist-seven-puce.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

export default app;
