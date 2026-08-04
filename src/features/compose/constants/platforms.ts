import type { Platform } from '@/types'

export const PLATFORMS: Platform[] = [
  { id: 'x', name: 'X', limit: 280, color: '#1a1a1a', handle: '@sanchit' },
  { id: 'linkedin', name: 'LinkedIn', limit: 3000, color: '#0a66c2', handle: 'Sanchit Anand' },
  { id: 'instagram', name: 'Instagram', limit: 2200, color: '#c13584', handle: '@sanchit' },
  { id: 'facebook', name: 'Facebook', limit: 63206, color: '#1877f2', handle: 'Sanchit Anand' },
  { id: 'threads', name: 'Threads', limit: 500, color: '#000000', handle: '@sanchit' },
]

export function getPlatform(id: string): Platform {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0]
}
