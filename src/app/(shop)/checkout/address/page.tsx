import { getUserAddress } from '@/actions/address/get-address';
import { getCountries } from '@/actions/country/get-countries';
import { AddressForm, Title } from '@/components';
import { auth } from '@/auth.config';
import { Address } from '@/interfaces';

export default async function CheckoutAddressPage() {
  const session = await auth()
  const countries = await getCountries()
  const userAddress = await getUserAddress(session?.user.id!)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center">
      <div className="w-full  xl:w-[1024px] flex flex-col justify-center text-left">
        <Title title="ADDRESS" subtitle="Delivery address" />
        <AddressForm countries={countries} initialUserAddress={userAddress} />
      </div>
    </div>
  );
}