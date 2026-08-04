import { MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/ui/Card'
import { getPlatform } from '@/features/compose/constants/platforms'
import { formatRelativeTime } from '@/utils/formatDate'
import { countWords } from '@/utils/textStats'
import type { Draft } from '@/features/drafts/types'

export interface DraftCardProps {
  draft: Draft
}

export default function DraftCard({ draft }: DraftCardProps) {
  const navigate = useNavigate()
  const platform = getPlatform(draft.platform)

  return (
    <Card hoverable className="flex flex-col gap-3 p-[18px]" onClick={() => navigate('/compose')}>
      <div className="flex items-center justify-between">
        <span
          className="flex h-[22px] w-[22px] items-center justify-center rounded-[7px] font-mono text-[10px] font-bold text-white"
          style={{ background: platform.color }}
        >
          {platform.name[0]}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-text-muted hover:bg-surface-2 hover:text-text-primary"
        >
          <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.8} />
        </button>
      </div>
      <div>
        <div className="mb-1.5 text-sm font-semibold">{draft.title}</div>
        <div className="min-h-[56px] text-[13px] leading-[1.5] text-text-secondary">
          {draft.body}
        </div>
      </div>
      <div className="flex justify-between font-mono text-[11px] text-text-muted">
        <span>{formatRelativeTime(draft.updatedAt)}</span>
        <span>{countWords(draft.body)} words</span>
      </div>
    </Card>
  )
}
