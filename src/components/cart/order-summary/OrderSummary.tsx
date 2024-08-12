"use client";

import { useHydrated } from "@/hook/useHydrated";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link"
import { OrderSummarySkeleton } from "./OrderSummarySkeleton";

interface Props {
  children?: React.ReactNode;
  link?: {
    title: string;
    href: string;
  }
}

export const OrderSummary = ({ children, link }: Props) => {
  const { isHydrated } = useHydrated()
  const { subtotal, tax, total, totalProducts } = useCartStore(state => state.getOrderSummary())

  if (!isHydrated) {
    return <OrderSummarySkeleton />
  }

  return (
    <div className="flex flex-col gap-6 rounded-md lg:shadow-gray-300 lg:shadow-xl lg:p-6 lg:h-min">
      {children}
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
          <Link
            href={link.href}
            type="button"
            className="bg-blue-600 text-white text-center font-bold py-2 rounded mt-6">
            {link.title}
          </Link>
        )
      }
    </div>
  )
}