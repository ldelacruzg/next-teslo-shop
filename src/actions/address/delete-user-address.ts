'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    // Validar si esxiste el usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { address: true }
    })
    if (!user) return

    // Verificar que tenga un dirección guardada
    if (!user.address) return

    // Eliminar dirección
    await prisma.userAddress.delete({
      where: {
        userId: userId,
        id: user.address.id
      }
    })
  } catch (error) {
    console.log({ error })
  }
}