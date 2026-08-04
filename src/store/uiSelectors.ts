import type { RootState } from '@/store/rootReducer'

export const selectTheme = (state: RootState) => state.ui.theme
export const selectSidebarCollapsed = (state: RootState) => state.ui.sidebarCollapsed
export const selectCommandPaletteOpen = (state: RootState) => state.ui.commandPaletteOpen
export const selectToasts = (state: RootState) => state.ui.toasts
