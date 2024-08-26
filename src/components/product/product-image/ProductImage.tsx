import Image from "next/image"

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
}

export const ProductImage = ({ alt, height, width, className, src }: Props) => {
  const customSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      priority
      className={`w-auto h-auto object-cover ${className}`}
      src={customSrc}
      alt={alt} width={width} height={height} />
  )
}