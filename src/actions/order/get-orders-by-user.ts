'use server';

import { auth } from "@/auth.config";
import { NotUserSessionException } from "@/exceptions";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  try {
    const session = await auth()
    if (!session?.user) throw new NotUserSessionException()

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        orderAddress: true
      }
    })

    return {
      ok: true,
      data: orders,
      message: "Loaded orders"
    }
  } catch (error) {
    if (error instanceof NotUserSessionException) {
      return {
        ok: false,
        data: null,
        message: error.message
      }
    }

    return {
      ok: false,
      data: null,
      message: "Unknown error"
    }
  }
}