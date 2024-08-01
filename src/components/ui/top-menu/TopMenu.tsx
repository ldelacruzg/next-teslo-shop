"use client";

import { titleFont } from "@/config/fonts"
import { useUiStore } from "@/store/ui/ui.store";
import Link from "next/link"
import { IoCartOutline, IoSearch } from "react-icons/io5"

export const TopMenu = () => {
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
        <Link href={'/category/men'} className="p-2 rounded transition-all hover:bg-gray-100">Men</Link>
        <Link href={'/category/woman'} className="p-2 rounded transition-all hover:bg-gray-100">Woman</Link>
        <Link href={'/category/kids'} className="p-2 rounded transition-all hover:bg-gray-100">Kids</Link>
      </div>

      {/* Search, cart, menu */}
      <div className="flex items-center gap-4">
        <Link href={'/search'}><IoSearch size={24} /></Link>
        <Link href={'/cart'}>
          <div className="relative">
            <span className="absolute text-xs rounded-full bg-blue-700 font-bold px-1 -top-1 -right-1 text-white">3</span>
            <IoCartOutline size={24} />
          </div>
        </Link>
        <button type="button" className="p-2 rounded transition-all hover:bg-gray-100" onClick={toggleSideMenu}>Menu</button>
      </div>
    </nav>
  )
}