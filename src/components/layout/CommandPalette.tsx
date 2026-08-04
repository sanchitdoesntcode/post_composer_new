import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Command,
  Home,
  PenSquare,
  Folder,
  Layers,
  BarChart3,
  Settings as SettingsIcon,
  Plus,
  Check,
  Sun,
} from 'lucide-react'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCommandPaletteOpen } from '@/store/uiSelectors'
import { closeCommandPalette, toggleCommandPalette } from '@/store/uiSlice'
import { useTheme } from '@/hooks/useTheme'
import { useCompose } from '@/features/compose/hooks/useCompose'

interface CmdItem {
  icon: typeof Home
  label: string
  kbd?: string
  run: () => void
}

export default function CommandPalette() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectCommandPaletteOpen)
  const navigate = useNavigate()
  const { toggle: toggleTheme } = useTheme()
  const { newDraft, saveDraft } = useCompose()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const items: CmdItem[] = useMemo(
    () => [
      { icon: Home, label: 'Go to Workspace', kbd: 'G W', run: () => navigate('/app') },
      { icon: PenSquare, label: 'Go to Compose', kbd: 'G C', run: () => navigate('/app/compose') },
      { icon: Folder, label: 'Go to Drafts', kbd: 'G D', run: () => navigate('/app/drafts') },
      { icon: Layers, label: 'Go to Collections', kbd: 'G L', run: () => navigate('/app/collections') },
      { icon: BarChart3, label: 'Go to Insights', kbd: 'G I', run: () => navigate('/app/insights') },
      { icon: SettingsIcon, label: 'Go to Settings', kbd: 'G S', run: () => navigate('/app/settings') },
      {
        icon: Plus,
        label: 'New Post',
        kbd: '⌘N',
        run: () => {
          navigate('/app/compose')
          newDraft()
        },
      },
      { icon: Check, label: 'Save Draft', kbd: '⌘S', run: () => saveDraft() },
      { icon: Sun, label: 'Toggle Theme', run: () => toggleTheme() },
    ],
    [navigate, newDraft, saveDraft, toggleTheme]
  )

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (!open) {
      setQuery('')
      setSelected(0)
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        dispatch(toggleCommandPalette())
      } else if (e.key === 'Escape') {
        dispatch(closeCommandPalette())
      } else if (open && e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, filtered.length - 1))
      } else if (open && e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
      } else if (open && e.key === 'Enter' && filtered[selected]) {
        e.preventDefault()
        filtered[selected].run()
        dispatch(closeCommandPalette())
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, filtered, selected, dispatch])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex justify-center bg-[var(--scrim)] pt-[14vh] backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && dispatch(closeCommandPalette())}
    >
      <div className="h-fit w-[min(560px,92vw)] overflow-hidden rounded-dialog border border-[var(--glass-border)] bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 border-b border-divider px-5 py-[18px]">
          <Command className="h-[18px] w-[18px] text-text-muted" strokeWidth={1.8} />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>
        <div className="max-h-[340px] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="py-6 text-center text-[13px] text-text-muted">No results</div>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.label}
              onClick={() => {
                item.run()
                dispatch(closeCommandPalette())
              }}
              onMouseEnter={() => setSelected(i)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13.5px] transition-colors',
                i === selected
                  ? 'bg-surface-2 text-text-primary [&_svg]:text-accent'
                  : 'text-text-secondary'
              )}
            >
              <item.icon className="h-4 w-4 text-text-muted" strokeWidth={1.8} />
              {item.label}
              {item.kbd && (
                <small className="ml-auto font-mono text-[10.5px] text-text-muted">
                  {item.kbd}
                </small>
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-4 border-t border-divider px-5 py-3 font-mono text-[11px] text-text-muted">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  )
}
