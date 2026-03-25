import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Code, Eye, Copy, Check } from 'lucide-react'

interface PreviewProps {
  title: string
  description?: string
  code: string
  children: React.ReactNode
}

export function Preview({ title, description, code, children }: PreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
          {description && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCode(false)}
            className={cn(
              'p-1.5 rounded-[var(--radius-sm)] text-xs',
              !showCode
                ? 'bg-[var(--jade-faint)] text-[var(--jade-light)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            )}
            aria-label="Show preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowCode(true)}
            className={cn(
              'p-1.5 rounded-[var(--radius-sm)] text-xs',
              showCode
                ? 'bg-[var(--jade-faint)] text-[var(--jade-light)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            )}
            aria-label="Show code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!showCode ? (
        <div className="p-6 bg-[var(--bg-base)]">
          {children}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-default)]"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--jade)]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <pre className="p-4 bg-[var(--bg-surface)] overflow-x-auto text-xs leading-relaxed">
            <code className="text-[var(--text-secondary)] font-[var(--font-mono)]">{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
