"use client";

import { useHydrated } from "@/hook/useHydrated";
import { useCartStore } from "@/store"
import { ProductsInCartSkeleton } from "./ProductsInCartSkeleton";
import Image from "next/image";
import { ProductImage } from "@/components";

export const ProductsInCartSummary = () => {
  const { isHydrated } = useHydrated()
  const products = useCartStore(state => state.cart)

  if (!isHydrated) {
    return <ProductsInCartSkeleton />
  }

  return (
    <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
      {
        products.map(product => (
          <article key={product.slug + product.size} className="grid grid-cols-4 gap-2 sm:gap-0 lg:max-w-xl">
            <div className="flex items-center justify-start">
              <ProductImage
                src={product.image}
                alt={product.title}
                width={100} height={100} />
            </div>
            <div className="flex flex-col col-span-2">
              <span className="font-semibold">{product.title}</span>
              <span>Size: {product.size}</span>
              <span>Quantity: {product.quantity}</span>
            </div>
            <div className="flex flex-col items-end">
              <span>$ {product.price} x {product.quantity}</span>
              <span className="font-bold">$ {product.price * product.quantity}</span>
            </div>
          </article>
        ))
      }
    </div>
  )
}