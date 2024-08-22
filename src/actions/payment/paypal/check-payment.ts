'use server';

import { PayPalOrderStatusException, PaypalUnauthrorizeException } from "@/exceptions";
import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  try {
    const authToken = await getPaypalBearerToken()
    if (!authToken) throw new PaypalUnauthrorizeException()

    const orderStatus = await verifyPaypalPayment(transactionId, authToken)
    if (!orderStatus) throw new PayPalOrderStatusException()

    const { status, purchase_units } = orderStatus
    const { invoice_id: orderId } = purchase_units[0]

    if (status !== 'COMPLETED') {
      return {
        ok: false,
        data: null,
        message: `Order ${orderId} without payment`
      }
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() }
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      data: order,
      message: 'Paid order'
    }
  } catch (error) {
    if (
      error instanceof PaypalUnauthrorizeException ||
      error instanceof PayPalOrderStatusException
    ) {
      return {
        ok: false,
        data: null,
        message: error.message
      }
    }

    return {
      ok: false,
      data: null,
      message: 'Unknow Error'
    }
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const paypalSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET
  const request = process.env.NEXT_PUBLIC_PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer
    .from(`${paypalClientId}:${paypalSecret}`, 'utf-8')
    .toString('base64')

  const urlencoded = new URLSearchParams()
  urlencoded.append("grant_type", "client_credentials")

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${base64Token}`
    },
    body: urlencoded,
  }

  try {
    const response = await fetch(request, {
      ...requestOptions,
      cache: 'no-store'
    })
    const data = await response.json()
    return data.access_token;
  } catch (error) {
    return null
  }
}

const verifyPaypalPayment = async (
  transactionId: string,
  token: string
): Promise<PayPalOrderStatusResponse | null> => {
  const request = `${process.env.NEXT_PUBLIC_PAYPAL_ORDERS_URL}/${transactionId}`
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await fetch(request, {
      ...requestOptions,
      cache: 'no-store'
    })
    return await response.json()
  } catch (error) {
    console.log(error)
    return null
  }
}