import { forwardRef, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        'w-full rounded-input border border-border bg-surface-2 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors duration-DEFAULT focus:border-[rgba(255,64,64,0.4)]',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export default Input
