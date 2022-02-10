import localeCurrency from 'locale-currency'

export const GetLocaleCurrency = (locale, value) => {
  if (typeof value === 'number' && typeof locale === 'string') {
    const majorUnits = value / 100
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: localeCurrency.getCurrency(locale),
    }).format(majorUnits)
  }
}
