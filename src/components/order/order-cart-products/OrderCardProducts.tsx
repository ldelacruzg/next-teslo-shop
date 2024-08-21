import { CartProdcut } from "@/interfaces";
import Image from "next/image";

interface Props {
  products: CartProdcut[]
}

export const OrderCardProducts = ({ products }: Props) => {
  return (
    <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
      {
        products.map(product => (
          <article key={product.slug + product.size} className="grid grid-cols-4 gap-2 sm:gap-0 lg:max-w-xl">
            <div className="flex items-center justify-start">
              <Image priority src={`/products/${product.image}`} alt={product.title} width={100} height={100} />
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