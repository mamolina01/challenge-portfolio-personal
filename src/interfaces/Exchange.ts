export interface ExchangeProps {
  amount: string
  fromCurrency: string
  toCurrency: string
}

export interface GetExchangeResponse {
  date: string
  base: string
  rates: { [key: string]: number }
}
