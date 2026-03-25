import { useEffect, useState } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

type Theme = 'dark' | 'light' | 'system'

function getStored(): Theme {
  try {
    const v = localStorage.getItem('pho-ui-theme')
    if (v === 'dark' || v === 'light' || v === 'system') return v
  } catch { /* noop */ }
  return 'dark'
}

function resolve(t: Theme): 'dark' | 'light' {
  if (t !== 'system') return t
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function apply(t: Theme) {
  const r = resolve(t)
  document.documentElement.classList.toggle('light', r === 'light')
  document.documentElement.style.colorScheme = r
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(getStored)

  useEffect(() => {
    apply(theme)
    try { localStorage.setItem('pho-ui-theme', theme) } catch { /* noop */ }
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const h = () => apply('system')
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [theme])

  const cycle = () => {
    const order: Theme[] = ['dark', 'light', 'system']
    setTheme(order[(order.indexOf(theme) + 1) % 3]!)
  }

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor
  const label = theme === 'system' ? `System (${resolve(theme)})` : theme

  return (
    <button
      onClick={cycle}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1.5',
        'text-xs text-[var(--text-secondary)] capitalize',
        'hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
        'transition-colors',
        className,
      )}
      aria-label={`Theme: ${label}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  )
}
