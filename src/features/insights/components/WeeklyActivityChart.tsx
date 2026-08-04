import clsx from 'clsx'

export interface WeeklyActivityChartProps {
  data: { day: string; value: number }[]
}

export default function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  return (
    <div className="flex h-[180px] items-end gap-3.5 p-6">
      {data.map((d) => (
        <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2.5">
          <div
            className={clsx(
              'w-full rounded-t-lg transition-[height] duration-500',
              d.value > 70 ? 'bg-gradient-to-b from-accent to-primary' : 'bg-surface-2'
            )}
            style={{ height: `${d.value}%` }}
          />
          <span className="font-mono text-[10.5px] text-text-muted">{d.day}</span>
        </div>
      ))}
    </div>
  )
}
