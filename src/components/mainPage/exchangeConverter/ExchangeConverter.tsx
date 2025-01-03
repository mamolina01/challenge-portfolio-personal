'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Currencies } from '@/interfaces/Currencies'
import { ExchangeProps, GetExchangeResponse } from '@/interfaces'
import { formatDate } from '@/utils'
import { Input, Select, CurrencyLoading } from '@/components/ui'
import Image from 'next/image'
import switchCurrency from '@/public/switchCurrency.png'

interface Props {
  currencies: Currencies
  exchangeState: ExchangeProps
  setExchangeState: (exchangeState: ExchangeProps) => void
}

interface CurrencyExchange {
  firstCurrency: string
  secondCurrency: string
}

export const ExchangeConverter = ({ currencies, exchangeState, setExchangeState }: Props) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currencyExchange, setCurrencyExchange] = useState<CurrencyExchange>({ firstCurrency: '', secondCurrency: '' })

  const fetchExchangeRates = useCallback(async () => {
    try {
      setIsLoading(true)
      setLastUpdated(null)
      const exchangeFromCurrency: GetExchangeResponse = await fetch(
        `/api/get-exchange?currency=${exchangeState.fromCurrency}`
      ).then(data => data.json())

      const exchangeToCurrency: GetExchangeResponse = await fetch(
        `/api/get-exchange?currency=${exchangeState.toCurrency}`
      ).then(data => data.json())

      setCurrencyExchange({
        firstCurrency: `${exchangeFromCurrency.rates[exchangeState.toCurrency]}`,
        secondCurrency: `${exchangeToCurrency.rates[exchangeState.fromCurrency]}`
      })

      setLastUpdated(formatDate(exchangeFromCurrency.date))
    } catch (error) {}
    setIsLoading(false)
  }, [exchangeState.fromCurrency, exchangeState.toCurrency])

  useEffect(() => {
    fetchExchangeRates()
  }, [fetchExchangeRates])

  const updateState = (newState: Partial<ExchangeProps>) => {
    setExchangeState({ ...exchangeState, ...newState })
  }

  const switchCurrencies = () => {
    updateState({
      fromCurrency: exchangeState.toCurrency,
      toCurrency: exchangeState.fromCurrency
    })
  }

  return (
    <div className="bg-white p-4 lg:p-10 lg:pb-4 rounded-lg h-max flex flex-col gap-6 lg:gap-0 shadow-lg max-w-[311px] w-full lg:max-w-[1126px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="font-semibold">
            Amount
          </label>
          <Input id="amount" value={exchangeState.amount} onChange={e => updateState({ amount: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="from" className="font-semibold">
            From
          </label>
          <Select
            id="from"
            value={exchangeState.fromCurrency}
            onChange={e => updateState({ fromCurrency: e.target.value })}
          >
            {Object.entries(currencies).map(([code, currencyCode]) => (
              <option value={code} key={code} disabled={exchangeState.toCurrency === code}>
                {currencyCode.name}
              </option>
            ))}
          </Select>
        </div>
        <Image src={switchCurrency} alt="switchCurrency" className="cursor-pointer" onClick={switchCurrencies} />
        <div className="flex flex-col gap-2">
          <label htmlFor="to" className="font-semibold">
            To
          </label>
          <Select id="to" value={exchangeState.toCurrency} onChange={e => updateState({ toCurrency: e.target.value })}>
            {Object.entries(currencies).map(([code, currencyCode]) => (
              <option value={code} key={code} disabled={exchangeState.fromCurrency === code}>
                {currencyCode.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-10">
        {isLoading ? (
          <CurrencyLoading />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-2xl lg:text-[32px] font-semibold">
                {exchangeState.amount} {currencies[exchangeState.fromCurrency].name} =
              </span>
              <span className="text-2xl lg:text-[32px] font-semibold">
                {(Number(currencyExchange.firstCurrency) * Number(exchangeState.amount)).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 5
                })}{' '}
                {currencies[exchangeState.toCurrency].name}
              </span>
            </div>
            <span className="text-neutral-400">
              1 {exchangeState.toCurrency} ={' '}
              {Number(currencyExchange.secondCurrency).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 5
              })}{' '}
              {exchangeState.fromCurrency}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-4 justify-end self-end lg:mt-28">
          <div className="bg-light-blue p-5 w-[518px] rounded-lg hidden lg:block">
            <span className="text-sm">
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive
              this rate when sending money.
            </span>
          </div>
          <p className="text-xs self-end text-wrap">
            <span className="underline">{currencies[exchangeState.fromCurrency].name}</span> to{' '}
            <span className="underline">{currencies[exchangeState.toCurrency].name}</span> conversion{' '}
            {lastUpdated !== null && <>- Last updated {lastUpdated}</>}
          </p>
        </div>
      </div>
    </div>
  )
}
