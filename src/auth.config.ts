import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt'
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        // search user by email
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null

        // comparate password
        if (!bcrypt.compareSync(password, user.password)) return null

        // return user
        const { password: _, ...rest } = user

        console.log({ rest })
        return rest
      },
    }),
  ]
}

export const { signIn, signOut, auth } = NextAuth(authConfig)