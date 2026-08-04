import { forwardRef, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'inline-flex h-[38px] w-[38px] items-center justify-center rounded-full text-text-secondary transition-colors duration-DEFAULT hover:bg-surface-2 hover:text-text-primary',
        className
      )}
      {...props}
    />
  )
)
IconButton.displayName = 'IconButton'

export default IconButton
