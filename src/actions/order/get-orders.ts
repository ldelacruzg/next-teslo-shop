'use server';

import { auth } from "@/auth.config";
import { NotUserSessionException, UnauthorizedException } from "@/exceptions";
import prisma from "@/lib/prisma";

interface Pagination {
  page?: number;
  limit?: number;
}

interface Options extends Pagination { }

export const getOrders = async ({ page = 1, limit = 10 }: Options) => {
  try {
    const session = await auth()
    if (!session?.user) throw new NotUserSessionException()

    if (session.user.role !== 'admin') {
      throw new UnauthorizedException()
    }

    const orders = await prisma.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { orderAddress: true }
    })

    return {
      ok: true,
      data: orders,
      message: "Loaded orders"
    }
  } catch (error) {
    if (
      error instanceof NotUserSessionException ||
      error instanceof UnauthorizedException) {
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