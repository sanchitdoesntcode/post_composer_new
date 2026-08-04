import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Button from '@/components/ui/Button'
import SearchInput from '@/components/shared/SearchInput'
import EmptyState from '@/components/shared/EmptyState'
import { FolderOpen } from 'lucide-react'
import { useDrafts } from '@/features/drafts/hooks/useDrafts'
import DraftCard from '@/features/drafts/components/DraftCard'

type FilterKey = 'all' | 'favorites' | 'archived'

export default function DraftsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const { filtered, favorites } = useDrafts({ query, onlyFavorites: filter === 'favorites' })

  const visible = filter === 'favorites' ? favorites : filtered

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            Organize
          </span>
          <h1 className="mt-2 font-head text-[28px] tracking-tight">Drafts</h1>
          <p className="text-sm text-text-secondary">
            Every draft you&rsquo;ve started, all in one searchable place.
          </p>
        </div>
        <Button size="sm" onClick={() => navigate('/compose')}>
          <Plus className="h-3.5 w-3.5" strokeWidth={1.8} /> New Post
        </Button>
      </div>

      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex gap-2">
          {(['all', 'favorites', 'archived'] as FilterKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'rounded-btn border px-3.5 py-2 text-[12.5px] capitalize transition-colors',
                filter === key
                  ? 'border-[rgba(255,64,64,0.35)] bg-surface-2 text-text-primary'
                  : 'border-border bg-surface text-text-secondary'
              )}
            >
              {key}
            </button>
          ))}
        </div>
        <SearchInput
          placeholder="Search drafts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[260px]"
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No drafts here yet"
          description="Start writing and it'll show up in this list automatically."
          actionLabel="New Post"
          onAction={() => navigate('/compose')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((d) => (
            <DraftCard key={d.id} draft={d} />
          ))}
        </div>
      )}
    </section>
  )
}
