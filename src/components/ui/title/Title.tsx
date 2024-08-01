import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, className, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-1 py-10">
      <h1 className={`text-2xl font-bold ${titleFont.className} ${className}`}>{title}</h1>
      {subtitle && <p className="font-normal text-xl">{subtitle}</p>}
    </div>
  )
}