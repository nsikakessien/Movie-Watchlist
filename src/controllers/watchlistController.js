import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // verify movie exists in the database
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ success: false, error: "Movie not found" });
  }

  // check if the movie is already in the user's watchlist
  const existingEntry = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingEntry) {
    return res
      .status(400)
      .json({ success: false, error: "Movie is already in the watchlist" });
  }

  // add the movie to the user's watchlist
  const newEntry = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({ success: true, data: newEntry });
};

const deleteFromWatchlist = async (req, res) => {
  const { id } = req.params;

  // verify the watchlist item exists and belongs to the user
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!watchlistItem || watchlistItem.userId !== req.user.id) {
    return res
      .status(404)
      .json({ success: false, error: "Watchlist item not found" });
  }

  // delete the watchlist item
  await prisma.watchlistItem.delete({
    where: { id },
  });

  res
    .status(200)
    .json({ success: true, message: "Movie removed from watchlist" });
};

const updateWatchlistItem = async (req, res) => {
  const { id } = req.params;
  const { status, rating, notes } = req.body;
  // verify the watchlist item exists and belongs to the user
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!watchlistItem || watchlistItem.userId !== req.user.id) {
    return res
      .status(404)
      .json({ success: false, error: "Watchlist item not found" });
  }

  // update the watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id },
    data: {
      status,
      rating,
      notes,
    },
  });

  res.status(200).json({ success: true, data: updatedItem });
};

const getWatchlist = async (req, res) => {
  const watchlist = await prisma.watchlistItem.findMany({
    where: { userId: req.user.id },
  });

  res.status(200).json({ success: true, data: watchlist });
};

export {
  addToWatchlist,
  deleteFromWatchlist,
  updateWatchlistItem,
  getWatchlist,
};
