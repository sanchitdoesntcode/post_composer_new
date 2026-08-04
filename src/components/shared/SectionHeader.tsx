import { ArrowRight } from 'lucide-react'

export interface SectionHeaderProps {
  title: string
  onViewAll?: () => void
}

export default function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <div className="mb-4 mt-9 flex items-center justify-between">
      <h2 className="font-head text-lg">{title}</h2>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[12.5px] text-text-secondary transition-colors hover:text-accent"
        >
          View all <ArrowRight className="h-[13px] w-[13px]" strokeWidth={1.8} />
        </button>
      )}
    </div>
  )
}
