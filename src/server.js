import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

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

// ✅ FIXED: Lazily connect to the database per request instead of globally blocking file imports
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database lazy-connection middleware failure:", error);
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// ✅ Add local server support so you can still run `node server.js` or `nodemon` locally
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

export default app;
