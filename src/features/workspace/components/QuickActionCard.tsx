import type { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'

export interface QuickActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  onClick: () => void
}

export default function QuickActionCard({
  icon: Icon,
  title,
  description,
  onClick,
}: QuickActionCardProps) {
  return (
    <Card hoverable className="flex flex-col gap-3.5 p-5" onClick={onClick}>
      <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-surface-2">
        <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.8} />
      </div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-[12.5px] text-text-muted">{description}</p>
      </div>
    </Card>
  )
}
