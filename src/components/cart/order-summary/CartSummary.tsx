"use client";

import { useHydrated } from "@/hook/useHydrated";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { OrderSummarySkeleton } from "./OrderSummarySkeleton";
import Link from "next/link";

export const CartSummary = () => {
  const { isHydrated } = useHydrated()
  const { subtotal, tax, total, totalProducts } = useCartStore(state => state.getOrderSummary())

  if (!isHydrated) {
    return <OrderSummarySkeleton />
  }

  return (
    <div className="flex flex-col gap-6 rounded-md lg:shadow-gray-300 lg:shadow-xl lg:p-6 lg:h-min">
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

      <Link href={'/checkout/address'} className="btn-primary text-center">
        Checkout
      </Link>
    </div>
  )
}