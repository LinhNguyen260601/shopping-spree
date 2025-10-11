import Skeleton from '@/components/Skeleton'

const ProductSkeleton = () => (
  <nav className='group h-full'>
    <div className='block h-full'>
      <div className='bg-white shadow rounded-sm overflow-hidden h-full flex flex-col'>
        {/* Image skeleton */}
        <figure className='w-full pt-[100%] relative overflow-hidden flex-shrink-0'>
          <Skeleton className='absolute top-0 left-0 size-full' />
        </figure>

        {/* Content skeleton */}
        <div className='p-2 overflow-hidden flex-1 flex flex-col'>
          {/* Title skeleton */}
          <header className='flex-shrink-0'>
            <Skeleton className='h-4 w-full mb-1' />
            <Skeleton className='h-4 w-3/4' />
          </header>

          {/* Price skeleton */}
          <div className='flex items-center mt-3 flex-shrink-0'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-20 ml-2' />
          </div>

          {/* Rating and sold skeleton */}
          <footer className='mt-auto pt-3 flex items-center justify-between flex-shrink-0'>
            <div className='flex items-center gap-1'>
              <Skeleton className='size-3' variant='circular' />
              <Skeleton className='size-3' variant='circular' />
              <Skeleton className='size-3' variant='circular' />
              <Skeleton className='size-3' variant='circular' />
              <Skeleton className='size-3' variant='circular' />
            </div>
            <Skeleton className='h-4 w-12' />
          </footer>
        </div>
      </div>
    </div>
  </nav>
)

const ProductListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className='col-span-1'>
          <ProductSkeleton />
        </div>
      ))}
    </>
  )
}

export default ProductListSkeleton
