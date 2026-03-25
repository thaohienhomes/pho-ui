import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/PageHeader'
import * as LucideIcons from 'lucide-react'

// Filter to actual icon components (PascalCase, is a function)
const allIcons = Object.entries(LucideIcons).filter(
  ([name, val]) =>
    typeof val === 'function' &&
    /^[A-Z]/.test(name) &&
    name !== 'createLucideIcon' &&
    name !== 'default' &&
    !name.endsWith('Icon'),
) as [string, LucideIcons.LucideIcon][]

const SIZE_MAP = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 } as const

export default function Icons() {
  const [query, setQuery] = useState('')
  const [previewSize, setPreviewSize] = useState<keyof typeof SIZE_MAP>('lg')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!query) return allIcons
    const q = query.toLowerCase()
    return allIcons.filter(([name]) => name.toLowerCase().includes(q))
  }, [query])

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <>
      <PageHeader
        title="Icons"
        description="All available Lucide icons. Click to copy the import name. Use the iconSize map for consistent sizing."
      />

      {/* Size tokens reference */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">iconSize Map</h2>
        <div className="flex flex-wrap gap-4">
          {(Object.entries(SIZE_MAP) as [keyof typeof SIZE_MAP, number][]).map(([key, px]) => (
            <button
              key={key}
              onClick={() => setPreviewSize(key)}
              className={`
                flex items-center gap-2 rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-mono
                transition-colors duration-150
                ${previewSize === key
                  ? 'border-[var(--jade)] bg-[var(--jade-faint)] text-[var(--jade-light)]'
                  : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                }
              `}
            >
              <span className="font-semibold">{key}</span>
              <span className="text-[var(--text-muted)]">{px}px</span>
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
          className="
            w-full max-w-sm rounded-[var(--radius-sm)] border border-[var(--border-default)]
            bg-[var(--bg-elevated)] px-3 py-2 text-sm text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)] outline-none
            focus:border-[var(--jade)]
          "
        />
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
          {query && ` matching "${query}"`}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2">
        {filtered.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => handleCopy(name)}
            title={name}
            className="
              group flex flex-col items-center gap-2 rounded-[var(--radius-sm)]
              border border-transparent p-3
              transition-all duration-150
              hover:border-[var(--border-default)] hover:bg-[var(--bg-elevated)]
              active:scale-95
            "
          >
            <Icon
              size={SIZE_MAP[previewSize]}
              className="text-[var(--text-secondary)] group-hover:text-[var(--jade-light)] transition-colors"
            />
            <span className="text-[10px] text-[var(--text-muted)] truncate max-w-full">
              {copied === name ? '✓ Copied' : name}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-[var(--text-muted)]">
          No icons match "{query}"
        </p>
      )}
    </>
  )
}
