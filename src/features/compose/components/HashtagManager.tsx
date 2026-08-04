import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import Card from '@/components/ui/Card'

export interface HashtagManagerProps {
  hashtags: string[]
  onAdd: (tag: string) => void
  onRemove: (index: number) => void
}

export default function HashtagManager({ hashtags, onAdd, onRemove }: HashtagManagerProps) {
  const [value, setValue] = useState('')

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault()
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <Card className="mt-4 px-[18px] py-4">
      <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-text-muted">
        Hashtags
      </h4>
      <div className="flex flex-wrap items-center gap-2">
        {hashtags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="flex items-center gap-1.5 rounded-btn border border-border bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-accent"
          >
            #{tag}
            <button onClick={() => onRemove(i)} className="text-text-muted hover:text-error">
              <X className="h-3 w-3" strokeWidth={1.8} />
            </button>
          </span>
        ))}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a hashtag and press Enter…"
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1.5 text-[13px] text-text-primary placeholder:text-text-muted outline-none"
        />
      </div>
    </Card>
  )
}
