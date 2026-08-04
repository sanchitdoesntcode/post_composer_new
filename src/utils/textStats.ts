/** Pure helpers for the live counters used throughout Compose and Insights. */

export function countWords(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

export function countChars(text: string): number {
  return text.length
}

export function estimateReadingMinutes(wordCount: number, wpm = 200): number {
  return Math.max(1, Math.round(wordCount / wpm))
}

export type LimitStatus = 'ok' | 'warn' | 'error'

export function getLimitStatus(chars: number, limit: number): LimitStatus {
  if (chars > limit) return 'error'
  if (chars > limit * 0.9) return 'warn'
  return 'ok'
}
