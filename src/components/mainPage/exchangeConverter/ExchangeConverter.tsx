'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Currencies } from '@/interfaces/Currencies'
import { ExchangeProps, GetExchangesResponse } from '@/interfaces'
import { formatDate, getLink } from '@/utils'
import { Input, Select, CurrencyLoading, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'
import Image from 'next/image'
import switchCurrency from '@/public/switchCurrency.png'
import { toast } from 'sonner'
import Link from 'next/link'

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
      const { fromCurrencyResponse, toCurrencyResponse }: GetExchangesResponse = await fetch(
        `/api/get-exchange?from-currency=${exchangeState.fromCurrency}&to-currency=${exchangeState.toCurrency}`
      ).then(data => data.json())

      setCurrencyExchange({
        firstCurrency: `${fromCurrencyResponse.rates[exchangeState.toCurrency]}`,
        secondCurrency: `${toCurrencyResponse.rates[exchangeState.fromCurrency]}`
      })

      setLastUpdated(formatDate(fromCurrencyResponse.date))

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong')
    }
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

  const handleInput = (value: string) => {
    if (isNaN(Number(value))) return

    if (Number(value) < 0 || value === '') {
      updateState({ amount: '0' })
      return
    }

    updateState({ amount: value })
  }

  return (
    <div className="bg-white p-4 lg:p-10 lg:pb-4 rounded-lg h-max flex flex-col gap-6 lg:gap-0 shadow-lg w-full max-w-[311px] lg:max-w-[1126px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="font-semibold">
            Amount
          </label>
          <Input id="amount" type="number" value={exchangeState.amount} onChange={e => handleInput(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="from" className="font-semibold">
            From
          </label>
          <Select value={exchangeState.fromCurrency} onValueChange={value => updateState({ fromCurrency: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencies).map(([code, currencyCode]) => (
                <SelectItem className="capitalize" value={code} key={code} disabled={exchangeState.toCurrency === code}>
                  {currencyCode.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Image src={switchCurrency} alt="switchCurrency" className="cursor-pointer" onClick={switchCurrencies} />
        <div className="flex flex-col gap-2">
          <label htmlFor="to" className="font-semibold">
            To
          </label>
          <Select value={exchangeState.toCurrency} onValueChange={value => updateState({ toCurrency: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencies).map(([code, currencyCode]) => (
                <SelectItem
                  className="capitalize"
                  value={code}
                  key={code}
                  disabled={exchangeState.fromCurrency === code}
                >
                  {currencyCode.name}
                </SelectItem>
              ))}
            </SelectContent>
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
                {Number(exchangeState.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 5
                })}{' '}
                {currencies[exchangeState.fromCurrency].name} =
              </span>
              <span className="text-2xl lg:text-[32px] font-semibold">
                {(Number(currencyExchange.firstCurrency) * Number(exchangeState.amount)).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 5
                })}{' '}
                {currencies[exchangeState.toCurrency].name}
              </span>
            </div>
            <span className="text-[#757575]">
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
          <div className="bg-light-blue px-6 py-4 w-[518px] rounded-lg hidden lg:block">
            <span className="text-sm leading-9">
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive
              this rate when sending money.
            </span>
          </div>
          <p className="text-xs self-end text-wrap">
            <Link href={getLink(exchangeState.fromCurrency, currencies)} className="underline">
              {currencies[exchangeState.fromCurrency].name}
            </Link>{' '}
            to{' '}
            <Link href={getLink(exchangeState.toCurrency, currencies)} className="underline">
              {currencies[exchangeState.toCurrency].name}
            </Link>{' '}
            conversion {lastUpdated !== null && <>- Last updated {lastUpdated}</>}
          </p>
        </div>
      </div>
    </div>
  )
}
