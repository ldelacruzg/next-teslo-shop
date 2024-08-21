'use server';

import { auth } from "@/auth.config";
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Prisma, Size } from "@prisma/client";

interface ProductToOrder {
  id: string;
  quantity: number;
  size: Size;
}

export const preorder = async (itemsToOrder: ProductToOrder[], address: Address) => {
  const session = await auth()
  const userId = session?.user.id
  const productIds = new Set(itemsToOrder.map(p => p.id))

  if (!userId) {
    throw new Error("There in not user session")
  }

  try {
    // obtener los productos
    const products = await prisma.product.findMany({
      where: { id: { in: Array.from(productIds) } }
    })

    if (products.length !== productIds.size) {
      throw new Error("There are one or more products that do not exist")
    }

    // juntar los productos con el precio
    const productsWithPrice = itemsToOrder.map(({ id, ...product }) => ({
      ...product,
      productId: id,
      price: products.find(p => p.id === id)!.price
    }))

    const countItems = itemsToOrder.reduce(
      (prevValue, currValue) =>
        prevValue + currValue.quantity, 0
    )

    const subtotal = productsWithPrice.reduce(
      (prevValue, currValue) =>
        currValue.quantity * currValue.price! + prevValue, 0
    )

    const tax = subtotal * 0.15

    const { country, address2, ...restAddress } = address

    // crear orden y actualizar stock
    const newOrder = await prisma.$transaction(async (tx) => {
      const saveOrder: Prisma.OrderCreateArgs = {
        data: {
          countItems: countItems,
          isPaid: false,
          subtotal: subtotal,
          tax: tax,
          total: subtotal + tax,
          items: {
            createMany: {
              data: productsWithPrice
            }
          },
          orderAddress: {
            create: {
              ...restAddress,
              countryId: country,
              address2: address2
            }
          },
          userId: userId,
        }
      }

      // actualizar stock
      const updatedInStock = products.map(async p => {
        const quantity = itemsToOrder
          .filter(prod => prod.id === p.id)
          .reduce((prevValue, currValue) => prevValue + currValue.quantity, 0)

        return tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              decrement: quantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedInStock)
      const isNegativeStock = updatedProducts.some(p => p.inStock < 0)

      if (isNegativeStock) {
        throw new Error("Some products exceed the stock limit")
      }

      return await tx.order.create(saveOrder)
    })

    return {
      ok: true,
      data: newOrder,
      message: "Pre-order registered"
    }
  } catch (error: any) {
    console.log({ error: error.message })
    return {
      ok: false,
      data: null,
      message: error.message
    }
  }
}