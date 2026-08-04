import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/rootReducer'

export const selectCollectionsState = (state: RootState) => state.collections

export const selectAllCollections = createSelector(selectCollectionsState, (collections) =>
  collections.allIds.map((id) => collections.byId[id])
)
