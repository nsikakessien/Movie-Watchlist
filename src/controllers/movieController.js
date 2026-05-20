import { prisma } from "../config/db.js";

const getPaginatedMovies = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const movies = await prisma.movie.findMany({
    skip: (page - 1) * limit,
    take: parseInt(limit),
  });
  res.json({ success: true, data: movies });
};

export { getPaginatedMovies };
