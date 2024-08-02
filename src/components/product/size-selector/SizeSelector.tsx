"use client";

import type { Size } from "@/interfaces"
import { useState } from "react";

interface Props {
  sizes: Size[];
  selectedSize: Size;
}

export const SizeSelector = ({ sizes, selectedSize: initial }: Props) => {
  const [selectedSize, setSelectedSize] = useState(initial)

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-sm">Sizes</h3>
      <div className="flex gap-4">
        {
          sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`font-bold py-1 cursor-pointer box-border hover:underline hover:text-blue-700 ${selectedSize === size ? 'underline text-blue-700' : ''}`}>
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}