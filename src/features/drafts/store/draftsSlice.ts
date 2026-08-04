import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Draft } from '@/features/drafts/types'
import { createId } from '@/utils/id'

interface DraftsState {
  byId: Record<string, Draft>
  allIds: string[]
}

function seedDraft(partial: Omit<Draft, 'id' | 'createdAt' | 'updatedAt' | 'archived'> & {
  updatedAt: string
}): Draft {
  return {
    id: createId('draft'),
    archived: false,
    createdAt: partial.updatedAt,
    ...partial,
  }
}

const seeded: Draft[] = [
  seedDraft({
    title: 'Launching Ascoser 🚀',
    platform: 'x',
    body: "Spent the last few weeks building a workspace for writers who juggle five platforms and one brain. Here's what I learned…",
    hashtags: ['launch', 'buildinpublic'],
    favorite: true,
    updatedAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  }),
  seedDraft({
    title: 'Why design systems matter',
    platform: 'linkedin',
    body: 'A design system is not a component library. It is a shared vocabulary for a product team — and most teams skip the vocabulary part.',
    hashtags: ['design'],
    favorite: false,
    updatedAt: new Date(Date.now() - 5 * 3_600_000).toISOString(),
  }),
  seedDraft({
    title: 'Behind the scenes of Compose',
    platform: 'instagram',
    body: 'Swipe through the making of our editor — from wireframe to glass sidebar. Every detail was intentional.',
    hashtags: ['bts'],
    favorite: true,
    updatedAt: new Date(Date.now() - 22 * 3_600_000).toISOString(),
  }),
  seedDraft({
    title: 'Weekly build log #4',
    platform: 'threads',
    body: 'Redux slices are finally normalized. Selectors feel like magic when they are memoized correctly.',
    hashtags: ['buildlog'],
    favorite: false,
    updatedAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
  }),
]

const initialState: DraftsState = {
  byId: Object.fromEntries(seeded.map((d) => [d.id, d])),
  allIds: seeded.map((d) => d.id),
}

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    draftCreated: {
      reducer(state, action: PayloadAction<Draft>) {
        state.byId[action.payload.id] = action.payload
        state.allIds.unshift(action.payload.id)
      },
      prepare(partial: Partial<Pick<Draft, 'title' | 'platform' | 'body'>>) {
        const now = new Date().toISOString()
        const draft: Draft = {
          id: createId('draft'),
          title: partial.title ?? 'Untitled draft',
          body: partial.body ?? '',
          platform: partial.platform ?? 'x',
          hashtags: [],
          favorite: false,
          archived: false,
          createdAt: now,
          updatedAt: now,
        }
        return { payload: draft }
      },
    },
    draftUpdated(
      state,
      action: PayloadAction<{ id: string; changes: Partial<Omit<Draft, 'id'>> }>
    ) {
      const draft = state.byId[action.payload.id]
      if (!draft) return
      Object.assign(draft, action.payload.changes, { updatedAt: new Date().toISOString() })
    },
    draftDeleted(state, action: PayloadAction<string>) {
      delete state.byId[action.payload]
      state.allIds = state.allIds.filter((id) => id !== action.payload)
    },
    draftFavoriteToggled(state, action: PayloadAction<string>) {
      const draft = state.byId[action.payload]
      if (draft) draft.favorite = !draft.favorite
    },
    draftArchiveToggled(state, action: PayloadAction<string>) {
      const draft = state.byId[action.payload]
      if (draft) draft.archived = !draft.archived
    },
    draftDuplicated(state, action: PayloadAction<string>) {
      const source = state.byId[action.payload]
      if (!source) return
      const now = new Date().toISOString()
      const copy: Draft = {
        ...source,
        id: createId('draft'),
        title: `${source.title} (copy)`,
        createdAt: now,
        updatedAt: now,
      }
      state.byId[copy.id] = copy
      state.allIds.unshift(copy.id)
    },
  },
})

export const {
  draftCreated,
  draftUpdated,
  draftDeleted,
  draftFavoriteToggled,
  draftArchiveToggled,
  draftDuplicated,
} = draftsSlice.actions

export default draftsSlice.reducer
