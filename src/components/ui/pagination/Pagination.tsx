"use client";

import Link from "next/link"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePaginationNumbers } from "@/utils";
import { PaginationNumber } from "./PaginationNumber";

interface Props {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pages = generatePaginationNumbers(totalPages, currentPage)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') return `${pathname}?${params.toString()}`

    if (+pageNumber <= 0) return `${pathname}`

    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
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
            pages.map((pageNumber, i) => (
              <PaginationNumber key={i} currentPage={currentPage} href={createPageUrl(pageNumber)} pageNumber={pageNumber} />
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