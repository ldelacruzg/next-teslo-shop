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
  const title = slug === 'new' ? 'NEW PRODUCT' : 'EDIT PRODUCT'
  const categories = await getCategories()

  if (slug === 'new') {
    return (
      <>
        <Title title={title} />
        <ProductForm product={{}} categories={categories ?? []} />
      </>
    )
  }

  const product = await getProductBySlug(slug)
  if (!product) redirect('/admin/products')

  return (
    <>
      <Title title={title} />
      <ProductForm product={product} categories={categories ?? []} />
    </>
  );
}