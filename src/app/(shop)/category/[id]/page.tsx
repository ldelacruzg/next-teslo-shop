import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  }
}

const categories = ['men', 'women', 'kid']
const products = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params

  // if (!categories.includes(id)) {
  //   notFound()
  // }

  const filteredProducts = products.filter(p => p.gender === id)

  return (
    <>
      <Title title={id.toUpperCase()} subtitle="All products" />
      <ProductGrid products={filteredProducts} />
    </>
  );
}