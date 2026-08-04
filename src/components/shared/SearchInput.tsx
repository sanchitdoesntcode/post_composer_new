import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export default function SearchInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-btn border border-border bg-surface px-4 py-2.5',
        className
      )}
    >
      <Search className="h-[15px] w-[15px] text-text-muted" strokeWidth={1.8} />
      <input
        className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-muted outline-none"
        {...props}
      />
    </div>
  )
}
