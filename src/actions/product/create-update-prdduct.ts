'use server';

import { Size } from '@/interfaces';
import prisma from '@/lib/prisma';
import { Gender, Product } from '@prisma/client';
import { z, ZodError } from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  description: z.string(),
  inStock: z.coerce.number().min(0).int(),
  price: z.coerce.number().min(0).transform(val => val.toFixed(2)),
  sizes: z.coerce.string().min(1).transform(val => val.split(',')),
  slug: z.string(),
  tags: z.string(),
  categoryId: z.string().uuid(),
  gender: z.nativeEnum(Gender)
})

export const createUpdateProduct = async (formData: FormData) => {
  try {
    const formProduct = Object.fromEntries(formData)
    const { success, data, error } = productSchema.safeParse(formProduct)

    if (!success) throw error

    const { id, ...productValid } = data

    const product = await prisma.$transaction(async tx => {
      let product: Product

      const tags = productValid.tags
        .split(',')
        .map(tag => tag.trim().toLocaleLowerCase())

      const sizes = productValid.sizes as Size[]
      const price = Number(productValid.price)

      if (id) {
        // update product
        product = await tx.product.update({
          where: { id },
          data: {
            ...productValid,
            sizes: { set: sizes },
            tags: { set: tags },
            price,
          }
        })
      } else {
        // create product
        product = await tx.product.create({
          data: {
            ...productValid,
            sizes: { set: sizes },
            tags: { set: tags },
            price,
          }
        })
      }

      return product
    })


    console.log(product)
    return {
      ok: true,
      data: product,
      message: 'Product updated or created'
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const { errors } = error
      const errorList = errors.map(e => `${e.path}: ${e.message}`)
      return {
        ok: false,
        data: null,
        message: 'Validation Error',
        errors: errorList
      }
    }

    return {
      ok: false,
      data: null,
      message: 'Unknown Error'
    }
  }
}
