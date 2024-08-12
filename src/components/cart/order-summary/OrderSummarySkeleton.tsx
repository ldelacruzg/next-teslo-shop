export const OrderSummarySkeleton = () => {
  return (
    <div className="flex flex-col gap-6 rounded-md lg:shadow-gray-300 lg:shadow-xl lg:p-6 lg:h-min animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-full"></div>
      <section className="flex flex-col font-light gap-2">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between font-bold">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </section>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  )
}