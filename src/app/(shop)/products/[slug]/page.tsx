import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

const products = initialData.products;

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const product = products.find(p => p.slug === slug)

  if (!product) notFound()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-5">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow className="sm:hidden -m-4" images={product.images} title={product.title} />

        {/* Desktop Slideshow */}
        <ProductSlideshow className="hidden sm:block" images={product.images} title={product.title} />
      </div>
      <div className="flex flex-col gap-6 p-2">
        <div className="flex flex-col">
          <h1 className={`text-xl font-semibold sm:text-3xl`}>{product.title}</h1>
          <span className="font-semibold">{product.price} €</span>
        </div>

        <SizeSelector sizes={product.sizes} selectedSize={product.sizes[0]} />
        <QuantitySelector />

        <button
          type="button"
          className="px-10 py-2 bg-blue-600 text-white font-semibold lg:w-[320px] rounded text-sm hover:bg-blue-800">
          Add cart
        </button>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Description</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}