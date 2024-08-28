'use server';

import { ProductImage } from "@/interfaces";
import { cloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeProductImage = async (image: ProductImage) => {
  try {
    if (!image.url.startsWith('https')) {
      return {
        ok: false,
        data: null,
        message: 'Cannot delete images from file system'
      }
    }

    const productImageDeleted = await prisma.$transaction(async tx => {
      const product = await tx.productImage.delete({
        where: { id: image.id },
        include: {
          product: {
            select: {
              slug: true
            }
          }
        }
      })

      const imageIdCloudinary = image.url.split('/').at(-1)?.split('.').at(0)
      await cloudinary.uploader.destroy(`products/${imageIdCloudinary}`)

      return product
    })

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/products/${productImageDeleted.product.slug}`)
    revalidatePath(`/products/${productImageDeleted.product.slug}`)

    return {
      ok: true,
      data: productImageDeleted,
      message: 'Product image deleted'
    }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      data: null,
      message: 'Unknown Error'
    }
  }
}
