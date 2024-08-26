import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  searchParams: {
    page: string
  }
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const isPageInvalid = searchParams.page && isNaN(Number(searchParams.page))
  if (isPageInvalid) redirect('/')

  const page = Number(searchParams.page) || 1
  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page })

  if (products && products.length <= 0) {
    return (
      <>
        <Title title="Products" subtitle='Products Managnment' />
        <p className='text-center'>There is not products.</p>
      </>
    )
  }

  return (
    <>
      <Title title="Products" subtitle='Products Managnment' />

      <div className="flex flex-col items-center mb-10 gap-6 sm:flex-row sm:justify-between">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
        <div>
          <Link href={'/admin/products/new'} className='bg-blue-600 rounded text-white font-semibold py-3 px-6'>
            New Product
          </Link>
        </div>
      </div>

      <table className="min-w-full mb-10">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#ID</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Image</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Title</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stock</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Sizes</th>
            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Genrer</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(({ id, title, inStock, price, sizes, gender, images, slug }) => (
              <tr key={id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id.split('-').at(0)}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/products/${slug}`}>
                    {/* <Image priority className='rounded' src={`/products/${images[1]}`} alt={title} width={70} height={70} /> */}
                    <ProductImage
                      src={images[0]}
                      alt={title}
                      width={70} height={70}
                      className='rounded' />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/products/${slug}`} className='hover:text-blue-600 font-bold transition-all'>{title}</Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{inStock}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{currencyFormat(price)}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{sizes.join(' - ')}</td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{gender}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}