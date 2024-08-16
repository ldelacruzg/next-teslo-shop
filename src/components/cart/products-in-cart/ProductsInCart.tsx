"use client";

import Link from "next/link";
import Image from "next/image"

import { CartProdcut } from "@/interfaces"
import { useCartStore } from "@/store"
import { QuantitySelector } from "../quantity-selector/QuantitySelector";
import { currencyFormat } from "@/utils";
import { useHydrated } from "@/hook/useHydrated";
import { ProductsInCartSkeleton } from "./ProductsInCartSkeleton";
import { redirect } from "next/navigation";

export const ProductsInCart = () => {
  const { isHydrated } = useHydrated()
  const products = useCartStore(state => state.cart)
  const changeQuantityProduct = useCartStore(state => state.changeQuantityProduct)
  const removeProductToCart = useCartStore(state => state.removeProductToCart)

  if (!isHydrated) {
    return (
      <ProductsInCartSkeleton />
    )
  }

  if (products.length <= 0) {
    redirect('/empty')
  }

  const onQuantityChange = (product: CartProdcut, value: number) => {
    if (value <= 0 || value > 5) return changeQuantityProduct(product, 1)
    changeQuantityProduct(product, value)
  }

  return (
    <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
      {
        products.map(product => (
          <article key={product.slug + product.size} className="grid grid-cols-4 lg:max-w-xl">
            <div className="flex items-center justify-start">
              <Image priority src={`/products/${product.image}`} alt={product.title} width={100} height={100} />
            </div>
            <div className="flex flex-col col-span-2">
              <Link href={`/products/${product.slug}`} className="font-semibold hover:text-blue-700 transition-all">{product.title}</Link>
              <span>Size: {product.size}</span>
              <div className="flex gap-4">
                <QuantitySelector
                  qty={5}
                  seletedValue={product.quantity.toString()}
                  onValueChange={(value) => onQuantityChange(product, value)}
                />
                <button
                  type="button"
                  className="border-black border-b-[1px]"
                  onClick={() => removeProductToCart(product)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="font-bold">{currencyFormat(product.price)}</span>
            </div>
          </article>
        ))
      }
    </div>
  )
}