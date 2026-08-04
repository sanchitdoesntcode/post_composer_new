import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {
  Zap,
  Home,
  PenSquare,
  Folder,
  Layers,
  BarChart3,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectSidebarCollapsed } from '@/store/uiSelectors'
import { toggleSidebar } from '@/store/uiSlice'

const NAV_PRIMARY = [
  { to: '/app', label: 'Workspace', icon: Home, end: true },
  { to: '/app/compose', label: 'Compose', icon: PenSquare },
  { to: '/app/drafts', label: 'Drafts', icon: Folder },
  { to: '/app/collections', label: 'Collections', icon: Layers },
]

const NAV_SECONDARY = [
  { to: '/app/insights', label: 'Insights', icon: BarChart3 },
  { to: '/app/settings', label: 'Settings', icon: SettingsIcon },
]

const linkClass = (active: boolean) =>
  clsx(
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition-all duration-DEFAULT whitespace-nowrap',
    active
      ? 'border border-[rgba(255,64,64,0.22)] bg-gradient-to-br from-[rgba(197,30,30,0.18)] to-[rgba(255,64,64,0.06)] text-text-primary [&_svg]:text-accent'
      : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary'
  )

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector(selectSidebarCollapsed)

  return (
    <aside
      className={clsx(
        'glass sticky top-0 flex h-screen flex-shrink-0 flex-col gap-1.5 border-r p-3.5 transition-[width] duration-DEFAULT',
        collapsed ? 'w-[76px]' : 'w-[236px]'
      )}
    >
      <div className="flex items-center gap-2.5 px-2.5 pb-[22px] pt-2">
        <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_rgba(255,64,64,0.5)]">
          <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2} />
        </span>
        {!collapsed && <span className="font-head text-base font-bold">ascoser</span>}
      </div>

      {!collapsed && (
        <div className="px-3 pb-1.5 pt-3.5 font-mono text-[10px] uppercase tracking-wide text-text-muted">
          Workspace
        </div>
      )}
      {NAV_PRIMARY.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => linkClass(isActive)}>
          <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}

      {!collapsed && (
        <div className="px-3 pb-1.5 pt-3.5 font-mono text-[10px] uppercase tracking-wide text-text-muted">
          Analyze
        </div>
      )}
      {NAV_SECONDARY.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => linkClass(isActive)}>
          <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
          {!collapsed && <span>{label}</span>}
        </NavLink>
      ))}

      <div className="mt-auto flex flex-col gap-1.5">
        <NavLink to="/" className={linkClass(false)}>
          <ChevronLeft className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.8} />
          {!collapsed && <span>Back to site</span>}
        </NavLink>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="flex items-center justify-center gap-2 rounded-[10px] p-2.5 text-xs text-text-muted hover:bg-surface-2 hover:text-text-primary"
        >
          <ChevronDown
            className={clsx('h-[15px] w-[15px] transition-transform', !collapsed && 'rotate-90')}
            strokeWidth={1.8}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
