import { QUERY_KEY } from '@/constants'
import { useQueryParams } from '@/hooks'
import { AsideFilter, Product, ProductListSkeleton, SortProductList } from '@/pages/ProductList/components'
import { productService } from '@/services'
import { useQuery } from '@tanstack/react-query'

const ProductList = () => {
  const queryParams = useQueryParams()

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, queryParams],
    queryFn: () => productService.getProducts(queryParams),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  })

  return (
    <div className='bg-gray-200 py-6' role='main' aria-label='Danh sách sản phẩm'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>

          <div className='col-span-9' aria-label='Kết quả tìm kiếm'>
            <header>
              <h1 className='sr-only'>Sản phẩm tìm kiếm</h1>
              <SortProductList />
            </header>

            <section className='mt-6' aria-label='Danh sách sản phẩm'>
              <h2 className='sr-only'>{data?.data.data.products?.length || 0} sản phẩm được tìm thấy</h2>
              <div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                role='list'
                aria-label='Danh sách sản phẩm'
              >
                {isLoading ? (
                  <ProductListSkeleton />
                ) : error ? (
                  <div className='col-span-full text-center py-8' role='alert' aria-live='polite'>
                    <p className='text-red-600'>Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại.</p>
                  </div>
                ) : data?.data.data.products?.length === 0 ? (
                  <div className='col-span-full text-center py-8'>
                    <p className='text-gray-600'>Không tìm thấy sản phẩm nào.</p>
                  </div>
                ) : (
                  data?.data.data.products?.map((product) => (
                    <div
                      className='col-span-1'
                      key={product._id}
                      role='listitem'
                      aria-label={`Sản phẩm ${product.name}`}
                    >
                      <Product product={product} />
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
