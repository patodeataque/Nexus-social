// src/lib/prisma.ts
import { PrismaClient } from "../generated/client"; // Use "@prisma/client" se não tiver mudado o output

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// MUDANÇA AQUI: export const em vez de export default
export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;