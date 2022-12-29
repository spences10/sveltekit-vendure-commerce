import { currencyCode } from '$stores/currencyCode'
import { userLocale } from '$stores/locale'
import { get } from 'svelte/store'

export const formatCurrency = (value: number) => {
  const majorUnits = value / 100

  const locale = get(userLocale) ?? 'en-US'
  const currency = get(currencyCode) ?? 'USD'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(majorUnits)
}

// https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
/** Dispatch event on click outside of node */
export const clickOutside = (node: any) => {
  const handleClick = (event: any) => {
    if (
      node &&
      !node.contains(event.target) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(new CustomEvent('click_outside', node))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}
