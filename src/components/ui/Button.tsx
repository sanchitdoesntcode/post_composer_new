import { forwardRef, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-all duration-DEFAULT ease-ascoser active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'rounded-btn text-white bg-gradient-to-br from-primary to-secondary shadow-[0_4px_20px_rgba(197,30,30,0.35)] hover:shadow-[0_6px_28px_rgba(197,30,30,0.55)] hover:-translate-y-px',
  secondary:
    'rounded-btn glass text-text-primary hover:bg-surface-hover',
  ghost: 'rounded-input text-text-secondary hover:text-text-primary hover:bg-surface-2',
}

const sizes: Record<Size, string> = {
  sm: 'text-[13px] px-4 py-2',
  md: 'text-sm px-[22px] py-3',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export default Button
