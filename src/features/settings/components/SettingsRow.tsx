import Switch from '@/components/ui/Switch'

export interface SettingsRowProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function SettingsRow({ title, description, checked, onChange }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-divider py-3.5 last:border-none">
      <div>
        <h4 className="mb-0.5 text-[13.5px]">{title}</h4>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}
