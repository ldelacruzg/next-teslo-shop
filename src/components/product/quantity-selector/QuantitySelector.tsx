"use client";

import { useState } from "react";

interface Props {
  initial?: number;
}

export const QuantitySelector = ({ initial = 1 }: Props) => {
  const [count, setCount] = useState(initial)
  const validDecrease = count <= 1
  const validIncrease = count >= 5

  const decrease = () => {
    if (validDecrease) return
    setCount(count - 1)
  }

  const increase = () => {
    if (validIncrease) return
    setCount(count + 1)
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-semibold text-sm">Quantity</h3>
      <div className="flex gap-2">
        <button
          type="button"
          className={`px-4 font-semibold ${validDecrease ? 'text-gray-400' : ''}`}
          disabled={validDecrease}
          onClick={decrease}>
          -
        </button>
        <span className="rounded bg-gray-100 px-10 py-2 font-semibold">{count}</span>
        <button
          type="button"
          className={`px-4 font-semibold ${validIncrease ? 'text-gray-400' : ''}`}
          disabled={validIncrease}
          onClick={increase}>
          +
        </button>
      </div>
    </div>
  )
}