import React from 'react'

export const Input = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="rounded border border-neutral-400 w-[279px] h-10 px-3 font-semibold flex items-center gap-1">
      <span>$</span>
      <input className="h-full w-full outline-none focus:border-neutral-600" {...rest} />
    </div>
  )
}
