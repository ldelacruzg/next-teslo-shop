"use server";

import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    await new Promise((resolver) => setTimeout(resolver, 2000))
    const product = await prisma.product.findUnique({ where: { slug } })
    if (!product) throw new Error('Not found product')

    return product.inStock;
  } catch (error) {
    console.log(error)
    return 0
  }
}
