'use server';

import { Category } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getCategories = async (): Promise<Category[] | null> => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (error) {
    return null
  }
}