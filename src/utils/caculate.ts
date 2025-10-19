export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) =>
  Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) + '%'
