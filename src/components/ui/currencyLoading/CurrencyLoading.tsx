import React from 'react'

export const CurrencyLoading = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex items-baseline gap-2">
        <div className="h-10 w-40 bg-neutral-200 rounded"></div>
        <div className="h-10 w-10 bg-neutral-200 rounded"></div>
      </div>

      <div className="flex items-baseline gap-2">
        <div className="h-10 w-60 bg-neutral-200 rounded"></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-6 w-16 bg-neutral-200 rounded"></div>
        <div className="h-6 w-4 bg-neutral-200 rounded"></div>
        <div className="h-6 w-16 bg-neutral-200 rounded"></div>
      </div>
    </div>
  )
}
