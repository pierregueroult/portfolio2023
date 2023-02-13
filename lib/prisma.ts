// ! This file is used to create a singleton instance of PrismaClient

// ? import modules
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// ? create singleton instance of PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore 7017
  if (!global.prisma) {
    // @ts-ignore 7017
    global.prisma = new PrismaClient();
  }
  // @ts-ignore 7017
  prisma = global.prisma;
}

export default prisma;
