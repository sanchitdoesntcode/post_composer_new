import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectTheme } from '@/store/uiSelectors'
import { toggleTheme, setTheme } from '@/store/uiSlice'
import type { ThemeMode } from '@/types'

export function useTheme() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)

  return {
    theme,
    toggle: () => dispatch(toggleTheme()),
    set: (mode: ThemeMode) => dispatch(setTheme(mode)),
  }
}
