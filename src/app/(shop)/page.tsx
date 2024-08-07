export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function HomePage({ searchParams }: Props) {
  const isPageInvalid = searchParams.page && isNaN(Number(searchParams.page))
  if (isPageInvalid) redirect('/')

  const page = Number(searchParams.page) || 1
  const { products, totalPages } = await getPaginatedProductsWithImages({ page })
  if (products.length <= 0) redirect('/') //! Posiblemente un bucle infinito

  return (
    <>
      <Title title="ALL PRODUCTS" subtitle="Best Sellers" />
      <Pagination totalPages={totalPages} />
      <ProductGrid products={products} />
    </>
  );
}
