import type { HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dot?: boolean
}

export default function Badge({ dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-btn border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary',
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />}
      {children}
    </span>
  )
}
