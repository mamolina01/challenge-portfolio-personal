import React from 'react'

export const Select = ({ children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      className="rounded border border-neutral-400 w-[279px] h-10 px-2 font-semibold outline-none focus:border-neutral-600 bg-white"
      {...rest}
    >
      {children}
    </select>
  )
}
