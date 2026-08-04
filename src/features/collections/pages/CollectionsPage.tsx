import { Plus, Layers } from 'lucide-react'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/shared/EmptyState'
import { useCollections } from '@/features/collections/hooks/useCollections'
import CollectionCard from '@/features/collections/components/CollectionCard'

export default function CollectionsPage() {
  const { all, createCollection } = useCollections()

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            Organize
          </span>
          <h1 className="mt-2 font-head text-[28px] tracking-tight">Collections</h1>
          <p className="text-sm text-text-secondary">
            Group related drafts so nothing gets lost between campaigns.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => createCollection('New Collection', 'linear-gradient(135deg,#555,#333)')}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.8} /> New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {all.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>

      <div className="mt-6">
        <EmptyState
          icon={Layers}
          title="Build your next collection"
          description="Group drafts by campaign, platform, or theme to keep your workspace tidy."
        />
      </div>
    </section>
  )
}
