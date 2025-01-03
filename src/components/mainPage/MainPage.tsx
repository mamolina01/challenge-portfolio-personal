import React from 'react'
import { ExchangeConverter } from './exchangeConverter/ExchangeConverter'

export const MainPage = () => {
  return (
    <div className="h-[295px] max-h-[295px] flex flex-col gap-6 lg:gap-14 overflow-visible w-full items-center pt-6 lg:pt-10 bg-blue">
      <span className="text-[32px] font-semibold text-white text-center">
        100 EUR to USD - Convert Euros to US Dollars
      </span>
      <ExchangeConverter />
    </div>
  )
}
