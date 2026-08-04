import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/rootReducer'

export const selectWorkspaceState = (state: RootState) => state.workspace

export const selectGreetingName = createSelector(
  selectWorkspaceState,
  (w) => w.greetingName
)

export function selectTimeOfDayGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
