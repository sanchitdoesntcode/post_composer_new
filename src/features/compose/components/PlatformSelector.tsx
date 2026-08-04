import clsx from 'clsx'
import { PLATFORMS } from '@/features/compose/constants/platforms'
import type { PlatformId } from '@/types'

export interface PlatformSelectorProps {
  value: PlatformId
  onChange: (id: PlatformId) => void
}

export default function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div className="mb-[18px] flex flex-wrap gap-2">
      {PLATFORMS.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={clsx(
            'flex items-center gap-2 rounded-btn border px-3.5 py-2 text-[12.5px] transition-colors duration-DEFAULT',
            p.id === value
              ? 'border-[rgba(255,64,64,0.4)] bg-gradient-to-br from-[rgba(197,30,30,0.16)] to-[rgba(255,64,64,0.05)] text-text-primary'
              : 'border-border bg-surface text-text-secondary'
          )}
        >
          <span
            className="flex h-4 w-4 items-center justify-center rounded-[5px] font-mono text-[8px] font-bold text-white"
            style={{ background: p.color }}
          >
            {p.name[0]}
          </span>
          {p.name} · {p.limit.toLocaleString()}
        </button>
      ))}
    </div>
  )
}
