"use client";

import { useHydrated } from "@/hook/useHydrated";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { OrderSummarySkeleton } from "./OrderSummarySkeleton";
import { useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";

interface Props {
  link?: {
    title: string;
    href: string;
  },
}

export const OrderSummary = ({ link }: Props) => {
  const { isHydrated } = useHydrated()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const { subtotal, tax, total, totalProducts } = useCartStore(state => state.getOrderSummary())
  const address = useAddressStore(state => state.address)
  const products = useCartStore(state => state.cart)
  const { data: session } = useSession()

  if (!isHydrated) {
    return <OrderSummarySkeleton />
  }

  const onPreOrder = async () => {
    setIsPlacingOrder(true)

    const productToOrder = products.map(({ id, quantity, size }) => ({ id, quantity, size }))
    console.log({ productToOrder })

    await new Promise((resolver) => setTimeout(resolver, 1000))

    setIsPlacingOrder(false)
  }

  return (
    <div className="flex flex-col gap-6 rounded-md lg:shadow-gray-300 lg:shadow-xl lg:p-6 lg:h-min">
      <section className="flex flex-col gap-2 font-light">
        <h3 className="font-bold text-xl">Delivery Address</h3>
        <div className="flex flex-col justify-between gap-2">
          <p><span className="font-semibold">Full Name:</span> {address.names} {address.lastName}</p>
          <p><span className="font-semibold">Address 1:</span> {address.address}</p>
          <p><span className="font-semibold">Address 2:</span> {address.address2 !== '' ? address.address2 : "N/A"}</p>
          <p><span className="font-semibold">Postal Code:</span> {address.postalCode}</p>
          <p><span className="font-semibold">City:</span> {address.city}</p>
          <p><span className="font-semibold">Phone Number:</span> {address.phoneNumber}</p>
        </div>
      </section>

      <section className="flex flex-col font-light gap-2">
        <h3 className="font-bold text-xl">Orden Summary</h3>
        <div className="flex justify-between">
          <p>No. Products</p>
          <p>{totalProducts}</p>
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currencyFormat(subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax 15%</p>
          <p>{currencyFormat(tax)}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>{currencyFormat(total)}</p>
        </div>
      </section>

      {
        link && (
          <button
            type="button"
            onClick={onPreOrder}
            disabled={isPlacingOrder}
            className={clsx({
              "btn-primary": !isPlacingOrder,
              "btn-disabled": isPlacingOrder
            })}>
            {link.title}
          </button>
        )
      }
    </div>
  )
}