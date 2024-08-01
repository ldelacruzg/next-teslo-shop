'use client';

import Image from "next/image"
import { useState } from "react";

interface Props {
  image: string;
  hoverImage: string;
}

export const HoverImage = ({ hoverImage, image }: Props) => {
  const [currentImage, setcurrentImage] = useState(image)

  return (
    <Image
      priority
      onMouseEnter={() => setcurrentImage(hoverImage)}
      onMouseLeave={() => setcurrentImage(image)}
      className="fade-in transition-all"
      src={currentImage} height={600} width={600}
      alt="Product"
    />
  )
}