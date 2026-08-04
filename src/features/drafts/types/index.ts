import type { PlatformId } from '@/types'

export interface Draft {
  id: string
  title: string
  body: string
  platform: PlatformId
  hashtags: string[]
  favorite: boolean
  archived: boolean
  updatedAt: string
  createdAt: string
}
