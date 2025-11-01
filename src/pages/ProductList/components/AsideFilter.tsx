import Button from '@/components/Button'
import InputController from '@/components/InputController'
import StarRating from '@/components/StarRating'
import { PATH } from '@/constants'
import CategorySkeleton from '@/pages/ProductList/components/CategorySkeleton'
import { useAsideFilterController } from '@/pages/ProductList/controllers'
import type { QueryConfig } from '@/pages/ProductList/types'
import type { Category } from '@/types'
import { buildLinkWithUpdatedQuery, cn } from '@/utils'
import { Funnel, Logs, StepForward } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface AsideFilterProps {
  categories: Category[]
  queryConfig: QueryConfig
  isLoadingCategories?: boolean
}

const AsideFilter = ({ categories, queryConfig, isLoadingCategories }: AsideFilterProps) => {
  const { t } = useTranslation(['home', 'productList', 'common'])
  const { category } = queryConfig

  const { control, errors, handleInputNumberChange, handleRemoveLeftAsideFilter, onSubmit } =
    useAsideFilterController(queryConfig)

  return (
    <aside className='py-4' role='complementary' aria-label={t('productList:productCategories')}>
      <header>
        <Link
          to={PATH.HOME}
          className={cn('flex items-center font-bold', {
            'text-orange-600': !category
          })}
        >
          <Logs size={20} className='mr-3' aria-hidden='true' />
          {t('home:asideFilter.allCategories')}
        </Link>
      </header>

      <hr className='bg-gray-300 h-[1px] my-4 border-0' />

      <nav aria-label={t('productList:productCategories')}>
        <h2 className='sr-only'>{t('productList:productCategories')}</h2>
        {isLoadingCategories ? (
          <CategorySkeleton />
        ) : (
          <ul>
            {categories.map((categoryItem) => {
              const isActive = category === categoryItem._id

              return (
                <li className='py-2 pl-2' key={categoryItem._id}>
                  <Link
                    to={buildLinkWithUpdatedQuery(queryConfig, 'category', categoryItem._id)}
                    className={cn('relative px-2', {
                      'text-orange-600 hover:text-orange-600 font-semibold': isActive
                    })}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <StepForward className='text-orange-600 size-3 absolute top-1 left-[-10px]' aria-hidden='true' />
                    )}
                    {categoryItem.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </nav>

      <section className='mt-4'>
        <header>
          <h3 className='flex items-center font-bold uppercase text-gray-900'>
            <Funnel className='mr-3 size-3' aria-hidden='true' />
            {t('home:asideFilter.searchFilters')}
          </h3>
        </header>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <fieldset className='my-5'>
          <legend className='text-sm font-medium mb-2 text-gray-900'>{t('productList:priceRange')}</legend>
          <form className='mt-2' role='search' aria-label={t('productList:applyPriceFilter')} onSubmit={onSubmit}>
            <div className='flex items-start'>
              <InputController
                control={control}
                name='price_min'
                type='number'
                className='grow'
                placeholder={`₫ ${t('productList:priceFrom')}`}
                classNameInput='p-1 bg-white'
                classNameError='hidden'
                aria-label={t('productList:priceFrom')}
                onChange={handleInputNumberChange('price_min')}
              />
              <span className='mx-2 mt-2 shrink-0' aria-hidden='true'>
                -
              </span>
              <InputController
                control={control}
                name='price_max'
                type='number'
                className='grow'
                placeholder={`₫ ${t('productList:priceTo')}`}
                classNameInput='p-1 bg-white'
                classNameError='hidden'
                aria-label={t('productList:priceTo')}
                onChange={handleInputNumberChange('price_max')}
              />
            </div>
            <div className='text-center mt-1 text-red-600 text-sm min-h-[1.25rem]'>{errors.price_min?.message}</div>
            <Button
              type='submit'
              variant='primary'
              size='sm'
              fullWidth
              className='uppercase'
              aria-label={t('productList:applyPriceFilter')}
            >
              {t('common:actions.apply')}
            </Button>
          </form>
        </fieldset>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <fieldset>
          <legend className='text-sm font-medium mb-2 text-gray-900'>{t('productList:rating')}</legend>
          <ul className='my-3'>
            {Array.from({ length: 5 })
              .map((_, index) => (
                <li className='py-1 pl-2' key={index}>
                  <Link
                    to={buildLinkWithUpdatedQuery(queryConfig, 'rating_filter', index + 1)}
                    className='flex items-center text-sm gap-1 text-gray-800 hover:text-orange-600'
                    aria-label={`${t('productList:viewProduct')} ${index + 1} ${t('productList:rating')} ${t('productList:andAbove')}`}
                  >
                    <StarRating rating={index + 1} />
                    {index + 1 < 5 && <span>{t('productList:andAbove')}</span>}
                  </Link>
                </li>
              ))
              .reverse()}
          </ul>
        </fieldset>

        <hr className='bg-gray-300 h-[1px] my-4 border-0' />

        <footer>
          <Button
            variant='primary'
            size='sm'
            fullWidth
            className='uppercase'
            aria-label={t('productList:removeAllFilters')}
            onClick={handleRemoveLeftAsideFilter}
          >
            {t('common:actions.deleteAll')}
          </Button>
        </footer>
      </section>
    </aside>
  )
}

export default AsideFilter
