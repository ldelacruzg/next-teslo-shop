export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: Gender;
  },
  searchParams: {
    page?: string;
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { gender } = params

  // fetch data
  const title = gender[0].toUpperCase().concat(gender.substring(1))
  const description = `Clothes for ${gender}`

  return {
    title, description,
    openGraph: {
      title, description
    }
  }
}

const { genders } = initialData;

export default async function CategoryPage({ params, searchParams }: Props) {
  // Valid gender param
  const { gender } = params
  if (!genders.includes(gender)) notFound()

  // Valid page query
  const isPageInvalid = searchParams.page && isNaN(Number(searchParams.page))
  if (isPageInvalid) redirect('/')

  const page = Number(searchParams.page) || 1
  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ gender, page })
  if (products.length <= 0) redirect('/') //! Posiblemente un bucle infinito

  return (
    <>
      <Title title={gender.toUpperCase()} subtitle="All products" />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
      <ProductGrid products={products} />
    </>
  );
}