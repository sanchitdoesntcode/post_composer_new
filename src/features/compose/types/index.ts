import type { PlatformId } from '@/types'

export interface ComposeState {
  editingDraftId: string | null
  text: string
  platform: PlatformId
  hashtags: string[]
  lastSavedAt: string | null
}
