import { forwardRef, type HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'bg-surface border border-border rounded-card shadow-card transition-all duration-DEFAULT ease-ascoser',
        hoverable &&
          'hover:-translate-y-[3px] hover:border-[rgba(197,30,30,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(197,30,30,0.25)] cursor-pointer',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export default Card
