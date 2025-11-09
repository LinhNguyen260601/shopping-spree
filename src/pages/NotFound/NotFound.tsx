import { Helmet } from '@dr.pogodin/react-helmet'
import Button from '@/components/Button'
import { PATH } from '@/constants'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation('notFound')

  return (
    <>
      <Helmet>
        <title>Không Tìm Thấy Trang - 404 | Shopping Spree</title>
        <meta
          name='description'
          content='Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Quay lại trang chủ Shopping Spree để tiếp tục mua sắm các sản phẩm yêu thích.'
        />
        <meta name='keywords' content='404, không tìm thấy trang, lỗi, shopping spree' />
        <meta property='og:title' content='Không Tìm Thấy Trang - 404 | Shopping Spree' />
        <meta
          property='og:description'
          content='Trang bạn đang tìm kiếm không tồn tại. Quay lại trang chủ Shopping Spree để tiếp tục mua sắm.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={window.location.href} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Không Tìm Thấy Trang - 404 | Shopping Spree' />
        <meta name='twitter:description' content='Trang bạn đang tìm kiếm không tồn tại. Quay lại trang chủ để tiếp tục mua sắm.' />
        <meta name='robots' content='noindex, nofollow' />
      </Helmet>
      <main className='grid min-h-full place-items-center bg-white to-neutral-100 px-6 py-24 sm:py-32 lg:px-8'>
      <header className='text-center'>
        <p className='text-9xl font-semibold text-orange-500'>404</p>
        <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-800 sm:text-7xl'>
          {t('title')}
        </h1>
        <p className='mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
          {t('message')}
        </p>
        <nav className='mt-10 flex items-center justify-center gap-x-6'>
          <Link to={PATH.HOME}>
            <Button size='lg' variant='primary'>
              {t('backToHome')}
            </Button>
          </Link>
        </nav>
      </header>
    </main>
    </>
  )
}

export default NotFound
