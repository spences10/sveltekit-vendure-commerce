export const formatCurrency = (currency, value) => {
  if (typeof value === 'number') {
    const majorUnits = value / 100
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).format(majorUnits)
  }
}
