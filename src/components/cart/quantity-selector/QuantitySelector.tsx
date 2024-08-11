interface Props {
  qty: number;
  seletedValue?: string;
  onValueChange: (value: number) => void;
}

export const QuantitySelector = ({ qty, seletedValue, onValueChange }: Props) => {
  const options = (new Array(qty)).fill(0).map((_, i) => i + 1)

  return (
    <label>
      Quantity:
      <select
        className="w-10 bg-transparent transition-all ml-1"
        defaultValue={seletedValue}
        onChange={(e) => onValueChange(Number(e.target.value))}
      >
        {
          options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))
        }
      </select>
    </label>
  )
}