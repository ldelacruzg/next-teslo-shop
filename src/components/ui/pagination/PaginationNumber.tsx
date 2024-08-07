import clsx from "clsx";
import Link from "next/link"

interface Props {
  currentPage: number;
  href: string;
  pageNumber: number | string;
}

export const PaginationNumber = ({ currentPage, href, pageNumber }: Props) => {
  return (
    <li key={pageNumber} className={`page-item`}>
      <Link
        className={clsx(
          "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded",
          {
            "bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md": pageNumber === currentPage,
            "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none": pageNumber !== currentPage
          }
        )}
        href={href}>
        {pageNumber}
        <span className="visually-hidden"></span>
      </Link>
    </li>
  )
}