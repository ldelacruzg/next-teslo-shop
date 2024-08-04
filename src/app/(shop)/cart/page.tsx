import { redirect } from "next/navigation";
import { CartItem, OrderSummary, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products.slice(0, 3)

export default function CartPage() {

  if (products.length <= 0) {
    redirect('/empty')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full sm:w-[640px] lg:w-[1024px]">
        <Title title="CART" subtitle="Products to buy" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
            {
              products.map(product => (
                <CartItem key={product.slug} product={product} />
              ))
            }
          </div>
          <hr className="my-4 bg-gray-600 lg:hidden" />
          <OrderSummary link={{ title: 'Checkout', href: '/checkout/address' }} />
        </div>
      </div>
    </div>
  );
}