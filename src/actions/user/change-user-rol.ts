'use server';

import { revalidatePath } from "next/cache"
import { Role } from "@prisma/client"

import prisma from "@/lib/prisma"
import { NotExistenceException, NotUserSessionException, UnauthorizedException } from "@/exceptions"
import { getUserSession } from "../auth/get-user-session"

export const changeUserRol = async (userId: string, newRole: string) => {
  try {
    await getUserSession('admin')

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) throw new NotExistenceException()

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      data: null,
      message: 'User changed'
    }
  } catch (error) {
    if (
      error instanceof NotUserSessionException ||
      error instanceof UnauthorizedException ||
      error instanceof NotExistenceException) {
      return {
        ok: false,
        data: null,
        message: error.message
      }
    }

    return {
      ok: false,
      data: null,
      message: 'Unknown Error'
    }
  }
}