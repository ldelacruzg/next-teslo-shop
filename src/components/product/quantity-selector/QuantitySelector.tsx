interface Props {
  quantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity = 1, onQuantityChange }: Props) => {
  const validDecrease = quantity <= 1
  const validIncrease = quantity >= 5

  const decrease = () => {
    if (validDecrease) return
    onQuantityChange(quantity - 1)
  }

  const increase = () => {
    if (validIncrease) return
    onQuantityChange(quantity + 1)
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
        <span className="rounded bg-gray-100 px-10 py-2 font-semibold">{quantity}</span>
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