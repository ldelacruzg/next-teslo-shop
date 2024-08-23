"use client";

import { signOut, useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline
} from "react-icons/io5"
import { useUiStore } from "@/store/ui/ui.store";
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen)
  const toggleSideMenu = useUiStore(state => state.toggleSideMenu)
  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user.role === 'admin'

  const onLogout = async () => {
    toggleSideMenu()
    signOut()
  }

  return (
    <div key={session?.user.role || 'default'} id="nav">
      {isSideMenuOpen && <div className="bg-black fixed top-0 left-0 w-screen h-screen z-10 opacity-30" />}
      {isSideMenuOpen && <div onClick={toggleSideMenu} className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />}

      <nav className={`fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto ${!isSideMenuOpen ? 'translate-x-full' : ''}`}>
        <div className="flex flex-col gap-2">
          <IoCloseOutline onClick={toggleSideMenu} size={30} className="cursor-pointer self-end" />
          <div className="flex gap-3 items-center">
            <IoSearchOutline size={20} />
            <input type="text" placeholder="Search" className="w-full bg-gray-50 rounded p-2 border-b-2 focus:outline-none focus:border-b-blue-700" />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-5">
          {
            isAuthenticated &&
            (
              <>
                <SidebarItem icon={<IoPersonOutline size={20} />} title="Profile" href="/profile" onClick={toggleSideMenu} />
                <SidebarItem icon={<IoTicketOutline size={20} />} title="Orders" href="/orders" onClick={toggleSideMenu} />
              </>
            )
          }

          {
            isAuthenticated
              ? (<SidebarItem icon={<IoLogOutOutline size={20} />} title="Logout" href="/" onClick={() => { onLogout() }} />)
              : (<SidebarItem icon={<IoLogInOutline size={20} />} title="Login" href="/auth/login" onClick={toggleSideMenu} />)
          }

          {
            isAdmin &&
            (
              <>
                <div className="w-full h-px bg-gray-200 my-5" />
                <SidebarItem icon={<IoShirtOutline size={20} />} title="Products" href="/" onClick={toggleSideMenu} />
                <SidebarItem icon={<IoTicketOutline size={20} />} title="Orders" href="/admin/orders" onClick={toggleSideMenu} />
                <SidebarItem icon={<IoPeopleOutline size={20} />} title="Clients" href="/clients" onClick={toggleSideMenu} />
              </>
            )
          }
        </div>
      </nav>
    </div>
  )
}