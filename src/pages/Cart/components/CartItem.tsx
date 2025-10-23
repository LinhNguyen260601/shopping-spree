import Checkbox from '@/components/Checkbox'
import QuantityController from '@/components/QuantityController'
import { PATH } from '@/constants'
import type { ExtendedPurchases } from '@/pages/Cart/core'
import { formatCurrency, generateNameId } from '@/utils'
import React from 'react'
import { Link } from 'react-router-dom'

interface CartItemProps {
  purchase: ExtendedPurchases
  onType: (value: number) => void
  onFocusOut: (value: number) => void
  onIncrease: (value: number) => void
  onDecrease: (value: number) => void
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const CartItem: React.FC<CartItemProps> = ({ purchase, onType, onFocusOut, onIncrease, onDecrease, onCheck }) => {
  return (
    <li className='grid grid-cols-12 rounded-sm bg-white py-5 px-4 text-center text-sm text-gray-500'>
      <article className='col-span-6 text-left' aria-label={purchase.product.name}>
        <div className='flex'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <Checkbox
              checked={purchase.checked}
              aria-label={`Chọn sản phẩm ${purchase.product.name}`}
              onChange={onCheck}
            />
          </div>

          <figure className='flex-grow flex'>
            <Link
              className='size-20 flex-shrink-0'
              to={`${PATH.HOME}${generateNameId({
                name: purchase.product.name,
                id: purchase.product._id
              })}`}
            >
              <img
                loading='lazy'
                decoding='async'
                alt={purchase.product.name}
                src={purchase.product.image}
                className='object-cover'
              />
            </Link>

            <figcaption className='flex-grow px-2 pt-1 pb-2'>
              <Link
                to={`${PATH.HOME}${generateNameId({
                  name: purchase.product.name,
                  id: purchase.product._id
                })}`}
                className='line-clamp-2 text-black hover:text-orange transition'
              >
                {purchase.product.name}
              </Link>
            </figcaption>
          </figure>
        </div>
      </article>

      <div className='col-span-6 grid grid-cols-5 items-center text-center'>
        <div className='col-span-2 flex items-center justify-center'>
          <span className='text-gray-300 line-through'>₫{formatCurrency(purchase.product.price_before_discount)}</span>
          <span className='ml-3 text-black'>₫{formatCurrency(purchase.product.price)}</span>
        </div>

        <div className='col-span-1'>
          <QuantityController
            max={purchase.product.quantity}
            value={purchase.buy_count}
            classNameWrapper='flex items-center'
            onType={onType}
            onFocusOut={onFocusOut}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            disabled={purchase.disabled}
          />
        </div>

        <div className='col-span-1 text-orange'>₫{formatCurrency(purchase.product.price * purchase.buy_count)}</div>

        <div className='col-span-1'>
          <button
            type='button'
            aria-label={`Xóa ${purchase.product.name}`}
            className='bg-none cursor-pointer text-black transition-colors hover:text-orange-500'
          >
            Xóa
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
