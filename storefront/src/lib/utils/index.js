export const GetLocaleCurrency = (currencyCode, value) => {
  if (typeof value === 'number' && typeof currencyCode === 'string') {
    const majorUnits = value / 100
    return new Intl.NumberFormat(currencyCode, {
      style: 'currency',
      currency: 'GBP', // TODO: get this from the user's locale
    }).format(majorUnits)
  }
}
