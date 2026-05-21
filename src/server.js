import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// import routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

// Enable CORS middleware properly
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://movie-watchlist-seven-puce.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to lazily verify or establish database connection per execution loop
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error);
    res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }
});

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Catch-all route to prevent standard root routing 404s on the Vercel Domain dashboard
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Watchlist API is live and running smoothly!" });
});

// Run local development server setup safely out of serverless paths
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

export default app;
