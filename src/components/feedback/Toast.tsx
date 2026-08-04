import { CheckCircle2 } from 'lucide-react'

export interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="flex animate-[fadeUp_250ms_ease] items-center gap-2.5 rounded-xl border border-border bg-surface px-[18px] py-3 text-[13px] shadow-card">
      <CheckCircle2 className="h-4 w-4 text-success" strokeWidth={1.8} />
      {message}
    </div>
  )
}
