'use client'
import React, { useState } from 'react'
import { ExchangeConverter } from './exchangeConverter/ExchangeConverter'
import { Currencies, ExchangeProps } from '@/interfaces'

interface Props {
  currencies: Currencies | null
}

export const MainPage = ({ currencies }: Props) => {
  const [exchangeState, setExchangeState] = useState<ExchangeProps>({
    amount: '1',
    fromCurrency: 'USD',
    toCurrency: 'EUR'
  })

  if (currencies === null) return <p>Something went wrong</p>

  return (
    <div className="h-[295px] max-h-[295px] flex flex-col gap-6 lg:gap-14 overflow-visible w-full items-center pt-6 lg:pt-10 bg-blue">
      <span className="text-[32px] font-semibold text-white text-center max-w-[311px] lg:max-w-[1126px]">
        {exchangeState.amount} {exchangeState.fromCurrency} to {exchangeState.toCurrency} - Convert{' '}
        {currencies[exchangeState.fromCurrency].name} to {currencies[exchangeState.toCurrency].name}
      </span>
      <ExchangeConverter currencies={currencies} exchangeState={exchangeState} setExchangeState={setExchangeState} />
    </div>
  )
}
