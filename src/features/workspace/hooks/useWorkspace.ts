import { useAppSelector } from '@/store/hooks'
import { selectGreetingName, selectTimeOfDayGreeting } from '@/features/workspace/selectors/workspaceSelectors'
import { useRecentDrafts } from '@/features/drafts/hooks/useDrafts'
import { selectDraftStatistics } from '@/features/drafts/selectors/draftsSelectors'
import { selectAllCollections } from '@/features/collections/selectors/collectionsSelectors'
import { selectStreakDays, selectWeeklyActivity } from '@/features/insights/selectors/insightsSelectors'

export function useWorkspace() {
  const name = useAppSelector(selectGreetingName)
  const recentDrafts = useRecentDrafts(3)
  const stats = useAppSelector(selectDraftStatistics)
  const collections = useAppSelector(selectAllCollections)
  const streakDays = useAppSelector(selectStreakDays)
  const weeklyActivity = useAppSelector(selectWeeklyActivity)

  return {
    name,
    greeting: selectTimeOfDayGreeting(),
    recentDrafts,
    stats,
    collections,
    streakDays,
    weeklyActivity,
  }
}
