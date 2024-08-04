import Image from "next/image"
import { Product } from "@/interfaces"

interface Props {
  product: Product;
}

export const CartStaticItem = ({ product }: Props) => {
  return (
    <article key={product.slug} className="grid grid-cols-4 gap-2 sm:gap-0 lg:max-w-xl">
      <div className="flex items-center justify-start">
        <Image priority src={`/products/${product.images[0]}`} alt={"product..."} width={100} height={100} />
      </div>
      <div className="flex flex-col col-span-2">
        <span className="font-semibold">{product.title}</span>
        <span>Size: M</span>
        <span>Quantity: 1</span>
      </div>
      <div className="flex flex-col items-end">
        <span>$ {product.price} x 1</span>
        <span className="font-bold">$ {product.price * 1}</span>
      </div>
    </article>
  )
}