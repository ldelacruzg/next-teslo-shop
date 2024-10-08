"use client";

import { User } from "@/interfaces"
import { changeUserRol } from "@/actions/user/change-user-rol";

interface Props {
  users: User[];
}


export const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Email
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Full Name
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  name="role"
                  id="role"
                  value={user.role}
                  onChange={async (e) => await changeUserRol(user.id, e.target.value)}
                  className='p-2 w-full'>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}