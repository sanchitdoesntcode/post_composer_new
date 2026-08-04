import { combineReducers } from '@reduxjs/toolkit'
import uiReducer from '@/store/uiSlice'
import workspaceReducer from '@/features/workspace/store/workspaceSlice'
import composeReducer from '@/features/compose/store/composeSlice'
import draftsReducer from '@/features/drafts/store/draftsSlice'
import collectionsReducer from '@/features/collections/store/collectionsSlice'
import insightsReducer from '@/features/insights/store/insightsSlice'
import settingsReducer from '@/features/settings/store/settingsSlice'

export const rootReducer = combineReducers({
  ui: uiReducer,
  workspace: workspaceReducer,
  compose: composeReducer,
  drafts: draftsReducer,
  collections: collectionsReducer,
  insights: insightsReducer,
  settings: settingsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
