"use server";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

interface RegisterUserDto {
  fullName: string;
  email: string;
  password: string;
}

export const registerUser = async ({ fullName, email, password }: RegisterUserDto) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name: fullName,
        password: bcrypt.hashSync(password, 10)
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })


    return {
      ok: true,
      user,
      message: 'User registered'
    }
  } catch (error) {
    return {
      ok: false,
      user: null,
      message: 'Error registering user'
    }
  }
}