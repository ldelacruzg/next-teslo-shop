"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { useState } from "react";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()
  const roundedAmount = Math.round(amount * 100) / 100
  const [errorMessage, setErrorMessage] = useState<string>()

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-64 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-64 h-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    )
  }

  const onCreateOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    setErrorMessage(undefined)
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD'
          }
        }
      ],
      intent: "CAPTURE"
    })

    const { ok, message } = await setTransactionId(orderId, transactionId)
    if (!ok) setErrorMessage(message)

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return

    const { ok, message } = await paypalCheckPayment(details.id!)
    if (!ok) setErrorMessage(message)
  }

  return (
    <>
      {errorMessage ? <p className="text-red-500"></p> : <></>}
      <PayPalButtons
        className="z-0"
        createOrder={onCreateOrder}
        onApprove={onApprove}
      />
    </>
  )
}