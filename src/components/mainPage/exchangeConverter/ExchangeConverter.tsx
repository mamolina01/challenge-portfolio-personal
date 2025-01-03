'use client'
import { Input } from '@/components/ui'
import Image from 'next/image'
import React from 'react'
import switchCurrency from '@/public/switchCurrency.png'

export const ExchangeConverter = () => {
  return (
    <div className="bg-white p-4 lg:p-10 lg:pb-4 rounded-lg h-max flex flex-col gap-6 lg:gap-10 shadow-lg max-w-[311px] w-full lg:max-w-[1126px]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="font-semibold">
            Amount
          </label>
          <Input id="amount" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="from" className="font-semibold">
            From
          </label>
          <Input id="from" />
        </div>
        <Image src={switchCurrency} alt="switchCurrency" />
        <div className="flex flex-col gap-2">
          <label htmlFor="to" className="font-semibold">
            To
          </label>
          <Input id="to" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-2xl lg:text-[32px] font-semibold">1.00 Euro =</span>
            <span className="text-2xl lg:text-[32px] font-semibold">1.0627478 US Dollars</span>
          </div>
          <span className="text-neutral-400">1 US Dollars = 0.941004 EUR</span>
        </div>
        <div className="flex flex-col gap-4 justify-end self-end lg:mt-10">
          <div className="bg-light-blue p-5 w-[518px] rounded-lg hidden lg:block">
            <span className="text-sm">
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive
              this rate when sending money.
            </span>
          </div>
          <p className="text-sm self-end text-wrap">
            <span className="underline">Euro</span> to <span className="underline">US Dollar</span> conversion - Last
            updated Dec 15, 2022, 19:17 UTC
          </p>
        </div>
      </div>
    </div>
  )
}
