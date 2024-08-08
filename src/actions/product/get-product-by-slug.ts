"use server";

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const foundProduct = await prisma.product.findUnique({
      where: { slug },
      include: {
        productImages: {
          select: { url: true }
        }
      }
    })

    if (!foundProduct) throw new Error('Not found product')

    const { productImages, ...product } = foundProduct
    return {
      ...product,
      images: productImages.map(image => image.url)
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
