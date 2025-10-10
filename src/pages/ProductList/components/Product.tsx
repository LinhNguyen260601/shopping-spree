import { PATH } from '@/constants'
import HalfStar from '@/components/HalfStar'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <nav className='group'>
      <Link to={PATH.HOME} className='block'>
        <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
          <figure className='w-full pt-[100%] relative overflow-hidden'>
            <img
              src='https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg'
              alt='[Hàng phụ kiện] Điện thoại Samsung Galaxy A23 128GB - Màu xanh lá (8GB RAM)'
              className='absolute top-0 left-0 size-full bg-white object-cover group-hover:scale-105 transition-transform duration-200'
              loading='lazy'
            />
          </figure>
          <section className='p-2 overflow-hidden'>
            <header>
              <h3 className='min-h-[2rem] line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors'>
                [Hàng phụ kiện] Điện thoại Samsung Galaxy A23 128GB - Màu xanh lá (8GB RAM)
              </h3>
            </header>
            <div className='flex items-center mt-3'>
              <div className='line-through max-w-[50%] text-gray-500 truncate'>
                <span className='text-xs' aria-label='Giá gốc'>
                  ₫
                </span>
                <span>500.000</span>
              </div>
              <div className='text-orange-600 truncate ml-1 font-semibold'>
                <span className='text-xs' aria-label='Giá khuyến mãi'>
                  ₫
                </span>
                <span>469.000</span>
              </div>
            </div>
            <footer className='mt-3 flex items-center justify-between'>
              <div className='flex items-center gap-1' role='img' aria-label='Đánh giá 4.5 sao'>
                <Star className='size-4 text-yellow-500 fill-current' aria-hidden='true' />
                <Star className='size-4 text-yellow-500 fill-current' aria-hidden='true' />
                <Star className='size-4 text-yellow-500 fill-current' aria-hidden='true' />
                <Star className='size-4 text-yellow-500 fill-current' aria-hidden='true' />
                <HalfStar />
              </div>
              <div className='text-sm text-gray-500'>
                <span>5.66k</span>
                <span className='ml-1'>Đã bán</span>
              </div>
            </footer>
          </section>
        </div>
      </Link>
    </nav>
  )
}

export default Product
