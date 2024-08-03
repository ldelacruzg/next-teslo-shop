import Image from "next/image"
import { Product } from "@/interfaces"
import { QuantitySelector } from "../quantity-selector/QuantitySelector";

interface Props {
  product: Product;
}

export const CartItem = ({ product }: Props) => {
  return (
    <article key={product.slug} className="grid grid-cols-4 lg:max-w-xl">
      <div className="flex items-center justify-start">
        <Image priority src={`/products/${product.images[0]}`} alt={"product..."} width={100} height={100} />
      </div>
      <div className="flex flex-col col-span-2">
        <span className="font-semibold">{product.title}</span>
        <span>Size: </span>
        <div className="flex gap-4">
          <QuantitySelector qty={5} />
          <button type="button" className="border-black border-b-[1px]">Remove</button>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="font-bold">$ {product.price}</span>
      </div>
    </article>
  )
}