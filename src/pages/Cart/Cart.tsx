import Button from '@/components/Button'
import { PURCHASES_STATUS, QUERY_KEY } from '@/constants'
import CartItem from '@/pages/Cart/components'
import { purchaseService } from '@/services'
import { useQuery } from '@tanstack/react-query'

const Cart = () => {
  const { data: purchasedGoodsInCartData } = useQuery({
    queryKey: [QUERY_KEY.PURCHASES, { status: PURCHASES_STATUS.IN_CART }],
    queryFn: () => purchaseService.getPurchases({ status: PURCHASES_STATUS.IN_CART })
  })

  const purchasedGoodsInCart = purchasedGoodsInCartData?.data.data || []

  return (
    <div className='bg-neutral-100 py-16'>
      <section className='container'>
        <header className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      aria-label='Chọn sản phẩm'
                      className="
    cursor-pointer size-5 appearance-none rounded-sm
    border border-gray-300
    checked:bg-orange-500 checked:border-orange-500
    checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center
  "
                    />
                  </div>
                  <h2 className='flex-grow text-black'>Sản phẩm</h2>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>

            <section className='my-3 rounded-sm bg-white p-5 shadow' aria-labelledby='cart-section-heading'>
              <h2 id='cart-section-heading' className='sr-only'>
                Các sản phẩm trong giỏ hàng
              </h2>

              <ul className='divide-y divide-gray-200'>
                {purchasedGoodsInCart?.map((purchase) => (
                  <CartItem key={purchase._id} purchase={purchase} />
                ))}
              </ul>
            </section>
          </div>
        </header>
        <footer className='sticky bottom-0 z-10 mt-4 md:mt-8 rounded-sm border border-gray-100 bg-white shadow'>
          <div className='px-9 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-3'>
            <div className='flex items-center gap-2'>
              <div className='flex flex-shrink-0 items-center justify-center'>
                <input
                  type='checkbox'
                  aria-label='Chọn tất cả sản phẩm'
                  className="cursor-pointer size-5 appearance-none rounded-sm border border-gray-300 checked:bg-orange-500 checked:border-orange-500 checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center"
                />
              </div>
              <button className='cursor-pointer text-sm md:text-base px-2 md:px-3 border-none bg-none hover:text-orange-500 transition whitespace-nowrap'>
                Chọn tất cả
              </button>
              <button className='cursor-pointer text-sm md:text-base px-2 md:px-3 border-none bg-none hover:text-orange-500 transition whitespace-nowrap'>
                Xóa
              </button>
            </div>

            <div className='flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:ml-auto w-full md:w-auto'>
              <div className='flex flex-col gap-1'>
                <div className='flex items-baseline gap-2'>
                  <p className='text-sm md:text-base text-gray-700'>Tổng thanh toán:</p>
                  <p className='text-lg md:text-xl font-semibold text-orange-500'>₫138000</p>
                </div>
                <div className='flex items-center gap-2 text-xs md:text-sm'>
                  <p className='text-gray-500'>Tiết kiệm:</p>
                  <p className='text-orange-500 font-semibold'>₫138000</p>
                </div>
              </div>

              <Button
                variant='danger'
                className='w-full sm:w-auto sm:whitespace-nowrap h-10 px-6 md:px-8 text-xs md:text-sm uppercase md:ml-4'
                aria-label='Thanh toán đơn hàng'
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default Cart
