import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
  const { data: orders, ok } = await getOrdersByUser()

  if (!ok) {
    redirect('/')
  }

  if (orders && orders.length <= 0) {
    return (
      <>
        <Title title="Orders" />
        <p className='text-center'>There is not orders. <Link href={'/'} className='font-semibold hover:text-blue-500 transition-all'>See products</Link> </p>
      </>
    )
  }

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Full Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Total
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                State
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map(order => (
                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(0)}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.orderAddress?.names + " " + order.orderAddress?.lastName}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {currencyFormat(order.total)}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline className={clsx({
                      "text-red-800": !order.isPaid,
                      "text-green-800": order.isPaid
                    })} />
                    <span className={clsx('mx-2', {
                      "text-red-800": !order.isPaid,
                      "text-green-800": order.isPaid
                    })}>
                      {order.isPaid ? "Paid" : "Not payed"}
                    </span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      See order
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}