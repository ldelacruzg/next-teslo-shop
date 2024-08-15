import { AddressForm, Title } from '@/components';

export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center">
      <div className="w-full  xl:w-[1024px] flex flex-col justify-center text-left">
        <Title title="ADDRESS" subtitle="Delivery address" />
        <AddressForm />
      </div>
    </div>
  );
}