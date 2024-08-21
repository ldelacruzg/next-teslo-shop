'use server';

import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              include: {
                productImages: true
              }
            }
          },
        },
        orderAddress: true
      }
    })

    return {
      ok: true,
      data: order,
      message: "Success"
    }
  } catch (error) {
    return {
      ok: false,
      data: null,
      message: `Error get order with id ${orderId}`
    }
  }
}