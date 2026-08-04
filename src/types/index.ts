export type ThemeMode = 'dark' | 'light'

export type PlatformId = 'x' | 'linkedin' | 'instagram' | 'facebook' | 'threads'

export interface Platform {
  id: PlatformId
  name: string
  limit: number
  color: string
  handle: string
}
