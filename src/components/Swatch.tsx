import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

interface SwatchProps {
  name: string
  value: string
  textColor?: string
  large?: boolean
}

export function Swatch({ name, value, textColor, large }: SwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isTransparent = value.includes('rgba') || value.includes('hsla')

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'group relative rounded-[var(--radius-md)] border border-[var(--border-default)]',
        'overflow-hidden text-left transition-all',
        'hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-md)]',
        large ? 'min-h-24' : 'min-h-16'
      )}
    >
      {/* Color block */}
      <div
        className={cn('w-full', large ? 'h-20' : 'h-12')}
        style={{
          backgroundColor: isTransparent ? undefined : value,
          background: isTransparent
            ? `linear-gradient(${value}, ${value}), repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 0 0 / 12px 12px`
            : undefined,
        }}
      />

      {/* Info */}
      <div className="px-3 py-2 bg-[var(--bg-surface)]">
        <p className={cn(
          'text-xs font-medium',
          textColor ?? 'text-[var(--text-primary)]'
        )}>
          {name}
        </p>
        <p className="text-[10px] font-mono text-[var(--text-muted)]">{value}</p>
      </div>

      {/* Copy indicator */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center bg-black/50',
        'opacity-0 transition-opacity',
        copied ? 'opacity-100' : 'group-hover:opacity-60'
      )}>
        {copied
          ? <Check className="w-5 h-5 text-[var(--jade-light)]" />
          : <Copy className="w-4 h-4 text-white" />
        }
      </div>
    </button>
  )
}
