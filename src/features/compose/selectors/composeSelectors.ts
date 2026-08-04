import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/rootReducer'
import { countWords, countChars, estimateReadingMinutes, getLimitStatus } from '@/utils/textStats'
import { getPlatform } from '@/features/compose/constants/platforms'

export const selectComposeState = (state: RootState) => state.compose

export const selectComposeText = createSelector(selectComposeState, (c) => c.text)
export const selectComposePlatformId = createSelector(selectComposeState, (c) => c.platform)
export const selectComposeHashtags = createSelector(selectComposeState, (c) => c.hashtags)
export const selectComposeLastSavedAt = createSelector(selectComposeState, (c) => c.lastSavedAt)

export const selectComposePlatform = createSelector(selectComposePlatformId, (id) =>
  getPlatform(id)
)

export const selectComposeStats = createSelector(
  selectComposeText,
  selectComposePlatform,
  (text, platform) => {
    const words = countWords(text)
    const chars = countChars(text)
    return {
      words,
      chars,
      readingMinutes: estimateReadingMinutes(words),
      limit: platform.limit,
      limitStatus: getLimitStatus(chars, platform.limit),
      limitPercent: Math.min(100, (chars / platform.limit) * 100),
    }
  }
)
