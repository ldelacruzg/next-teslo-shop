'use server';

import { Gender, Product } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Pagination {
  page?: number;
  limit?: number;
  gender?: Gender
}

interface PaginationResult {
  currentPage: number;
  products: Product[];
  totalCount: number;
  totalPages: number;
}

export const getPaginatedProductsWithImages = async ({ limit = 12, page = 1, gender }: Pagination): Promise<PaginationResult> => {
  try {
    const [totalCount, products] = await Promise.all([
      prisma.product.count({
        where: { gender }
      }),
      prisma.product.findMany({
        take: limit,
        skip: limit * (page - 1),
        where: { gender },
        include: {
          productImages: {
            select: { url: true }
          }
        }
      })
    ])

    const productsAdapter = products.map(({ productImages, categoryId, ...product }) => {
      return {
        ...product,
        images: productImages.map(image => image.url),
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return {
      currentPage: page,
      products: productsAdapter,
      totalCount: totalCount,
      totalPages: totalPages,
    }
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo traer los productos')
  }
}