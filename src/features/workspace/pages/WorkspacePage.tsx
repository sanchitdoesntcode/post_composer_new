import { useNavigate } from 'react-router-dom'
import { Plus, Clock, Layers, BarChart3, Folder, PenSquare, Grid3x3, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatCard from '@/components/shared/StatCard'
import SectionHeader from '@/components/shared/SectionHeader'
import { useWorkspace } from '@/features/workspace/hooks/useWorkspace'
import QuickActionCard from '@/features/workspace/components/QuickActionCard'
import StatRow from '@/features/workspace/components/StatRow'
import DraftCard from '@/features/drafts/components/DraftCard'
import CollectionCard from '@/features/collections/components/CollectionCard'

export default function WorkspacePage() {
  const navigate = useNavigate()
  const { greeting, recentDrafts, stats, collections, streakDays, weeklyActivity } =
    useWorkspace()

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            {greeting}
          </span>
          <h1 className="mt-2 font-head text-[28px] tracking-tight">
            Let&rsquo;s create something today
          </h1>
          <p className="text-sm text-text-secondary">
            You have {stats.totalDrafts} drafts in progress and a {streakDays}-day writing streak.
          </p>
        </div>
        <Button onClick={() => navigate('/compose')}>
          <Plus className="h-4 w-4" strokeWidth={1.8} /> New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <QuickActionCard
          icon={Plus}
          title="New Post"
          description="Start a fresh draft"
          onClick={() => navigate('/compose')}
        />
        <QuickActionCard
          icon={Clock}
          title="Continue Writing"
          description="Resume your last draft"
          onClick={() => navigate('/drafts')}
        />
        <QuickActionCard
          icon={Layers}
          title="Browse Collections"
          description={`${collections.length} active collections`}
          onClick={() => navigate('/collections')}
        />
        <QuickActionCard
          icon={BarChart3}
          title="View Insights"
          description="Check weekly progress"
          onClick={() => navigate('/insights')}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Drafts Active"
          value={stats.totalDrafts}
          icon={Folder}
          caption="Updated recently"
        />
        <StatCard
          label="Words Written"
          value={stats.averageWords * stats.totalDrafts}
          icon={PenSquare}
          trend="▲ 18% vs last week"
        />
        <StatCard
          label="Platforms Used"
          value={Object.keys(stats.platformCounts).length}
          icon={Grid3x3}
          caption={stats.topPlatform ? `Top: ${stats.topPlatform}` : undefined}
        />
        <Card className="px-[22px] py-5">
          <div className="mb-3.5 flex items-center justify-between">
            <span className="text-xs text-text-muted">Weekly Activity</span>
            <TrendingUp className="h-4 w-4 text-text-muted" strokeWidth={1.8} />
          </div>
          <StatRow values={weeklyActivity.map((d) => d.value)} />
        </Card>
      </div>

      <SectionHeader title="Recent Drafts" onViewAll={() => navigate('/drafts')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {recentDrafts.map((d) => (
          <DraftCard key={d.id} draft={d} />
        ))}
      </div>

      <SectionHeader title="Collections" onViewAll={() => navigate('/collections')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} onClick={() => navigate('/collections')} />
        ))}
      </div>
    </section>
  )
}
