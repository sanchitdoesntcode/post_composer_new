import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectToasts } from '@/store/uiSelectors'
import { dismissToast } from '@/store/uiSlice'
import Toast from '@/components/feedback/Toast'

export default function ToastContainer() {
  const toasts = useAppSelector(selectToasts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (toasts.length === 0) return
    const timers = toasts.map((t) =>
      setTimeout(() => dispatch(dismissToast(t.id)), 2400)
    )
    return () => timers.forEach(clearTimeout)
  }, [toasts, dispatch])

  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} />
      ))}
    </div>
  )
}
