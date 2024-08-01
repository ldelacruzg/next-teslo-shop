import Link from "next/link"

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
  className?: string;
}

export const SidebarItem = ({ className, href, icon, title }: Props) => {
  return (
    <Link href={href} className={`flex gap-3 items-center hover:bg-gray-100 p-2 rounded transition-all ${className ?? ''}`}>
      {icon}
      <span className="text-sm font-semibold">{title}</span>
    </Link>
  )
}