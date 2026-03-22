import { OptOut } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

export async function findOptOutByPhoneNumber(
  phoneNumber: string
): Promise<OptOut | null> {
  return prisma.optOut.findUnique({
    where: {
      phoneNumber
    }
  });
}

export async function createOrUpdateOptOut(
  phoneNumber: string,
  reason: string
): Promise<OptOut> {
  return prisma.optOut.upsert({
    where: {
      phoneNumber
    },
    update: {
      reason
    },
    create: {
      phoneNumber,
      reason
    }
  });
}
