'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  showLoader?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  showLoader = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || showLoader}
      className={clsx(
        `
          flex
          items-center
          justify-center
          h-14
          rounded-xl
          px-6
          font-semibold
          transition-all
          duration-300
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        `,

        variant === 'primary' &&
          `
            bg-primary
            text-white
            hover:bg-primary-hover
            hover:shadow-lg
            hover:shadow-primary/30
          `,

        variant === 'secondary' &&
          `
            border
            border-border-light
            bg-surface
            text-text-primary
            hover:bg-surface-muted
          `,

        fullWidth && 'w-full',

        className
      )}
      {...props}
    >
      {showLoader ? (
        <div
          className="
            h-5
            w-5
            animate-spin
            rounded-full
            border-2
            border-white/30
            border-t-white
          "
        />
      ) : (
        children
      )}
    </button>
  )
}