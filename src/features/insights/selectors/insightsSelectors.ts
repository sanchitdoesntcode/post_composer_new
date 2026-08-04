import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/rootReducer'
import { selectDraftStatistics } from '@/features/drafts/selectors/draftsSelectors'

export const selectInsightsState = (state: RootState) => state.insights

export const selectWeeklyActivity = createSelector(
  selectInsightsState,
  (i) => i.weeklyActivity
)

export const selectStreakDays = createSelector(selectInsightsState, (i) => i.streakDays)

export const selectInsightsSummary = createSelector(
  selectDraftStatistics,
  selectStreakDays,
  (draftStats, streakDays) => ({ ...draftStats, streakDays })
)
