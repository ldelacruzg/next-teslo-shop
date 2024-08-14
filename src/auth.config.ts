import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs'
import prisma from './lib/prisma';

const protectedRoutes = [
  '/checkout',
  '/checkout/address'
]

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.data = user
      }
      return token
    },
    session: ({ session, token, user }) => {
      session.user = token.data as any
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const currentPath = nextUrl.pathname
      const isOnProtectedRoute = protectedRoutes.includes(currentPath)
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true
        return Response.redirect(new URL(`/auth/login?redirectTo=${currentPath}`, nextUrl))
      }
      return true
    },
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

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)