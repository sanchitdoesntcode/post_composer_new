import Card from '@/components/ui/Card'
import type { Platform } from '@/types'

export interface LivePreviewPanelProps {
  text: string
  platform: Platform
  limitPercent: number
  limitStatus: 'ok' | 'warn' | 'error'
}

const fillColor: Record<LivePreviewPanelProps['limitStatus'], string> = {
  ok: 'linear-gradient(90deg, var(--primary), var(--accent))',
  warn: 'var(--warning)',
  error: 'var(--error)',
}

export default function LivePreviewPanel({
  text,
  platform,
  limitPercent,
  limitStatus,
}: LivePreviewPanelProps) {
  return (
    <Card className="sticky top-[88px]">
      <h4 className="px-[18px] pt-4 font-mono text-[11px] uppercase tracking-wide text-text-muted">
        Live Preview
      </h4>
      <div className="p-[18px]">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-surface-2" />
          <div>
            <div className="text-[13px] font-semibold">Sanchit Anand</div>
            <div className="text-[11.5px] text-text-muted">{platform.handle}</div>
          </div>
        </div>
        <div className="min-h-[60px] whitespace-pre-wrap break-words text-[13.5px] leading-[1.55] text-text-primary">
          {text || (
            <span className="text-text-muted">
              Your content preview appears here as you type.
            </span>
          )}
        </div>
        <div className="mt-3.5 h-1 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full transition-all duration-200"
            style={{ width: `${limitPercent}%`, background: fillColor[limitStatus] }}
          />
        </div>
      </div>
    </Card>
  )
}
