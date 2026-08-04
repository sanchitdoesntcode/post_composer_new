import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComposeState } from '@/features/compose/types'
import type { PlatformId } from '@/types'

const initialState: ComposeState = {
  editingDraftId: null,
  text: '',
  platform: 'x',
  hashtags: ['launch', 'buildinpublic'],
  lastSavedAt: null,
}

const composeSlice = createSlice({
  name: 'compose',
  initialState,
  reducers: {
    textChanged(state, action: PayloadAction<string>) {
      state.text = action.payload
    },
    platformChanged(state, action: PayloadAction<PlatformId>) {
      state.platform = action.payload
    },
    hashtagAdded(state, action: PayloadAction<string>) {
      const tag = action.payload.trim().replace(/^#/, '')
      if (tag && !state.hashtags.includes(tag)) state.hashtags.push(tag)
    },
    hashtagRemoved(state, action: PayloadAction<number>) {
      state.hashtags.splice(action.payload, 1)
    },
    draftLoadedIntoEditor(
      state,
      action: PayloadAction<{ id: string; text: string; platform: PlatformId; hashtags: string[] }>
    ) {
      state.editingDraftId = action.payload.id
      state.text = action.payload.text
      state.platform = action.payload.platform
      state.hashtags = action.payload.hashtags
      state.lastSavedAt = null
    },
    editorReset(state) {
      state.editingDraftId = null
      state.text = ''
      state.hashtags = []
      state.lastSavedAt = null
    },
    markedSaved(state) {
      state.lastSavedAt = new Date().toISOString()
    },
  },
})

export const {
  textChanged,
  platformChanged,
  hashtagAdded,
  hashtagRemoved,
  draftLoadedIntoEditor,
  editorReset,
  markedSaved,
} = composeSlice.actions

export default composeSlice.reducer
