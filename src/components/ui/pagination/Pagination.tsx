"use client";

import Link from "next/link"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePaginationNumbers } from "@/utils";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const pages = generatePaginationNumbers(totalPages, currentPage)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') return `${pathname}?${params.toString()}`

    if (+pageNumber <= 0) return `${pathname}`

    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const buildPaginationNumber = (pageNumber: number | string) => {
    const isCurrentPage = pageNumber === currentPage
    const activeClass = isCurrentPage
      ? 'bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
      : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'

    return (
      <li key={pageNumber} className={`page-item`}>
        <Link
          className={`page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded ${activeClass}`}
          href={createPageUrl(pageNumber)}>
          {pageNumber}
          <span className="visually-hidden"></span>
        </Link>
      </li>
    )
  }

  return (
    <div className="flex justify-center mb-20">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}>
              <IoChevronBackOutline size={25} />
            </Link>
          </li>
          {
            pages.map((pageNumber) => (
              buildPaginationNumber(pageNumber)
            ))
          }
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline size={25} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}