"use client";

import Link from "next/link"
import { IoCartOutline, IoSearch } from "react-icons/io5"
import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store/ui/ui.store";
import { useCartStore } from "@/store";
import { useHydrated } from "@/hook/useHydrated";

export const TopMenu = () => {
  const { isHydrated } = useHydrated()
  const totalItems = useCartStore(state => state.getTotalItems())
  const toggleSideMenu = useUiStore(state => state.toggleSideMenu)

  return (
    <nav className="flex justify-between items-center w-full py-2">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${titleFont.className} font-bold antialiased`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Categories */}
      <div className="hidden sm:flex sm:gap-2">
        <Link href={'/gender/men'} className="p-2 rounded transition-all hover:bg-gray-100">Men</Link>
        <Link href={'/gender/women'} className="p-2 rounded transition-all hover:bg-gray-100">Women</Link>
        <Link href={'/gender/kid'} className="p-2 rounded transition-all hover:bg-gray-100">Kids</Link>
      </div>

      {/* Search, cart, menu */}
      <div className="flex items-center gap-4">
        <Link href={'/search'}><IoSearch size={24} /></Link>
        <Link href={'/cart'}>
          <div className="relative">
            {
              isHydrated && totalItems > 0 && (
                <span className="absolute text-xs rounded-full bg-blue-700 font-bold px-1 -top-1 -right-1 text-white">
                  {totalItems}
                </span>
              )
            }
            <IoCartOutline size={24} />
          </div>
        </Link>
        <button type="button" className="p-2 rounded transition-all hover:bg-gray-100" onClick={toggleSideMenu}>
          Menu
        </button>
      </div>
    </nav>
  )
}