"use client";

import { useState } from "react";
import type { CartProdcut, Product, Size } from "@/interfaces"
import { QuantitySelector, SizeSelector } from "@/components"
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCard = ({ product }: Props) => {
  const [size, setSize] = useState<Size>(product.sizes[0])
  const [quantity, setQuantity] = useState<number>(1)
  const addProdcutToCart = useCartStore(state => state.addProdcutToCart)

  const onAddToCart = () => {
    const productToCart: CartProdcut = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      title: product.title
    }

    addProdcutToCart(productToCart)
  }

  return (
    <>
      <SizeSelector
        sizes={product.sizes}
        selectedSize={size}
        onSizeChange={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button
        type="button"
        onClick={onAddToCart}
        className="px-10 py-2 bg-blue-600 text-white font-semibold lg:w-[320px] rounded text-sm hover:bg-blue-800">
        Add cart
      </button>
    </>
  )
}