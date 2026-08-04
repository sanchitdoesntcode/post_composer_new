import { useEffect } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectTheme } from '@/store/uiSelectors'
import AppRoutes from '@/routes/AppRoutes'
import ToastContainer from '@/components/feedback/ToastContainer'
import CommandPalette from '@/components/layout/CommandPalette'

export default function App() {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <AppRoutes />
      <CommandPalette />
      <ToastContainer />
    </>
  )
}
