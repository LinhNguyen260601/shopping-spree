import Button from '@/components/Button'
import { PATH } from '@/constants'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation('notFound')

  return (
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
  )
}

export default NotFound
