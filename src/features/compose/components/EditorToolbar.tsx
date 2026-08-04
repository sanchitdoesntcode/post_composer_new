import { Bold, Italic, AtSign, Image, Smile } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

export interface EditorToolbarProps {
  onInsertEmoji: () => void
}

export default function EditorToolbar({ onInsertEmoji }: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-0.5 border-b border-divider px-3 py-2.5">
      <IconButton title="Bold" className="h-8 w-8">
        <Bold className="h-4 w-4" strokeWidth={1.8} />
      </IconButton>
      <IconButton title="Italic" className="h-8 w-8">
        <Italic className="h-4 w-4" strokeWidth={1.8} />
      </IconButton>
      <span className="mx-1.5 h-5 w-px bg-divider" />
      <IconButton title="Mention" className="h-8 w-8">
        <AtSign className="h-4 w-4" strokeWidth={1.8} />
      </IconButton>
      <IconButton title="Media" className="h-8 w-8">
        <Image className="h-4 w-4" strokeWidth={1.8} />
      </IconButton>
      <IconButton title="Emoji" className="h-8 w-8" onClick={onInsertEmoji}>
        <Smile className="h-4 w-4" strokeWidth={1.8} />
      </IconButton>
    </div>
  )
}
