import { Title } from '@/components';
import Link from 'next/link';

export default function CheckoutAddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center">
      <div className="w-full  xl:w-[1024px] flex flex-col justify-center text-left">
        <Title title="ADDRESS" subtitle="Delivery address" />
        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Names</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last Name</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Postal Code</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select
              className="p-2 border rounded-md bg-gray-200"
            >
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Number Phone</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href='/checkout'
              className="btn-primary flex w-full sm:w-1/2 justify-center font-bold">
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}