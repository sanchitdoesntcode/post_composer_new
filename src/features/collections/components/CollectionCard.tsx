import Card from '@/components/ui/Card'
import type { Collection } from '@/features/collections/types'

export interface CollectionCardProps {
  collection: Collection
  onClick?: () => void
}

export default function CollectionCard({ collection, onClick }: CollectionCardProps) {
  return (
    <Card hoverable className="flex items-center gap-3 p-[18px]" onClick={onClick}>
      <div
        className="h-10 w-10 flex-shrink-0 rounded-xl"
        style={{ background: collection.color }}
      />
      <div>
        <h4 className="text-[13.5px]">{collection.name}</h4>
        <span className="text-[11.5px] text-text-muted">
          {collection.draftIds.length} drafts
        </span>
      </div>
    </Card>
  )
}
