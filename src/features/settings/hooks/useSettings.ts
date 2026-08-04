import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RootState } from '@/store/rootReducer'
import { settingToggled } from '@/features/settings/store/settingsSlice'
import { selectTheme } from '@/store/uiSelectors'
import { setTheme } from '@/store/uiSlice'
import type { ThemeMode } from '@/types'

export function useSettings() {
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state: RootState) => state.settings)
  const theme = useAppSelector(selectTheme)

  return {
    ...settings,
    theme,
    setTheme: (mode: ThemeMode) => dispatch(setTheme(mode)),
    toggle: (key: keyof typeof settings) => dispatch(settingToggled(key)),
  }
}
