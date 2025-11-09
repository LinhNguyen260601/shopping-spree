export const formatCurrency = (
  currency: number,
  locales: Intl.LocalesArgument = 'de-DE',
  options?: Intl.NumberFormatOptions
) => new Intl.NumberFormat(locales, options).format(currency)

export const formatNumberToSocialStyle = (value: number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
