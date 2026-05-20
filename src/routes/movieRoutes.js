import express from "express";
import { getPaginatedMovies } from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getPaginatedMovies);

// router.post("/", (req, res) => {
//   res.json({ httpMethod: "POST", message: "Hello, World!" });
// });

// router.put("/", (req, res) => {
//   res.json({ httpMethod: "PUT", message: "Hello, World!" });
// });

// router.delete("/", (req, res) => {
//   res.json({ httpMethod: "DELETE", message: "Hello, World!" });
// });

export default router;
