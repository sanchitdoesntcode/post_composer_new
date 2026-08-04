import clsx from 'clsx'
import Card from '@/components/ui/Card'
import SettingsRow from '@/features/settings/components/SettingsRow'
import { useSettings } from '@/features/settings/hooks/useSettings'

export default function SettingsPage() {
  const s = useSettings()

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7">
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          Personalize
        </span>
        <h1 className="mt-2 font-head text-[28px] tracking-tight">Settings</h1>
        <p className="text-sm text-text-secondary">
          Adjust the workspace to fit how you work.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-[22px]">
          <div className="flex items-center justify-between border-b border-divider py-3.5">
            <div>
              <h4 className="mb-0.5 text-[13.5px]">Appearance</h4>
              <p className="text-xs text-text-muted">Choose light or dark.</p>
            </div>
            <div className="flex gap-2">
              {(['light', 'dark'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => s.setTheme(mode)}
                  className={clsx(
                    'rounded-[10px] border px-3.5 py-2 text-[12.5px] capitalize',
                    s.theme === mode
                      ? 'border-[rgba(255,64,64,0.4)] bg-surface-2 text-text-primary'
                      : 'border-border text-text-secondary'
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <SettingsRow
            title="Reduced Motion"
            description="Minimize animations across the workspace."
            checked={s.reducedMotion}
            onChange={() => s.toggle('reducedMotion')}
          />
          <SettingsRow
            title="Compact Sidebar"
            description="Start every session with the sidebar collapsed."
            checked={s.compactSidebar}
            onChange={() => s.toggle('compactSidebar')}
          />
        </Card>

        <Card className="p-[22px]">
          <SettingsRow
            title="Autosave Drafts"
            description="Save changes automatically every 30 seconds."
            checked={s.autosaveDrafts}
            onChange={() => s.toggle('autosaveDrafts')}
          />
          <SettingsRow
            title="Reading Time Estimates"
            description="Show estimated reading time while composing."
            checked={s.readingTimeEstimates}
            onChange={() => s.toggle('readingTimeEstimates')}
          />
          <SettingsRow
            title="Keyboard Shortcuts"
            description="Enable command-palette shortcuts (⌘K, ⌘S, ⌘N)."
            checked={s.keyboardShortcuts}
            onChange={() => s.toggle('keyboardShortcuts')}
          />
        </Card>
      </div>
    </section>
  )
}
