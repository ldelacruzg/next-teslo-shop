import { CartStaticItem, DeliveryAddress, OrderSummary, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { IoCardOutline } from "react-icons/io5";

const products = initialData.products.slice(0, 3).map(p => ({ ...p, id: p.slug }))

interface Props {
  params: {
    id: string;
  }
}

export default function OrderPage({ params }: Props) {
  const { id: orderId } = params

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full sm:w-[640px] lg:w-[1024px]">
        <Title title={`ORDER #${orderId}`} subtitle="Products to buy" />
        <div className="flex items-center gap-2 bg-red-500 p-2 text-white font-bold rounded">
          <IoCardOutline size={25} />
          Not payed
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
            {
              products.map(product => (
                <CartStaticItem key={product.slug} product={product} />
              ))
            }
          </div>
          <hr className="my-4 bg-gray-600 lg:hidden" />
          <OrderSummary>
            <DeliveryAddress />
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}