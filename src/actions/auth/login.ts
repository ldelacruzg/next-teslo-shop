'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  //await new Promise((resolver) => setTimeout(resolver, 3000))

  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })

    return 'LoginSuccess'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials'
        default:
          return 'Something went wrong'
      }
    }

    return 'Unknown Error'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email, password,
      redirect: false
    })

    return { ok: true }
  } catch (error) {
    return { ok: false }
  }
}