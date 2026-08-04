import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectAllDrafts,
  selectRecentDrafts,
  selectFavoriteDrafts,
  selectDraftStatistics,
  type DraftFilters,
  selectFilteredDrafts,
} from '@/features/drafts/selectors/draftsSelectors'
import {
  draftCreated,
  draftUpdated,
  draftDeleted,
  draftFavoriteToggled,
  draftArchiveToggled,
  draftDuplicated,
} from '@/features/drafts/store/draftsSlice'
import type { Draft } from '@/features/drafts/types'

export function useDrafts(filters?: DraftFilters) {
  const dispatch = useAppDispatch()
  const all = useAppSelector(selectAllDrafts)
  const favorites = useAppSelector(selectFavoriteDrafts)
  const stats = useAppSelector(selectDraftStatistics)
  const filteredSelector = useMemo(() => selectFilteredDrafts(filters ?? {}), [filters])
  const filtered = useAppSelector(filteredSelector)

  return {
    all,
    favorites,
    filtered,
    stats,
    createDraft: (partial: Partial<Pick<Draft, 'title' | 'platform' | 'body'>>) =>
      dispatch(draftCreated(partial)),
    updateDraft: (id: string, changes: Partial<Omit<Draft, 'id'>>) =>
      dispatch(draftUpdated({ id, changes })),
    deleteDraft: (id: string) => dispatch(draftDeleted(id)),
    toggleFavorite: (id: string) => dispatch(draftFavoriteToggled(id)),
    toggleArchive: (id: string) => dispatch(draftArchiveToggled(id)),
    duplicateDraft: (id: string) => dispatch(draftDuplicated(id)),
  }
}

export function useRecentDrafts(limit = 3) {
  const selector = useMemo(() => selectRecentDrafts(limit), [limit])
  return useAppSelector(selector)
}
