import type { CurrencyCode } from '$houdini'
import { get } from 'svelte/store'

import { userLocale } from '../../stores/locale'
export const formatCurrency = (
  currency: CurrencyCode,
  value: number
) => {
  if (typeof value === 'number' && currency) {
    const majorUnits = value / 100

    const locale = get(userLocale) ?? 'en-US'

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(majorUnits)
  }
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
