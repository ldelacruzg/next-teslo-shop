import Image from "next/image"

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

export const ProductImage = ({ alt, height, width, className, src, onMouseEnter, onMouseLeave }: Props) => {
  const customSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      priority
      placeholder='blur'
      blurDataURL={customSrc}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-auto h-auto object-cover ${className}`}
      src={customSrc}
      alt={alt} width={width} height={height} />
  )
}