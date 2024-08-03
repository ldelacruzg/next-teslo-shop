interface Props {
  qty: number;
  seletedValue?: string;
}

export const QuantitySelector = ({ qty, seletedValue }: Props) => {
  const options = (new Array(qty)).fill(0).map((_, i) => i + 1)

  return (
    <label>
      Quantity:
      <select
        className="w-10 bg-transparent transition-all ml-1"
        defaultValue={seletedValue}
      >
        {
          options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))
        }
      </select>
    </label>
  )
}