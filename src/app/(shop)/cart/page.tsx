import { CartItem, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const products = initialData.products.slice(0, 3)

export default function CartPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full sm:w-[640px] lg:w-[1024px]">
        <Title title="CART" subtitle="Products to buy" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8">
            {
              products.map(product => (
                <CartItem key={product.slug} product={product} />
              ))
            }
          </div>
          <hr className="my-4 bg-gray-600 lg:hidden" />
          <div className="flex flex-col gap-3 rounded-md lg:shadow-gray-300 lg:shadow-xl lg:p-6 lg:h-min">
            <span className="font-bold text-xl">Orden Summary</span>
            <div className="flex justify-between font-light">
              <span>No. Products</span>
              <span>3</span>
            </div>
            <div className="flex justify-between font-light">
              <span>Subtotal</span>
              <span>$ 540</span>
            </div>
            <div className="flex justify-between font-light">
              <span>Tax 15%</span>
              <span>$ 81</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>$ 621</span>
            </div>
            <Link
              href={'/checkout/address'}
              type="button"
              className="bg-blue-600 text-white text-center font-bold py-2 rounded mt-6">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}