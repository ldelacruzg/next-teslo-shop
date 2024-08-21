import { getOrderById } from "@/actions";
import { OrderCardProducts, Summary, Title } from "@/components";
import { Address, CartProdcut, OrderSummary } from "@/interfaces";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderPage({ params }: Props) {
  const { id: orderId } = params
  const { ok, data } = await getOrderById(orderId)

  if (!ok || !data) {
    redirect('/empty')
  }

  const products: CartProdcut[] = data.items.map(prod => ({
    id: prod.id,
    image: prod.product.productImages[0].url,
    price: prod.price,
    quantity: prod.quantity,
    size: prod.size,
    slug: prod.product.slug,
    title: prod.product.title,
  }))

  const address: Address = {
    address: data.orderAddress!.address,
    city: data.orderAddress!.city,
    lastName: data.orderAddress!.lastName,
    names: data.orderAddress!.names,
    phoneNumber: data.orderAddress!.phoneNumber,
    postalCode: data.orderAddress!.postalCode,
    country: data.orderAddress?.countryId ?? '',
    address2: data.orderAddress!.address2 ?? undefined
  }

  const orderSummary: OrderSummary = {
    subtotal: data.subtotal,
    tax: data.tax,
    total: data.total,
    totalProducts: data.countItems
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full sm:w-[640px] lg:w-[1024px]">
        <Title title={`ORDER #${orderId}`} subtitle="Products to buy" />
        <div className={clsx({
          "flex items-center gap-2 bg-red-500 p-2 text-white font-bold rounded": !data.isPaid,
          "flex items-center gap-2 bg-green-500 p-2 text-white font-bold rounded": data.isPaid
        })}>
          <IoCardOutline size={25} />
          {data.isPaid ? "Paid" : "Not payed"}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <OrderCardProducts products={products} />
          <hr className="my-4 bg-gray-600 lg:hidden" />
          <Summary address={address} orderSummary={orderSummary} />
        </div>
      </div>
    </div>
  );
}