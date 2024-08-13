"use client";

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions";
import { IoInformationCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state === 'LoginSuccess') {
      router.replace('/')
    }
  }, [state, router])

  return (
    <form action={dispatch} className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />
      </div>

      {state === 'Invalid credentials' && (
        <div className="flex gap-2 mb-4 rounded bg-red-500 p-2 text-white font-bold text-sm">
          <IoInformationCircleOutline className="h-5 w-5" />
          <p className="text-sm">{state}</p>
        </div>
      )}

      <LoginButton />

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/register"
        className="btn-secondary text-center">
        Create a new account
      </Link>
    </form>
  )
}

export const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })}
    >
      {
        pending
          ? "Loading..."
          : "Login"
      }
    </button>
  )
}