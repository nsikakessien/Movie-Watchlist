import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// read token from request
// verify token
export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      //   select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, error: "Not authorized, token failed" });
  }
};
