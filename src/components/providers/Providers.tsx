"use client";

import { PropsWithChildren } from "react"
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js"

interface Props extends PropsWithChildren { }

const payPalOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'no-client-id',
  intent: 'capture',
  currency: 'USD'
}

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={payPalOptions}>
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}