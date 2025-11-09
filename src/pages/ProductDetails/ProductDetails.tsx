import { Helmet } from '@dr.pogodin/react-helmet'
import Button from '@/components/Button'
import QuantityController from '@/components/QuantityController'
import StarRating from '@/components/StarRating/StarRating'
import { useProductDetaisController } from '@/pages/ProductDetails/controllers'
import { calculateDiscountPercentage, formatCurrency, formatNumberToSocialStyle } from '@/utils'
import DOMPurify from 'dompurify'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ProductDetails = () => {
  const { t } = useTranslation(['product', 'common'])

  const {
    product,
    buyCount,
    imageRef,
    activeImage,
    currentImages,
    isAddingToCart,
    handleZoom,
    handleBuyNow,
    handleBuyCount,
    handleZoomLeave,
    handleNextImage,
    handleAddToCart,
    handlePreviousImage,
    handleSelectActiveImage
  } = useProductDetaisController()

  if (!product) return null

  const productDescription = product.description
    ? DOMPurify.sanitize(product.description, { ALLOWED_TAGS: [] }).substring(0, 160)
    : `Mua ${product.name} với giá tốt nhất tại Shopping Spree. Sản phẩm chất lượng, giao hàng nhanh chóng.`

  const productPrice = formatCurrency(product.price)

  return (
    <>
      <Helmet>
        <title>
          {product.name} - {productPrice} | Shopping Spree
        </title>
        <meta name='description' content={productDescription} />
        <meta
          name='keywords'
          content={`${product.name}, mua ${product.name}, ${product.name} giá rẻ, ${product.name} online, sản phẩm chất lượng`}
        />
        <meta property='og:title' content={`${product.name} - ${productPrice} | Shopping Spree`} />
        <meta property='og:description' content={productDescription} />
        <meta property='og:type' content='product' />
        <meta property='og:url' content={window.location.href} />
        {product.images && product.images[0] && <meta property='og:image' content={product.images[0]} />}
        <meta property='product:price:amount' content={String(product.price)} />
        <meta property='product:price:currency' content='VND' />
        <meta property='product:availability' content={product.quantity > 0 ? 'in stock' : 'out of stock'} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${product.name} - ${productPrice}`} />
        <meta name='twitter:description' content={productDescription} />
        {product.images && product.images[0] && <meta name='twitter:image' content={product.images[0]} />}
      </Helmet>
      <div className='bg-gray-200 py-6' role='main'>
        <div className='container'>
          <article className='bg-white p-4 shadow'>
            <header className='flex flex-col lg:flex-row gap-6 lg:gap-9'>
              <section className='lg:w-[460px] lg:shrink-0' aria-label='Product images'>
                <h2 className='sr-only'>{t('product:productImages')}</h2>
                <figure
                  className='w-full pt-[100%] relative shadow overflow-hidden cursor-zoom-in'
                  onMouseMove={handleZoom}
                  onMouseLeave={handleZoomLeave}
                >
                  <img
                    ref={imageRef}
                    src={activeImage}
                    alt={product.name}
                    className='absolute top-0 left-0 size-full bg-white object-cover pointer-events-none'
                    loading='eager'
                    width={400}
                    height={400}
                  />
                </figure>
                <nav className='relative mt-4 grid grid-cols-5 gap-1' aria-label='Product image gallery'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30'
                    aria-label='Previous image'
                    onClick={handlePreviousImage}
                  >
                    <ChevronLeft className='size-4' />
                  </Button>
                  {currentImages.map((img, index) => {
                    const isActive = img === activeImage

                    return (
                      <figure
                        className='relative w-full pt-[100%]'
                        key={img}
                        onMouseEnter={handleSelectActiveImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Ảnh sản phẩm ${product.name} ${index + 1}`}
                          className='absolute top-0 left-0 size-full bg-white object-cover cursor-pointer'
                          loading='lazy'
                          width='80'
                          height='80'
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-orange-500'></div>}
                      </figure>
                    )
                  })}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white hover:bg-black/30'
                    aria-label='Next image'
                    onClick={handleNextImage}
                  >
                    <ChevronRight className='size-4' />
                  </Button>
                </nav>
              </section>

              <section className='lg:flex-1' aria-labelledby='product-title'>
                <header>
                  <h1 id='product-title' className='text-xl font-medium uppercase'>
                    {product.name}
                  </h1>

                  <div className='mt-8 flex items-center' role='group' aria-label='Product rating and sales'>
                    <div className='flex items-center'>
                      <span className='mr-1 border-b border-b-orange-500 text-orange-500'>{product.rating}</span>
                      <StarRating rating={product.rating} size='md' color='orange' />
                    </div>
                    <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                    <div>
                      <span>{formatNumberToSocialStyle(product.sold)}</span>
                      <span className='ml-1 text-gray-500'>{t('product:sold')}</span>
                    </div>
                  </div>
                </header>

                <section
                  className='mt-8 flex items-center flex-wrap gap-y-2 bg-gray-50 px-5 py-4'
                  aria-label='Pricing information'
                >
                  <h2 className='sr-only'>{t('product:pricingInfo')}</h2>
                  <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                  <div className='ml-3 text-3xl font-medium text-orange-500'>₫{formatCurrency(product.price)}</div>
                  <div className='ml-4 rounded-sm bg-orange-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                    {calculateDiscountPercentage(product.price_before_discount, product.price)} {t('product:discount')}
                  </div>
                </section>

                <section className='mt-8 flex items-center flex-wrap gap-3' aria-label='Quantity selection'>
                  <h2 className='sr-only'>{t('product:selectQuantity')}</h2>
                  <div className='capitalize text-gray-500'>{t('product:quantity')}</div>
                  <QuantityController
                    value={buyCount}
                    max={product.quantity}
                    onType={handleBuyCount}
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                  />
                  <div className='ml-0 lg:ml-6 text-sm text-gray-500'>
                    {product.quantity} {t('product:available')}
                  </div>
                </section>

                <footer className='mt-8 flex items-center flex-wrap gap-4' role='group' aria-label='Purchase actions'>
                  <Button
                    variant='secondary'
                    size='lg'
                    className='capitalize'
                    onClick={handleAddToCart}
                    loading={isAddingToCart}
                    loadingText={t('common:loading.addingToCart')}
                  >
                    <ShoppingCart className='size-4' />
                    {t('common:actions.addToCart')}
                  </Button>
                  <Button variant='primary' size='lg' className='min-w-[5rem] capitalize' onClick={handleBuyNow}>
                    {t('common:actions.buyNow')}
                  </Button>
                </footer>
              </section>
            </header>
          </article>
        </div>

        <div className='container'>
          <article className='mt-8 bg-white p-4 shadow'>
            <header>
              <h2 className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>
                {t('product:productDescription')}
              </h2>
            </header>
            <section className='mx-4 mt-12 mb-4 text-sm leading-loose' aria-label='Product description'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
            </section>
          </article>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
