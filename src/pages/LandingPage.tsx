import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap,
  ArrowRight,
  Play,
  PenSquare,
  Layers,
  Eye,
  TrendingUp,
  Home,
  Folder,
  BarChart3,
  Moon,
  Sun,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAppDispatch } from '@/store/hooks'
import { openCommandPalette } from '@/store/uiSlice'
import { useTheme } from '@/hooks/useTheme'

const TERM_LINES = [
  'ascoser --launch workspace',
  'mounting compose, drafts, insights…',
  'workspace ready ✓',
]

const FEATURES = [
  {
    icon: PenSquare,
    title: 'Rich Composer',
    desc: 'Distraction-free writing with live word, character, and reading-time counters for every platform you target.',
  },
  {
    icon: Layers,
    title: 'Smart Organization',
    desc: 'Drafts and collections stay searchable and sortable, so nothing gets lost between sessions.',
  },
  {
    icon: Eye,
    title: 'Live Platform Preview',
    desc: "See exactly how a post will look before it's finished — with real character limits, not guesses.",
  },
  {
    icon: TrendingUp,
    title: 'Writing Insights',
    desc: 'Understand your own habits — output, platform mix, and weekly momentum — without vanity metrics.',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { theme, toggle } = useTheme()

  const termRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const [launching, setLaunching] = useState(false)
  const [cmdText, setCmdText] = useState('')

  // Terminal command-line typing effect.
  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    let deleting = false
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      const full = TERM_LINES[lineIdx]
      if (!deleting) {
        charIdx++
        setCmdText(full.slice(0, charIdx))
        if (charIdx >= full.length) {
          deleting = true
          timeout = setTimeout(tick, 1100)
          return
        }
      } else {
        charIdx--
        setCmdText(full.slice(0, charIdx))
        if (charIdx <= 0) {
          deleting = false
          lineIdx = (lineIdx + 1) % TERM_LINES.length
        }
      }
      timeout = setTimeout(tick, deleting ? 24 : 48)
    }
    tick()
    return () => clearTimeout(timeout)
  }, [])

  // Scroll-pinned 3D transition: terminal flattens + zooms as you scroll, then hands off to the workspace.
  useEffect(() => {
    let autoEntered = false

    function onScroll() {
      const stage = stageRef.current
      const term = termRef.current
      const pin = pinRef.current
      const hint = hintRef.current
      if (!stage || !term || !pin || !hint || launching) return

      const rect = stage.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height - vh
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0

      if (progress > 0.002) {
        term.style.animation = 'none'
        const rotX = 6 - progress * 6
        const rotY = -4 + progress * 4
        const scale = 1 + progress * 2.1
        const ty = -progress * 34
        term.style.transform = `perspective(1800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale}) translateY(${ty}px)`
        term.style.opacity = String(1 - Math.max(0, progress - 0.85) / 0.15)
        pin.style.setProperty('--stage-glow', String(0.5 + progress * 0.8))
        hint.style.setProperty('--hint-op', progress > 0.06 ? '0' : '1')
      } else {
        term.style.animation = ''
        term.style.transform = ''
        term.style.opacity = ''
        pin.style.setProperty('--stage-glow', '.5')
        hint.style.setProperty('--hint-op', '1')
      }

      if (progress >= 0.985 && !autoEntered) {
        autoEntered = true
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
          document.body.style.overflow = ''
          navigate('/app')
        }, 180)
      } else if (progress < 0.9) {
        autoEntered = false
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [launching, navigate])

  function spinIntoWorkspace() {
    if (launching) return
    setLaunching(true)
    const term = termRef.current
    const hint = hintRef.current
    if (hint) hint.style.opacity = '0'
    if (term) {
      term.style.transition =
        'transform 950ms cubic-bezier(.65,0,.35,1), box-shadow 950ms ease, opacity 500ms ease 500ms'
      term.style.animation = 'none'
      void term.offsetWidth
      term.style.transform =
        'perspective(1800px) rotateX(0deg) rotateY(360deg) scale(2.7) translateY(-6vh)'
      term.style.boxShadow = '0 60px 160px rgba(0,0,0,.6), 0 0 140px rgba(255,64,64,.6)'
      term.style.opacity = '0'
    }
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = ''
      navigate('/app')
    }, 900)
  }

  return (
    <div className="relative">
      {/* ---- Floating nav ---- */}
      <nav className="glass fixed left-1/2 top-5 z-[100] flex w-[min(920px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-btn py-2.5 pl-5 pr-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2.5 font-head text-[17px] font-bold tracking-tight">
          <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_rgba(255,64,64,0.5)]">
            <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2} />
          </span>
          ascoser
        </div>
        <div className="hidden gap-1 md:flex">
          <a href="#features" className="rounded-btn px-3.5 py-2 text-[13px] text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Product
          </a>
          <a href="#showcase" className="rounded-btn px-3.5 py-2 text-[13px] text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Features
          </a>
          <button onClick={() => navigate('/app')} className="rounded-btn px-3.5 py-2 text-[13px] text-text-secondary hover:bg-surface-2 hover:text-text-primary">
            Workspace
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </button>
          <Button size="sm" onClick={spinIntoWorkspace}>
            Launch Workspace
          </Button>
        </div>
      </nav>

      {/* ---- Hero ---- */}
      <section
        className="relative overflow-hidden px-6 pb-24 pt-[200px] text-center"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(197,30,30,.22), transparent 70%), radial-gradient(40% 30% at 80% 20%, rgba(255,64,64,.10), transparent 70%)',
        }}
      >
        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:shadow-[0_0_10px_var(--accent)] before:content-['']">
          Premium Content Workspace
        </span>
        <h1 className="mx-auto mt-6 max-w-[920px] font-head text-[clamp(40px,6.4vw,84px)] font-bold leading-[1.03] tracking-[-0.03em]">
          Write once.
          <br />
          Publish{' '}
          <span className="bg-gradient-to-br from-[#FF6A6A] to-primary bg-clip-text text-transparent">
            everywhere
          </span>
          , beautifully.
        </h1>
        <p className="mx-auto mb-9 mt-[22px] max-w-[560px] text-lg leading-relaxed text-text-secondary">
          Ascoser is a focused workspace for drafting, previewing, and organizing social content
          across every platform — without the clutter of a publishing suite you don&rsquo;t need
          yet.
        </p>
        <div className="mb-2 flex flex-wrap justify-center gap-3.5">
          <Button onClick={spinIntoWorkspace}>
            Launch Workspace <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Button>
          <Button variant="secondary" onClick={() => dispatch(openCommandPalette())}>
            <Play className="h-4 w-4" strokeWidth={1.8} /> See it in action
          </Button>
        </div>
      </section>

      {/* ---- Scroll-pinned 3D terminal ---- */}
      <div ref={stageRef} className="relative" style={{ height: '280vh' }}>
        <div
          ref={pinRef}
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(50% 45% at 50% 45%, rgba(197,30,30,.20), transparent 72%)',
            }}
          />
          <div style={{ perspective: '1800px', position: 'relative', zIndex: 1 }}>
            <div
              ref={termRef}
              onClick={spinIntoWorkspace}
              className="w-[min(1040px,86vw)] cursor-pointer overflow-hidden rounded-dialog border border-[var(--glass-border)] bg-surface shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_40px_rgba(197,30,30,0.25)]"
              style={{
                animation: 'ascoserIdleDrift 9s ease-in-out infinite',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="flex items-center gap-2.5 border-b border-divider bg-surface-2 px-[18px] py-[13px]">
                <div className="flex gap-[7px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
                <div className="mx-auto font-mono text-[11.5px] text-text-muted">
                  ascoser — workspace.sh
                </div>
              </div>
              <div className="border-b border-divider px-5 py-3.5 text-left font-mono text-[12.5px] text-success">
                &gt; {cmdText}
                <span className="ml-0.5 inline-block h-3.5 w-[7px] animate-pulse bg-accent align-[-2px]" />
              </div>
              <div className="grid min-h-[360px] grid-cols-1 md:grid-cols-[200px_1fr_260px]">
                <div className="hidden flex-col gap-1.5 border-r border-divider p-3 md:flex">
                  {[
                    { icon: Home, label: 'Workspace', active: true },
                    { icon: PenSquare, label: 'Compose' },
                    { icon: Folder, label: 'Drafts' },
                    { icon: Layers, label: 'Collections' },
                    { icon: BarChart3, label: 'Insights' },
                  ].map(({ icon: Icon, label, active }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[12.5px] ${
                        active ? 'bg-surface-2 text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {label}
                    </div>
                  ))}
                </div>
                <div className="p-6 text-left">
                  <span className="mb-4 inline-block rounded-btn border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-secondary">
                    GOOD MORNING
                  </span>
                  <div className="mb-2.5 h-4 w-3/5 rounded bg-surface-2" />
                  <div className="mb-5 h-2.5 w-2/5 rounded bg-surface-2" />
                  <div className="mb-2.5 h-2.5 w-full rounded bg-surface-2" />
                  <div className="mb-2.5 h-2.5 w-[90%] rounded bg-surface-2" />
                  <div className="h-2.5 w-[70%] rounded bg-surface-2" />
                </div>
                <div className="hidden border-l border-divider p-[18px] text-left lg:block">
                  <span className="mb-3.5 inline-block rounded-btn border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-text-secondary">
                    LIVE PREVIEW
                  </span>
                  <div className="mb-2.5 h-2.5 w-full rounded bg-surface-2" />
                  <div className="h-2.5 w-4/5 rounded bg-surface-2" />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={hintRef}
            className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-text-muted"
          >
            <span>Scroll to enter</span>
            <span className="relative h-8 w-5 rounded-full border-[1.5px] border-text-muted">
              <span className="absolute left-1/2 top-1.5 h-1.5 w-[3px] -translate-x-1/2 animate-bounce rounded-full bg-text-muted" />
            </span>
          </div>
        </div>
      </div>

      {/* ---- Features ---- */}
      <section id="features" className="mx-auto max-w-[1160px] px-6 py-24">
        <div className="mx-auto mb-14 max-w-[600px] text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Why Ascoser
          </span>
          <h2 className="mt-3.5 font-head text-[clamp(28px,4vw,42px)] font-bold tracking-tight">
            Everything a focused writer needs, nothing they don&rsquo;t
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            Five pillars: create, organize, review, understand, personalize — each one built to
            reduce friction, not add features for their own sake.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-card border border-border bg-surface p-6 shadow-card transition-all duration-DEFAULT hover:-translate-y-[3px] hover:border-[rgba(197,30,30,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(197,30,30,0.25)]"
            >
              <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-[13px] border border-[rgba(255,64,64,0.25)] bg-gradient-to-br from-[rgba(197,30,30,0.22)] to-[rgba(255,64,64,0.10)]">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="mb-2 font-head text-lg tracking-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Premium showcase ---- */}
      <section id="showcase" className="mx-auto max-w-[1160px] px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-dialog border border-border p-14 text-center"
          style={{ background: 'linear-gradient(160deg, var(--surface), var(--surface-2))' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(50% 60% at 50% 0%, rgba(255,64,64,.14), transparent 70%)' }}
          />
          <span className="relative font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Premium Workspace
          </span>
          <h2 className="relative mt-3.5 font-head text-[clamp(24px,3.4vw,36px)] font-bold tracking-tight">
            A command palette for everything
          </h2>
          <p className="relative mx-auto mt-3 max-w-[480px] text-text-secondary">
            Search, navigate, and create without leaving the keyboard.
          </p>
          <div className="relative mt-[26px] flex flex-wrap justify-center gap-2.5">
            {['⌘ K — Command Palette', '⌘ S — Save Draft', '⌘ N — New Post', '⌘ ⇧ D — Duplicate'].map(
              (k) => (
                <span
                  key={k}
                  className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-text-secondary"
                >
                  {k}
                </span>
              )
            )}
          </div>
          <div className="relative mt-[30px]">
            <Button onClick={spinIntoWorkspace}>Try the workspace</Button>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-6 py-[120px] text-center">
        <span className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
          Get Started
        </span>
        <h2 className="mx-auto mb-[18px] max-w-[640px] font-head text-[clamp(30px,5vw,52px)] font-bold tracking-tight">
          Your next post starts here.
        </h2>
        <p className="mb-[34px] text-text-secondary">
          No sign-up needed for this preview — jump straight into the workspace.
        </p>
        <Button onClick={spinIntoWorkspace}>
          Launch Workspace <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Button>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-divider px-6 py-12">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-head text-sm font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent">
              <Zap className="h-[11px] w-[11px] text-white" strokeWidth={2} />
            </span>
            ascoser
          </div>
          <div className="flex gap-5">
            <a href="#features" className="text-[13px] text-text-muted hover:text-text-primary">
              Product
            </a>
            <a href="#showcase" className="text-[13px] text-text-muted hover:text-text-primary">
              Features
            </a>
            <button onClick={() => navigate('/app')} className="text-[13px] text-text-muted hover:text-text-primary">
              Workspace
            </button>
          </div>
          <small className="text-xs text-text-muted">© 2026 Ascoser. A frontend engineering showcase.</small>
        </div>
      </footer>

      <style>{`
        @keyframes ascoserIdleDrift {
          0%,100% { transform: perspective(1800px) rotateX(6deg) rotateY(-4deg) translateY(0); }
          50% { transform: perspective(1800px) rotateX(3deg) rotateY(4deg) translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
