import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren { }

export const UserSessionProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}