'use server';

import { auth } from "@/auth.config";
import { NotUserSessionException, UnauthorizedException } from "@/exceptions";

export const getUserSession = async (validRole?: string) => {
  try {
    const session = await auth()

    if (!session) throw new NotUserSessionException()
    if (validRole && session.user.role !== validRole) throw new UnauthorizedException()

    return session;
  } catch (error) {
    throw error
  }
}