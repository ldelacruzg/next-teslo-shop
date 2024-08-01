import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-[800px] p-4 sm:flex-row">
      <div className="flex flex-col gap-2 text-center">
        <h1 className={`text-9xl ${titleFont.className}`}>404</h1>
        <p className="font-semibold text-xl">Upss! Page not found</p>
        <p className="font-light">
          Back to <Link href={'/'} className="hover:text-blue-700 underline transition-all" >Home</Link>
        </p>
      </div>
      <div>
        <Image
          src={'/imgs/starman_750x750.png'}
          alt="Starman"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}