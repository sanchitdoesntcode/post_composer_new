import { Folder, PenSquare, Star, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import StatCard from '@/components/shared/StatCard'
import { useAppSelector } from '@/store/hooks'
import { selectInsightsSummary, selectWeeklyActivity } from '@/features/insights/selectors/insightsSelectors'
import WeeklyActivityChart from '@/features/insights/components/WeeklyActivityChart'

export default function InsightsPage() {
  const summary = useAppSelector(selectInsightsSummary)
  const weeklyActivity = useAppSelector(selectWeeklyActivity)

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          Understand
        </span>
        <h1 className="mt-2 font-head text-[28px] tracking-tight">Insights</h1>
        <p className="text-sm text-text-secondary">
          Meaningful patterns in how you write — not vanity metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Drafts" value={summary.totalDrafts} icon={Folder} caption="All time" />
        <StatCard
          label="Avg Words / Draft"
          value={summary.averageWords}
          icon={PenSquare}
          caption="Across all platforms"
        />
        <StatCard
          label="Top Platform"
          value={summary.topPlatform ?? '—'}
          icon={Star}
          caption="Most drafted"
        />
        <StatCard
          label="Streak"
          value={`${summary.streakDays} days`}
          icon={Zap}
          trend="Personal best: 11"
        />
      </div>

      <Card className="mt-4">
        <h4 className="px-5 pt-5 font-head text-[15px]">Weekly Activity</h4>
        <WeeklyActivityChart data={weeklyActivity} />
      </Card>
    </section>
  )
}
