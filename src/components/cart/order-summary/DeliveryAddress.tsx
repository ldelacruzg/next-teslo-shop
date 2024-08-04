export const DeliveryAddress = () => {
  return (
    <section className="flex flex-col gap-2 font-light">
      <h3 className="font-bold text-xl">Delivery Address</h3>
      <div className="flex flex-col justify-between gap-2">
        <p>Luis De La Cruz</p>
        <p>Dirrección 1</p>
        <p>Dirrección 2</p>
        <div className="flex">
          <p>Postal code</p>
          <p>City</p>
        </div>
        <p>Phone Number</p>
      </div>
    </section>
  )
}