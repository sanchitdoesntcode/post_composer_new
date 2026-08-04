import { Copy, Check } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { useCompose } from '@/features/compose/hooks/useCompose'
import PlatformSelector from '@/features/compose/components/PlatformSelector'
import EditorToolbar from '@/features/compose/components/EditorToolbar'
import HashtagManager from '@/features/compose/components/HashtagManager'
import LivePreviewPanel from '@/features/compose/components/LivePreviewPanel'
import { formatClockTime } from '@/utils/formatDate'

const EMOJIS = ['✨', '🚀', '🔥', '💡', '🎯', '📝']

export default function ComposePage() {
  const {
    text,
    setText,
    platformId,
    platform,
    setPlatform,
    hashtags,
    addHashtag,
    removeHashtag,
    lastSavedAt,
    stats,
    newDraft,
    saveDraft,
    duplicateDraft,
  } = useCompose()

  function insertEmoji() {
    setText(text + EMOJIS[Math.floor(Math.random() * EMOJIS.length)])
  }

  const counterClass =
    stats.limitStatus === 'error'
      ? 'text-error'
      : stats.limitStatus === 'warn'
        ? 'text-warning'
        : 'text-text-secondary'

  return (
    <section className="mx-auto w-full max-w-[1280px] px-8 pb-20 pt-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
            {text ? 'Unsaved changes' : 'Empty draft'}
          </span>
          <h1 className="mt-2 font-head text-[28px] tracking-tight">Compose</h1>
          <p className="text-sm text-text-secondary">
            Write once — Ascoser tracks limits per platform as you type.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="secondary" size="sm" onClick={newDraft}>
            New
          </Button>
          <Button size="sm" onClick={saveDraft}>
            Save Draft
          </Button>
        </div>
      </div>

      <PlatformSelector value={platformId} onChange={setPlatform} />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_340px]">
        <div>
          <Card className="overflow-hidden p-0">
            <EditorToolbar onInsertEmoji={insertEmoji} />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you want to share?"
              className="min-h-[260px]"
            />
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-divider px-[18px] py-3 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-4">
                <span className={counterClass}>
                  <b>{stats.chars}</b>/{stats.limit.toLocaleString()} chars
                </span>
                <span>
                  <b className="text-text-secondary">{stats.words}</b> words
                </span>
                <span>
                  <b className="text-text-secondary">
                    {stats.words === 0 ? '<1 min' : `${stats.readingMinutes} min`}
                  </b>{' '}
                  read
                </span>
              </div>
              <span>
                {lastSavedAt ? `Saved at ${formatClockTime(new Date(lastSavedAt))}` : 'Not saved yet'}
              </span>
            </div>
          </Card>

          <HashtagManager hashtags={hashtags} onAdd={addHashtag} onRemove={removeHashtag} />

          <div className="mt-4 flex justify-end gap-2.5">
            <Button variant="secondary" onClick={duplicateDraft}>
              <Copy className="h-[15px] w-[15px]" strokeWidth={1.8} /> Duplicate
            </Button>
            <Button onClick={saveDraft}>
              <Check className="h-[15px] w-[15px]" strokeWidth={1.8} /> Save Draft
            </Button>
          </div>
        </div>

        <LivePreviewPanel
          text={text}
          platform={platform}
          limitPercent={stats.limitPercent}
          limitStatus={stats.limitStatus}
        />
      </div>
    </section>
  )
}
