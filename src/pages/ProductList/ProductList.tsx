import { AsideFilter, Product, SortProductList } from '@/pages/ProductList/components'

const ProductList = () => {
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
              <h2 className='sr-only'>30 sản phẩm được tìm thấy</h2>
              <div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                role='grid'
                aria-label='Lưới sản phẩm'
              >
                {Array(30)
                  .fill(0)
                  .map((_, index) => (
                    <article className='col-span-1' key={index} role='gridcell' aria-label={`Sản phẩm ${index + 1}`}>
                      <Product />
                    </article>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
