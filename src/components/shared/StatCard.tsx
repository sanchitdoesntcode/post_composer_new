import type { LucideIcon } from 'lucide-react'
import Card from '@/components/ui/Card'

export interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  caption?: string
  trend?: string
}

export default function StatCard({ label, value, icon: Icon, caption, trend }: StatCardProps) {
  return (
    <Card className="px-[22px] py-5">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs text-text-muted">{label}</span>
        <Icon className="h-4 w-4 text-text-muted" strokeWidth={1.8} />
      </div>
      <div className="font-mono text-[26px] font-semibold">{value}</div>
      {caption && <div className="mt-1 text-xs text-text-muted">{caption}</div>}
      {trend && <div className="mt-2 font-mono text-[11px] text-success">{trend}</div>}
    </Card>
  )
}
