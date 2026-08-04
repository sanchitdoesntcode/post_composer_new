import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Collection } from '@/features/collections/types'
import { createId } from '@/utils/id'

interface CollectionsState {
  byId: Record<string, Collection>
  allIds: string[]
}

const seeded: Collection[] = [
  { id: createId('col'), name: 'Product Launch', color: 'linear-gradient(135deg,#C51E1E,#FF4040)', draftIds: [] },
  { id: createId('col'), name: 'Weekly Build Logs', color: 'linear-gradient(135deg,#7A1111,#C51E1E)', draftIds: [] },
  { id: createId('col'), name: 'Design Thoughts', color: 'linear-gradient(135deg,#333,#666)', draftIds: [] },
  { id: createId('col'), name: 'Personal Brand', color: 'linear-gradient(135deg,#2EC27E,#1a8a56)', draftIds: [] },
]

const initialState: CollectionsState = {
  byId: Object.fromEntries(seeded.map((c) => [c.id, c])),
  allIds: seeded.map((c) => c.id),
}

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    collectionCreated: {
      reducer(state, action: PayloadAction<Collection>) {
        state.byId[action.payload.id] = action.payload
        state.allIds.unshift(action.payload.id)
      },
      prepare(name: string, color: string) {
        return { payload: { id: createId('col'), name, color, draftIds: [] } as Collection }
      },
    },
    draftAddedToCollection(
      state,
      action: PayloadAction<{ collectionId: string; draftId: string }>
    ) {
      const collection = state.byId[action.payload.collectionId]
      if (collection && !collection.draftIds.includes(action.payload.draftId)) {
        collection.draftIds.push(action.payload.draftId)
      }
    },
  },
})

export const { collectionCreated, draftAddedToCollection } = collectionsSlice.actions
export default collectionsSlice.reducer
