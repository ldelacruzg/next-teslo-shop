'use server';

import { NotExistenceException } from "@/exceptions";
import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } })

    if (!order) {
      throw new NotExistenceException()
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    return {
      ok: true,
      data: null,
      message: "Transaction id updated"
    }
  } catch (error) {
    if (error instanceof NotExistenceException) {
      return {
        ok: false,
        data: null,
        message: error.message
      }
    }

    return {
      ok: false,
      data: null,
      message: 'Unknown Error'
    }
  }
}