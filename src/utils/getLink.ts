import { Currencies } from '@/interfaces'

export const getLink = (currency: string, currencies: Currencies) => {
  const link = `https://www.xe.com/currency/${currency}-${currencies[currency].name.replace(' ', '-')}/`.toLowerCase()
  return link
}
