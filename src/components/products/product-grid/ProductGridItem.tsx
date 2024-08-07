import { Product } from "@/interfaces"
import Link from "next/link";
import { HoverImage } from "../../ui/image/HoverImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <article className="flex flex-col fade-in">
      <Link href={`/products/${product.slug}`}>
        <HoverImage
          image={`/products/${product.images.at(0)}`}
          hoverImage={`/products/${product.images.at(1)}`}
        />
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