import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ThemeMode } from '@/types'

export interface Toast {
  id: string
  message: string
}

interface UiState {
  theme: ThemeMode
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  toasts: Toast[]
}

const initialState: UiState = {
  theme: 'dark',
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    openCommandPalette(state) {
      state.commandPaletteOpen = true
    },
    closeCommandPalette(state) {
      state.commandPaletteOpen = false
    },
    toggleCommandPalette(state) {
      state.commandPaletteOpen = !state.commandPaletteOpen
    },
    pushToast: {
      reducer(state, action: PayloadAction<Toast>) {
        state.toasts.push(action.payload)
      },
      prepare(message: string) {
        return { payload: { id: crypto.randomUUID(), message } }
      },
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  toggleSidebar,
  openCommandPalette,
  closeCommandPalette,
  toggleCommandPalette,
  pushToast,
  dismissToast,
} = uiSlice.actions

export default uiSlice.reducer
