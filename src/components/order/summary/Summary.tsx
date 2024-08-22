import { PayPalButton } from "@/components/paypal/PayPalButton";
import { Address, OrderSummary } from "@/interfaces"
import { currencyFormat } from "@/utils";

interface Props {
  orderId: string;
  isPaid: boolean;
  address: Address;
  orderSummary: OrderSummary;
}

export const Summary = ({ address, orderSummary, orderId, isPaid }: Props) => {
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
          <p>{orderSummary.totalProducts}</p>
        </div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currencyFormat(orderSummary.subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax 15%</p>
          <p>{currencyFormat(orderSummary.tax)}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>{currencyFormat(orderSummary.total)}</p>
        </div>
      </section>

      {
        !isPaid
          ? (<PayPalButton orderId={orderId} amount={orderSummary.total} />)
          : <></>
      }
    </div>
  )
}