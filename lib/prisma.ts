import { PrismaClient } from "@prisma/client";

const Prismaclient = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
type Prismaclient = ReturnType<typeof Prismaclient>;

const prisma = globalForPrisma.prisma ?? Prismaclient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
