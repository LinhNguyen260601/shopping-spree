import { Helmet } from '@dr.pogodin/react-helmet'
import Avatar from '@/components/Avatar'
import { PATH, PURCHASES_STATUS } from '@/constants'
import { useQueryParams } from '@/hooks'
import { GET_TAB_LABEL, PURCHASE_TABS } from '@/pages/User/pages/HistoryPurchase/core'
import type { Purchase } from '@/types'
import { cn, formatCurrency, generateNameId } from '@/utils'
import { useTranslation } from 'react-i18next'
import { createSearchParams, Link, useLoaderData } from 'react-router-dom'

const HistoryPurchase = () => {
  const { t } = useTranslation('user')
  const data = useLoaderData()
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) ?? PURCHASES_STATUS.ALL

  const purchaseOrderData = (data.data.data as Purchase[]) || []

  return (
    <>
      <Helmet>
        <title>Lịch Sử Mua Hàng - Shopping Spree | Quản Lý Đơn Hàng</title>
        <meta
          name='description'
          content='Xem lịch sử mua hàng và quản lý đơn hàng của bạn tại Shopping Spree. Theo dõi trạng thái đơn hàng, xem chi tiết các sản phẩm đã mua và quản lý giao dịch một cách dễ dàng.'
        />
        <meta
          name='keywords'
          content='lịch sử mua hàng, purchase history, đơn hàng, quản lý đơn hàng, shopping spree'
        />
        <meta property='og:title' content='Lịch Sử Mua Hàng - Shopping Spree' />
        <meta
          property='og:description'
          content='Xem lịch sử mua hàng và quản lý đơn hàng của bạn tại Shopping Spree. Theo dõi trạng thái đơn hàng.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Lịch Sử Mua Hàng - Shopping Spree' />
        <meta
          name='twitter:description'
          content='Xem lịch sử mua hàng và quản lý đơn hàng của bạn tại Shopping Spree.'
        />
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <section aria-labelledby='purchase-history-heading' className='overflow-x-auto'>
        <h2 id='purchase-history-heading' className='sr-only'>
          Purchase History
        </h2>

        {/* Tabs Navigation */}
        <nav className='min-w-[700px]' aria-label='Purchase Filters'>
          <ul className='sticky top-0 flex rounded-t-sm shadow-sm'>
            {PURCHASE_TABS.map((tab) => (
              <li key={tab.status} className='flex-1'>
                <Link
                  to={{
                    pathname: PATH.HISTORY_PURCHASE,
                    search: createSearchParams({ status: String(tab.status) }).toString()
                  }}
                  className={cn(
                    'flex h-full items-center justify-center border-b-2 bg-white py-4 text-center transition-colors duration-200',
                    status === tab.status
                      ? 'border-b-orange-500 text-orange-500 hover:text-orange-600'
                      : 'border-b-black/10 text-gray-900 hover:text-orange-500'
                  )}
                  aria-current={status === tab.status ? 'page' : undefined}
                >
                  {GET_TAB_LABEL(t, tab.status)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Purchases List */}
        <section aria-label='Purchase Orders' className='mt-4 min-w-[700px]'>
          {purchaseOrderData.map((purchase) => (
            <article
              key={purchase._id}
              className='mt-4 rounded-sm border border-black/10 bg-white p-6 text-gray-800 shadow-sm'
            >
              <Link
                to={`${PATH.HOME}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                className='flex'
              >
                <figure className='flex-shrink-0 size-20'>
                  <Avatar
                    variant='square'
                    width={80}
                    height={80}
                    src={purchase.product.image}
                    alt={purchase.product.name}
                  />
                </figure>
                <div className='ml-3 flex-grow overflow-hidden'>
                  <h3 className='truncate text-sm font-medium'>{purchase.product.name}</h3>
                  <p className='mt-3 text-sm text-gray-600'>x{purchase.buy_count}</p>
                </div>
                <div className='ml-3 flex-shrink-0 text-right'>
                  <span className='block text-gray-500 line-through'>
                    ₫{formatCurrency(purchase.product.price_before_discount)}
                  </span>
                  <span className='block text-orange-500 font-semibold'>₫{formatCurrency(purchase.product.price)}</span>
                </div>
              </Link>

              <footer className='mt-4 flex justify-end border-t border-gray-100 pt-4 text-sm'>
                <span className='text-gray-600'>{t('purchaseHistory.totalPrice')}</span>
                <strong className='ml-4 text-xl text-orange-500'>
                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                </strong>
              </footer>
            </article>
          ))}
        </section>
      </section>
    </>
  )
}

export default HistoryPurchase
