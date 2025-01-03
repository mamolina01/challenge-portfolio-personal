export interface Currency {
  name: string
  symbol: string
}

export interface Currencies {
  [key: string]: Currency
}

export interface GetCurrenciesResponse {
  ok: boolean
  data: Currencies | null
}
