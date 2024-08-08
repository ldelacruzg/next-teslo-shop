import { getStockBySlug } from "@/actions/product/get-stock-by-slug";

interface Props {
  slug: string;
}

export const StockLabel = async ({ slug }: Props) => {
  const inStock = await getStockBySlug(slug)

  return (
    <div>
      <span className="bg-green-300 px-4 py-2 rounded-md font-bold">Stock: {inStock}</span>
    </div>
  )
}