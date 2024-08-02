import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

export default function HomePage() {
  return (
    <>
      <Title title="ALL PRODUCTS" subtitle="Best Sellers" />
      <ProductGrid products={initialData.products} />
    </>
  );
}
