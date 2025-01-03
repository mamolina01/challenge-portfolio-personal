'use server'

import { GetCurrenciesResponse } from '@/interfaces/Currencies'

export const getCurrencies = async (): Promise<GetCurrenciesResponse> => {
  try {
    const data = await fetch(`https://api.vatcomply.com/currencies`)
      .then(data => data.json())
      .then(response => response)

    return {
      ok: true,
      data: data
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: null
    }
  }
}
