import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/rootReducer'
import type { Draft } from '@/features/drafts/types'
import type { PlatformId } from '@/types'

/** Base selector — raw normalized slice. */
export const selectDraftsState = (state: RootState) => state.drafts

/** Feature selector — every draft as an array, newest first. */
export const selectAllDrafts = createSelector(selectDraftsState, (drafts): Draft[] =>
  drafts.allIds.map((id) => drafts.byId[id])
)

export const selectDraftById = (id: string) =>
  createSelector(selectDraftsState, (drafts) => drafts.byId[id])

/** Derived selectors — computed, never stored. */
export const selectActiveDrafts = createSelector(selectAllDrafts, (drafts) =>
  drafts.filter((d) => !d.archived)
)

export const selectArchivedDrafts = createSelector(selectAllDrafts, (drafts) =>
  drafts.filter((d) => d.archived)
)

export const selectFavoriteDrafts = createSelector(selectActiveDrafts, (drafts) =>
  drafts.filter((d) => d.favorite)
)

export const selectRecentDrafts = (limit = 3) =>
  createSelector(selectActiveDrafts, (drafts) =>
    [...drafts]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit)
  )

export interface DraftFilters {
  query?: string
  platform?: PlatformId
  onlyFavorites?: boolean
}

export const selectFilteredDrafts = (filters: DraftFilters) =>
  createSelector(selectActiveDrafts, (drafts) =>
    drafts.filter((d) => {
      if (filters.onlyFavorites && !d.favorite) return false
      if (filters.platform && d.platform !== filters.platform) return false
      if (filters.query) {
        const q = filters.query.toLowerCase()
        if (!d.title.toLowerCase().includes(q) && !d.body.toLowerCase().includes(q)) {
          return false
        }
      }
      return true
    })
  )

export const selectDraftStatistics = createSelector(selectActiveDrafts, (drafts) => {
  const totalWords = drafts.reduce(
    (sum, d) => sum + (d.body.trim() ? d.body.trim().split(/\s+/).length : 0),
    0
  )
  const platformCounts = drafts.reduce<Record<string, number>>((acc, d) => {
    acc[d.platform] = (acc[d.platform] ?? 0) + 1
    return acc
  }, {})
  const topPlatform = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

  return {
    totalDrafts: drafts.length,
    averageWords: drafts.length ? Math.round(totalWords / drafts.length) : 0,
    topPlatform: topPlatform ?? null,
    platformCounts,
  }
})
