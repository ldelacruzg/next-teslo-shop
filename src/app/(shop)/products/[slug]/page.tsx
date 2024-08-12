export const revalidate = 604800 // 7 días

import { Suspense } from "react";
import { getProductBySlug } from "@/actions";
import { AddToCard, ProductMobileSlideshow, ProductSlideshow, StockLabel, StockLabelSkeleton } from "@/components";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { slug } = params

  // fetch data
  const product = await getProductBySlug(slug)
  const title = product?.title ?? 'Product not found'
  const description = product?.description ?? 'Product not found'
  const images = [
    `/products/${product?.images[1]}`
  ]

  return {
    title, description,
    metadataBase: new URL('https://7mzcs49c-3000.brs.devtunnels.ms'),
    openGraph: {
      title, description,
      images
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

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
        <Suspense fallback={<StockLabelSkeleton />}>
          <StockLabel slug={product.slug} />
        </Suspense>

        <div className="flex flex-col">
          <h1 className={`text-xl font-semibold sm:text-3xl`}>{product.title}</h1>
          <span className="font-semibold">{product.price} €</span>
        </div>

        <AddToCard product={product} />

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-sm">Description</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}