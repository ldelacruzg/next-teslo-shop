"use server";

import { Country } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getCountries = async (): Promise<Country[]> => {
  try {
    return await prisma.country.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (error: any) {
    console.log({ error: true, message: error.message })
    return []
  }
}