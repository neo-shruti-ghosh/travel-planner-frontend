'use client'

import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...props}
          placeholder=" "
          className={clsx(
            `
              peer
              h-14
              w-full
              rounded-xl
              border
              bg-surface
              px-4
              pt-5
              text-text-primary
              outline-none
              transition-all
              duration-300
            `,
            error
              ? `
                border-red-500
                focus:border-red-500
                focus:ring-4
                focus:ring-red-500/20
                animate-[shake_0.3s_ease-in-out]
              `
              : `
                border-border-light
                focus:border-primary
                focus:ring-4
                focus:ring-primary/20
              `
          )}
        />

        <label
          className={clsx(
            `
              absolute
              left-4
              transition-all
              duration-300

              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base

              peer-focus:top-2
              peer-focus:text-xs

              peer-not-placeholder-shown:top-2
              peer-not-placeholder-shown:text-xs
            `,
            error
              ? `
                top-2
                text-xs
                text-red-500
              `
              : `
                top-4
                text-sm
                text-text-secondary
                peer-focus:text-primary
              `
          )}
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}