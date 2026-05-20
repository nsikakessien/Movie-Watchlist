import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import dotenv from "dotenv";

// Ensure environment variables are loaded before accessing process.env
dotenv.config();

// 1. Create a pg Pool using the connection string
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Pass the pool instance into the PrismaPg adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "warn", "error"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("DB disconnected via Prisma");
  } catch (error) {
    console.error("Error disconnecting from the database:", error.message);
    process.exit(1);
  }
};

export { connectDB, disconnectDB, prisma };
