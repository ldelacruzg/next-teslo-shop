"use client";

import { useAddressStore } from "@/store";

export const DeliveryAddress = () => {
  const address = useAddressStore(state => state.address)

  return (
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
  )
}