import React from 'react'

export const Input = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="rounded border border-neutral-400 w-[279px] h-10 px-2 font-semibold outline-none focus:border-neutral-600"
      {...rest}
    />
  )
}
