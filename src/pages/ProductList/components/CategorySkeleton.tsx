import Skeleton from '@/components/Skeleton'

const CategorySkeleton = () => {
  return (
    <ul>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <li className='py-2 pl-2' key={index}>
            <Skeleton className='h-5 w-32 bg-[#9ca3af] border border-[#6b7280] ' />
          </li>
        ))}
    </ul>
  )
}

export default CategorySkeleton
