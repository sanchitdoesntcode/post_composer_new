import { useNavigate } from 'react-router-dom'
import { Search, Command, Sun, Moon, Plus } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'
import Button from '@/components/ui/Button'
import { useAppDispatch } from '@/store/hooks'
import { openCommandPalette } from '@/store/uiSlice'
import { useTheme } from '@/hooks/useTheme'

export default function Topbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  return (
    <div className="glass sticky top-0 z-40 flex items-center justify-between gap-4 border-b px-7 py-3.5">
      <button
        onClick={() => dispatch(openCommandPalette())}
        className="flex w-full max-w-[360px] items-center gap-2.5 rounded-btn border border-border bg-surface-2 px-4 py-2.5 text-left text-[13px] text-text-muted transition-colors hover:border-[rgba(255,64,64,0.3)]"
      >
        <Search className="h-[15px] w-[15px]" strokeWidth={1.8} />
        Search drafts, collections, actions…
        <kbd className="ml-auto rounded-[5px] border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px] text-text-muted">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5">
        <IconButton title="Command palette" onClick={() => dispatch(openCommandPalette())}>
          <Command className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </IconButton>
        <IconButton title="Toggle theme" onClick={toggle}>
          {theme === 'dark' ? (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          ) : (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
          )}
        </IconButton>
        <Button size="sm" onClick={() => navigate('/app/compose')}>
          <Plus className="h-3.5 w-3.5" strokeWidth={1.8} /> New Post
        </Button>
        <div className="ml-1.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-head text-[13px] font-bold text-white">
          SA
        </div>
      </div>
    </div>
  )
}
