export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const formatCurrency = (value: number, currency?: string) => Intl.NumberFormat('it-It', { style: 'currency', currency: currency ? currency : 'EUR' }).format(value)