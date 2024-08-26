import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { ProductForm } from "@/components/product/product-form/ProductForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  if (!product) redirect('/admin/products')

  const title = slug === 'new' ? 'New product' : 'Edit product'

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories ?? []} />
    </>
  );
}