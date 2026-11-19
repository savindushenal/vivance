import { PrismaClient } from "@prisma/client";

// Allow builds/deploys without a configured database.
process.env.DATABASE_URL ??= "file:./dev.db";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
