import Link from "next/link"

interface Props {
  className?: string;
  href: string;
  icon: React.ReactNode;
  onClick?: () => void | undefined;
  title: string;
  type?: 'link' | 'button';
}

export const SidebarItem = ({ className, href, icon, onClick, title, type = 'link' }: Props) => {
  if (type === 'button') {
    return (
      <button onClick={onClick} className={`flex gap-3 items-center hover:bg-gray-100 p-2 rounded transition-all ${className ?? ''}`}>
        {icon}
        <span className="text-sm font-semibold">{title}</span>
      </button>
    )
  }


  return (
    <Link onClick={onClick} href={href} className={`flex gap-3 items-center hover:bg-gray-100 p-2 rounded transition-all ${className ?? ''}`}>
      {icon}
      <span className="text-sm font-semibold">{title}</span>
    </Link>
  )
}