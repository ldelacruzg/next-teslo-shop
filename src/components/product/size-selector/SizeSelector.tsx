import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
  sizes: Size[];
  selectedSize: Size;
  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSizeChange }: Props) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-sm">Sizes</h3>
      <div className="flex gap-4">
        {
          sizes.map(size => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={clsx(
                "font-bold py-1 cursor-pointer box-border hover:underline hover:text-blue-700",
                { "underline text-blue-700": selectedSize === size }
              )}>
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}