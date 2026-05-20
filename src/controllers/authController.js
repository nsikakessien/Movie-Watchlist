import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  const token = generateToken(user.id, res);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { user: { id: user.id, name: user.name, email: user.email }, token },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  // generate JWT token
  const token = generateToken(user.id, res);

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: { user: { id: user.id, name: user.name, email: user.email }, token },
  });
};

const logout = (req, res) => {
  res.clearCookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export { register, login, logout };
