import { forwardRef, type TextareaHTMLAttributes } from 'react'
import clsx from 'clsx'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        'w-full resize-y bg-transparent p-[22px] text-[15.5px] leading-[1.7] text-text-primary placeholder:text-text-muted outline-none',
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export default Textarea
