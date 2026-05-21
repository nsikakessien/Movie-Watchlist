import express from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/db.js";

// import routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

// Initialize DB connection
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://movie-watchlist-seven-puce.vercel.app",
    ],
    credentials: true, // Essential for transferring the 'jwt' cookie
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// ✅ FIXED: Only invoke listen if we are NOT on Vercel serverless platform
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}

// Handle unhandled promise rejections and uncaught exceptions
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Always export the app instance so Vercel can convert it into a serverless handler
export default app;
