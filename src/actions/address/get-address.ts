'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getUserAddress = async (userId: string): Promise<Address | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { address: true }
    })

    if (!user) return null
    if (!user.address) return null

    const { lastname, countryId, address2, ...address } = user.address
    return {
      ...address,
      lastName: lastname,
      country: countryId,
      address2: address2 !== null ? address2 : undefined
    }
  } catch (error) {
    console.log({ error })
    return null
  }
}