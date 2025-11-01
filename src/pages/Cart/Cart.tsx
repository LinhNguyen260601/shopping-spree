import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import CartItem from '@/pages/Cart/components'
import useCartController from '@/pages/Cart/controllers'
import { formatCurrency } from '@/utils'
import noProductImage from '@/assets/images/no-product.webp'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PATH } from '@/constants'

const Cart = () => {
  const { t } = useTranslation(['cart', 'common'])
  const {
    isAllChecked,
    areBuyingProducts,
    extendedPurchases,
    checkedPurchasesCount,
    totalCheckedPurchasePrice,
    totalCheckedPurchaseSavingPrice,
    handleCheck,
    handleDelete,
    handleCheckAll,
    handleQuantity,
    handleTypeQuantity,
    handleBuyPurchases,
    handleDeleteManyPurchases
  } = useCartController()

  return (
    <div className='bg-neutral-100 py-16'>
      <section className='container'>
        {extendedPurchases.length === 0 ? (
          <figure className='p-2 flex flex-col items-center justify-center flex-shrink-0 gap-3'>
            <img src={noProductImage} alt='No product' width={100} height={100} className='object-cover' />
            <figcaption className='text-gray-600 text-sm font-bold'>{t('cart:emptyCart')}</figcaption>
            <Link to={PATH.HOME} aria-label='Navigate to view list product'>
              <Button
                size='lg'
                variant='primary'
                className='bg-orange-600 px-[50px] h-8 hover:bg-orange-500 transition-colors uppercase'
              >
                {t('common:actions.buyNow')}
              </Button>
            </Link>
          </figure>
        ) : (
          <>
            <header className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <Checkbox aria-label={t('cart:selectProduct')} checked={isAllChecked} onChange={handleCheckAll} />
                      </div>
                      <h2 className='flex-grow text-black'>{t('cart:product')}</h2>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>{t('cart:unitPrice')}</div>
                      <div className='col-span-1'>{t('cart:quantity')}</div>
                      <div className='col-span-1'>{t('cart:totalPrice')}</div>
                      <div className='col-span-1'>{t('cart:actions')}</div>
                    </div>
                  </div>
                </div>

                <section className='my-3 rounded-sm bg-white p-5 shadow' aria-labelledby='cart-section-heading'>
                  <h2 id='cart-section-heading' className='sr-only'>
                    {t('cart:cartItems')}
                  </h2>

                  <ul className='divide-y divide-gray-200'>
                    {extendedPurchases?.map((purchase, index) => (
                      <CartItem
                        key={purchase._id}
                        purchase={purchase}
                        onDelete={handleDelete(index)}
                        onType={handleTypeQuantity(index)}
                        onCheck={handleCheck(index)}
                        onFocusOut={handleQuantity(index, purchase.product.quantity)}
                        onIncrease={handleQuantity(index, purchase.product.quantity)}
                        onDecrease={handleQuantity(index, purchase.product.quantity)}
                      />
                    ))}
                  </ul>
                </section>
              </div>
            </header>
            <footer className='sticky bottom-0 z-10 mt-4 md:mt-8 rounded-sm border border-gray-100 bg-white shadow'>
              <div className='px-9 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <Checkbox aria-label={t('cart:selectAll')} checked={isAllChecked} onChange={handleCheckAll} />
                  </div>
                  <button
                    className='cursor-pointer text-sm md:text-base px-2 md:px-3 border-none bg-none hover:text-orange-500 transition whitespace-nowrap'
                    onClick={handleCheckAll}
                  >
                    {t('cart:selectAll')} ({extendedPurchases.length})
                  </button>
                  <button
                    className='cursor-pointer text-sm md:text-base px-2 md:px-3 border-none bg-none hover:text-orange-500 transition whitespace-nowrap'
                    onClick={handleDeleteManyPurchases}
                  >
                    {t('common:actions.delete')}
                  </button>
                </div>

                <div className='flex flex-col md:flex-row md:items-center gap-3 md:gap-4 md:ml-auto w-full md:w-auto'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-baseline gap-2'>
                      <p className='text-sm md:text-base text-gray-700'>
                        {t('cart:totalPayment')} ({checkedPurchasesCount} {t('cart:products')})
                      </p>
                      <p className='text-lg md:text-xl font-semibold text-orange-500'>
                        ₫{formatCurrency(totalCheckedPurchasePrice)}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 text-xs md:text-sm'>
                      <p className='text-gray-500'>{t('cart:saving')}</p>
                      <p className='text-orange-500 font-semibold'>
                        ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant='danger'
                    loading={areBuyingProducts}
                    loadingText={t('common:loading.buyingProducts')}
                    onClick={handleBuyPurchases}
                    className='w-full sm:w-auto sm:whitespace-nowrap h-10 px-6 md:px-8 text-xs md:text-sm uppercase md:ml-4'
                    aria-label={t('cart:totalPayment')}
                  >
                    {t('common:actions.buyProducts')}
                  </Button>
                </div>
              </div>
            </footer>
          </>
        )}
      </section>
    </div>
  )
}

export default Cart
