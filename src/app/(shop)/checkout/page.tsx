import { OrderSummary, ProductsInCartSummary, Title } from "@/components";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full sm:w-[640px] lg:w-[1024px]">
        <Title title="CKECK ORDER" subtitle="Products to buy" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <ProductsInCartSummary />
          <hr className="my-4 bg-gray-600 lg:hidden" />
          <OrderSummary link={{ title: "Pre-order", href: "/orders/abc" }} />
        </div>
      </div>
    </div>
  );
}