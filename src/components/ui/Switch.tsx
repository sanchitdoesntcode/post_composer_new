import clsx from 'clsx'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative h-6 w-[42px] flex-shrink-0 rounded-btn border transition-all duration-DEFAULT ease-ascoser',
        checked
          ? 'border-transparent bg-gradient-to-br from-primary to-secondary'
          : 'border-border bg-surface-2'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all duration-DEFAULT ease-ascoser',
          checked ? 'left-5 bg-white' : 'left-0.5 bg-text-secondary'
        )}
      />
    </button>
  )
}
