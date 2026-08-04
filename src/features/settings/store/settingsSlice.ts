import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  reducedMotion: boolean
  compactSidebar: boolean
  autosaveDrafts: boolean
  readingTimeEstimates: boolean
  keyboardShortcuts: boolean
}

const initialState: SettingsState = {
  reducedMotion: false,
  compactSidebar: false,
  autosaveDrafts: true,
  readingTimeEstimates: true,
  keyboardShortcuts: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingToggled(state, action: PayloadAction<keyof SettingsState>) {
      state[action.payload] = !state[action.payload]
    },
  },
})

export const { settingToggled } = settingsSlice.actions
export default settingsSlice.reducer
