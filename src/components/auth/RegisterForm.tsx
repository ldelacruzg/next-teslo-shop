"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoInformationCircleOutline } from "react-icons/io5";

interface Inputs {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    setErrorMessage(undefined)
    const { ok, user, message } = await registerUser(data)

    if (!ok) {
      setErrorMessage(message)
      return;
    }

    await login(data.email, data.password)
    window.location.replace('/')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="fullname">Full Name</label>
        <input
          className={clsx(
            "px-5 p-2 border bg-gray-200 rounded",
            {
              "border-red-500": errors.fullName
            }
          )}
          type="text"
          id="fullname"
          autoFocus
          {...register('fullName', { required: true })}
        />
        {errors.fullName?.type === 'required' && (<p className="font-semibold text-red-500">Name is required</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          className={clsx(
            "px-5 p-2 border bg-gray-200 rounded",
            {
              "border-red-500": errors.email
            }
          )}
          type="email"
          id="email"
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
        {errors.email?.type === 'required' && (<p className="font-semibold text-red-500">Email is required</p>)}
        {errors.email?.type === 'pattern' && (<p className="font-semibold text-red-500">Email is not valid</p>)}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          className={clsx(
            "px-5 p-2 border bg-gray-200 rounded",
            {
              "border-red-500": errors.password
            }
          )}
          type="password"
          id="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password?.type === 'required' && (<p className="font-semibold text-red-500">Password is required</p>)}
        {errors.password?.type === 'minLength' && (<p className="font-semibold text-red-500">Password must be at least 6 character</p>)}
      </div>

      {errorMessage && (
        <div className="flex gap-2 rounded bg-red-500 p-2 text-white font-bold text-sm">
          <IoInformationCircleOutline className="h-5 w-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <button type="submit" className="btn-primary">Register</button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Login
      </Link>
    </form>
  )
}