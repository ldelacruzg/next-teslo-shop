'use server';

import { auth } from "@/auth.config";
import { NotUserSessionException, UnauthorizedException } from "@/exceptions";
import { User } from "@/interfaces";
import prisma from "@/lib/prisma"

interface Result {
  ok: boolean;
  data: User[] | null;
  message: string;
}

export const getUsers = async (): Promise<Result> => {
  try {
    const session = await auth()

    if (!session) throw new NotUserSessionException()
    if (session.user.role !== 'admin') throw new UnauthorizedException()

    const users = await prisma.user.findMany({
      where: {
        id: { not: session.user.id }
      },
      orderBy: { name: 'asc' }
    });

    return {
      ok: true,
      data: users,
      message: 'Load users'
    };
  } catch (error) {
    if (
      error instanceof NotUserSessionException ||
      error instanceof UnauthorizedException) {
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