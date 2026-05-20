import express from "express";
import {
  addToWatchlist,
  deleteFromWatchlist,
  getWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all watchlist routes

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.delete("/:id", deleteFromWatchlist);
router.put("/:id", updateWatchlistItem); // Allow updating the watchlist item as well (e.g., changing status, rating, notes)
router.get("/", getWatchlist); // Get the user's watchlist

export default router;
