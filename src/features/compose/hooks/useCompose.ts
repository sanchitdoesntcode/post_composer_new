import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectComposeText,
  selectComposePlatformId,
  selectComposePlatform,
  selectComposeHashtags,
  selectComposeLastSavedAt,
  selectComposeStats,
} from '@/features/compose/selectors/composeSelectors'
import {
  textChanged,
  platformChanged,
  hashtagAdded,
  hashtagRemoved,
  editorReset,
  markedSaved,
} from '@/features/compose/store/composeSlice'
import { draftCreated, draftUpdated } from '@/features/drafts/store/draftsSlice'
import { pushToast } from '@/store/uiSlice'
import type { PlatformId } from '@/types'

export function useCompose() {
  const dispatch = useAppDispatch()
  const text = useAppSelector(selectComposeText)
  const platformId = useAppSelector(selectComposePlatformId)
  const platform = useAppSelector(selectComposePlatform)
  const hashtags = useAppSelector(selectComposeHashtags)
  const lastSavedAt = useAppSelector(selectComposeLastSavedAt)
  const stats = useAppSelector(selectComposeStats)

  return {
    text,
    platformId,
    platform,
    hashtags,
    lastSavedAt,
    stats,
    setText: (value: string) => dispatch(textChanged(value)),
    setPlatform: (id: PlatformId) => dispatch(platformChanged(id)),
    addHashtag: (tag: string) => dispatch(hashtagAdded(tag)),
    removeHashtag: (index: number) => dispatch(hashtagRemoved(index)),
    newDraft: () => {
      dispatch(editorReset())
      dispatch(pushToast('New draft started'))
    },
    saveDraft: () => {
      dispatch(
        draftCreated({
          title: text.split('\n')[0]?.slice(0, 60) || 'Untitled draft',
          body: text,
          platform: platformId,
        })
      )
      dispatch(markedSaved())
      dispatch(pushToast('Draft saved'))
    },
    duplicateDraft: () => {
      dispatch(
        draftCreated({
          title: `${text.split('\n')[0]?.slice(0, 60) || 'Untitled draft'} (copy)`,
          body: text,
          platform: platformId,
        })
      )
      dispatch(pushToast('Draft duplicated'))
    },
  }
}

// Re-exported for pages that only need the draft-write actions.
export { draftUpdated }
