import type { LucideIcon } from 'lucide-react'
import Button from '@/components/ui/Button'

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
        <Icon className="h-6 w-6 text-text-muted" strokeWidth={1.8} />
      </div>
      <h3 className="mb-1.5 text-base font-semibold">{title}</h3>
      <p className="mx-auto mb-[18px] max-w-[280px] text-[13px] text-text-muted">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
