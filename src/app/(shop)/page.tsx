import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

export default function HomePage() {
  return (
    <>
      <Title title="Hombre" subtitle="Best Sellers" />
      <ProductGrid products={initialData.products} />
    </>
  );
}
