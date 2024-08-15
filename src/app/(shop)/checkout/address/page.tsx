import { getCountries } from '@/actions/country/get-countries';
import { AddressForm, Title } from '@/components';

export default async function CheckoutAddressPage() {
  const countries = await getCountries()

  return (
    <div className="flex flex-col sm:justify-center sm:items-center">
      <div className="w-full  xl:w-[1024px] flex flex-col justify-center text-left">
        <Title title="ADDRESS" subtitle="Delivery address" />
        <AddressForm countries={countries} />
      </div>
    </div>
  );
}