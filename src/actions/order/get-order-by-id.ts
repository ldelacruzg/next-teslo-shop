'use server';

import { auth } from "@/auth.config";
import { NotExistenceException, NotUserSessionException } from "@/exceptions";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth()

    if (!session?.user) {
      throw new NotUserSessionException()
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderAddress: true,
        items: {
          include: {
            product: {
              include: {
                productImages: true
              }
            }
          },
        },
      }
    })

    if (!order) {
      throw new NotExistenceException(`There is not a order with ${orderId}`)
    }

    if (session.user.role === 'user' && session.user.id !== order.userId) {
      throw new NotExistenceException(`There is not a order with ${orderId}`)
    }

    return {
      ok: true,
      data: order,
      message: "Success"
    }
  } catch (error) {
    if (error instanceof NotUserSessionException) {
      return {
        ok: false,
        data: null,
        message: error.message
      }
    }

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
      message: "Unknown Error"
    }
  }
}