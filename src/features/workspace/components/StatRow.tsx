import clsx from 'clsx'

export interface StatRowProps {
  values: number[]
}

/** A compact 7-bar sparkline for the "Weekly Activity" stat card. */
export default function StatRow({ values }: StatRowProps) {
  return (
    <div className="mt-3 flex h-[34px] items-end gap-1">
      {values.map((v, i) => (
        <span
          key={i}
          className={clsx(
            'flex-1 rounded-t-[3px]',
            v > 70 ? 'bg-gradient-to-b from-accent to-primary' : 'bg-surface-2'
          )}
          style={{ height: `${v}%` }}
        />
      ))}
    </div>
  )
}
