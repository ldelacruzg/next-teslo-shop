export const ProductsInCartSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 lg:col-span-2 lg:pt-8 animate-pulse">
      {
        (new Array(3)).fill(0).map((_, i) => (
          <article key={i} className="grid grid-cols-4 lg:max-w-xl">
            <div className="flex items-center justify-start">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col col-span-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 my-2"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-[10%]"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </article>
        ))
      }
    </div>
  )
}