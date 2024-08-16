'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";
import { UserAddress } from "@prisma/client";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const existAddress = await prisma.userAddress.findUnique({ where: { userId } })
    const { country, lastName, ...rest } = address
    const addressToSave = {
      ...rest,
      lastname: lastName,
      countryId: country,
      userId,
    }

    let savedAddress: UserAddress | null = null

    if (existAddress) {
      // update
      savedAddress = await prisma.userAddress.update({
        where: { userId, id: existAddress.id },
        data: addressToSave,
      })
    } else {
      // create
      savedAddress = await prisma.userAddress.create({
        data: addressToSave,
      })
    }

    return {
      ok: true,
      data: savedAddress,
      message: 'Address saved'
    }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      data: null,
      message: 'Error saving address'
    }
  }
}
