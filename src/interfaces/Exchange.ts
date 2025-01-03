export interface ExchangeProps {
  amount: string
  fromCurrency: string
  toCurrency: string
}

export interface ExchangeResponse {
  date: string
  base: string
  rates: { [key: string]: number }
}

export interface GetExchangesResponse {
  fromCurrencyResponse: ExchangeResponse
  toCurrencyResponse: ExchangeResponse
}
