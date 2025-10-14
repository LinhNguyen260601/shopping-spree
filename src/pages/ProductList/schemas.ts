import type { PriceFormData } from '@/pages/ProductList/types'
import { object, string } from 'yup'

const isPriceRangeValid = (context: { parent: PriceFormData }) => {
  const { price_min, price_max } = context.parent

  if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)

  return price_min !== '' || price_max !== ''
}

export const priceRangeSchema = object({
  price_min: string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function () {
      return isPriceRangeValid(this)
    }
  }),
  price_max: string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: function () {
      return isPriceRangeValid(this)
    }
  })
})
