"use client";

import { Product } from "@/interfaces"
import Link from "next/link";
import { HoverImage } from "../../ui/image/HoverImage";
import { ProductImage } from "@/components";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <article className="flex flex-col fade-in">
      <Link href={`/products/${product.slug}`}>
        {
          product.images.length > 0 ?
            (
              <HoverImage
                image={`/products/${product.images.at(0)}`}
                hoverImage={`/products/${product.images.at(1)}`}
                alt={product.title}
              />
            ) :
            (
              <ProductImage alt={"Not images"} width={600} height={600} className="object-fill" />
            )
        }
      </Link>
      <Link
        href={`/products/${product.slug}`}
        className="font-bold hover:text-blue-700 transition-all">
        {product.title}
      </Link>
      <span>{product.price} €</span>
    </article>
  )
}