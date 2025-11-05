import StarRating from '@/components/StarRating'
import { type Product as ProductType } from '@/types'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '@/utils'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface ProductProps {
  index: number
  product: ProductType
}

const Product = ({ index, product }: ProductProps) => {
  const { t } = useTranslation('product')
  return (
    <Link
      to={generateNameId({ name: product.name, id: product._id })}
      className='group h-full block focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-sm'
      aria-label={`Xem chi tiết sản phẩm ${product.name}`}
    >
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden h-full flex flex-col'>
        <figure className='w-full pt-[100%] relative overflow-hidden flex-shrink-0'>
          <img
            src={product.image}
            srcSet={`
              ${product.image}?w=200 200w,
              ${product.image}?w=400 400w,
              ${product.image}?w=720 720w
            `}
            sizes='(max-width: 768px) 200px, 200px'
            alt={product.name}
            className='absolute top-0 left-0 size-full bg-white object-cover group-hover:scale-105 transition-transform duration-200'
            width={200}
            height={200}
            {...(index <= 3 ? { fetchPriority: 'high', decoding: 'async' } : { loading: 'lazy', decoding: 'async' })}
          />
        </figure>
        <section className='p-2 overflow-hidden flex-1 flex flex-col'>
          <header className='flex-shrink-0'>
            <h3 className='line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-orange-800 transition-colors leading-tight'>
              {product.name}
            </h3>
          </header>
          <div className='flex items-center mt-3 flex-shrink-0'>
            <div className='line-through max-w-[50%] text-gray-700 truncate'>
              <span className='text-xs' aria-label='Giá gốc'>
                ₫
              </span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='text-orange-800 truncate ml-1 font-semibold'>
              <span className='text-xs' aria-label='Giá khuyến mãi'>
                ₫
              </span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <footer className='mt-auto pt-3 flex items-center justify-between flex-shrink-0'>
            <StarRating rating={product.rating} size='sm' />
            <div className='text-sm text-gray-700'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>{t('sold')}</span>
            </div>
          </footer>
        </section>
      </div>
    </Link>
  )
}

export default Product
