"use client";

import { ProductImage } from "@/components";
import Image from "next/image"
import { useState } from "react";

interface Props {
  image: string;
  hoverImage: string;
  alt: string;
}

export const HoverImage = ({ hoverImage, image, alt }: Props) => {
  const [currentImage, setcurrentImage] = useState(image)

  return (
    <ProductImage
      onMouseEnter={() => setcurrentImage(hoverImage)}
      onMouseLeave={() => setcurrentImage(image)}
      className="fade-in transition-all"
      src={currentImage} height={600} width={600}
      alt={alt}
    />
  )
}