import { Helmet } from '@dr.pogodin/react-helmet'
import Pagination from '@/components/Pagination'
import { AsideFilter, Product, ProductListSkeleton, SortProductList } from '@/pages/ProductList/components'
import { useProductListController } from '@/pages/ProductList/controllers'
import { useTranslation } from 'react-i18next'

const ProductList = () => {
  const { t } = useTranslation('productList')
  const { error, isLoading, queryConfig, productsData, categoriesData, isLoadingCategories } =
    useProductListController()

  const { products = [], pagination = { page: 1, page_size: 20 } } = productsData?.data.data || {}

  const { data: categories = [] } = categoriesData?.data || {}

  return (
    <>
      <Helmet>
        <title>Mua Sắm Online - Shopping Spree | Thương Mại Điện Tử Hàng Đầu</title>
        <meta
          name='description'
          content='Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất tại Shopping Spree. Mua sắm online dễ dàng, thanh toán an toàn, giao hàng nhanh chóng. Tìm kiếm và so sánh sản phẩm từ nhiều danh mục khác nhau.'
        />
        <meta
          name='keywords'
          content='mua sắm online, shopping online, thương mại điện tử, mua hàng trực tuyến, sản phẩm giá rẻ, deal tốt, flash sale'
        />
        <meta property='og:title' content='Mua Sắm Online - Shopping Spree | Thương Mại Điện Tử Hàng Đầu' />
        <meta
          property='og:description'
          content='Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất tại Shopping Spree. Mua sắm online dễ dàng, thanh toán an toàn, giao hàng nhanh chóng.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mua Sắm Online - Shopping Spree' />
        <meta
          name='twitter:description'
          content='Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất tại Shopping Spree.'
        />
      </Helmet>
      <div className='bg-gray-200 py-6' role='main' aria-label='Danh sách sản phẩm'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter
                categories={categories}
                queryConfig={queryConfig}
                isLoadingCategories={isLoadingCategories}
              />
            </div>

            <div className='col-span-9' aria-label='Kết quả tìm kiếm'>
              <header>
                <h1 className='sr-only'>Sản phẩm tìm kiếm</h1>
                <SortProductList queryConfig={queryConfig} pageSize={pagination.page_size || 0} />
              </header>

              <section className='mt-6' aria-label='Danh sách sản phẩm'>
                <h2 className='sr-only'>{productsData?.data.data.products?.length || 0} sản phẩm được tìm thấy</h2>
                <div
                  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                  role='list'
                  aria-label='Danh sách sản phẩm'
                >
                  {isLoading ? (
                    <ProductListSkeleton />
                  ) : error ? (
                    <div className='col-span-full text-center py-8' role='alert' aria-live='polite'>
                      <p className='text-red-600'>{t('errorLoading')}</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className='col-span-full text-center py-8'>
                      <p className='text-gray-600'>{t('noProducts')}</p>
                    </div>
                  ) : (
                    products.map((product, index) => (
                      <div
                        className='col-span-1'
                        key={product._id}
                        role='listitem'
                        aria-label={`Sản phẩm ${product.name}`}
                      >
                        <Product index={index} product={product} />
                      </div>
                    ))
                  )}
                </div>
              </section>
              <Pagination queryConfig={queryConfig} pageSize={pagination.page_size || 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList
