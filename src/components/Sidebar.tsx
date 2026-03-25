import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Palette,
  Type,
  Ruler,
  Component,
  Zap,
  Accessibility,
  BookOpen,
  X,
  Menu,
  Smile,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Overview', icon: BookOpen },
  { to: '/colors', label: 'Colors', icon: Palette },
  { to: '/typography', label: 'Typography', icon: Type },
  { to: '/spacing', label: 'Spacing', icon: Ruler },
  { to: '/components', label: 'Components', icon: Component },
  { to: '/icons', label: 'Icons', icon: Smile },
  { to: '/patterns', label: 'Patterns', icon: LayoutGrid },
  { to: '/motion', label: 'Motion', icon: Zap },
  { to: '/accessibility', label: 'Accessibility', icon: Accessibility },
  { to: '/shaders', label: 'Shaders', icon: Sparkles },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed top-4 left-4 z-50 p-2 rounded-[var(--radius-sm)]',
          'bg-[var(--bg-surface)] border border-[var(--border-default)]',
          'lg:hidden'
        )}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-[280px] bg-[var(--bg-surface)] border-r border-[var(--border-default)]',
          'flex flex-col overflow-y-auto',
          'transition-transform duration-200',
          'lg:translate-x-0 lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-default)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--jade)] flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-jade-50)]">P</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">Phở UI</span>
              <span className="block text-[10px] text-[var(--text-muted)] tracking-wide uppercase">Design System</span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)] lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3" aria-label="Documentation">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-sm',
                      'transition-colors duration-[var(--duration-fast)]',
                      isActive
                        ? 'bg-[var(--jade-faint)] text-[var(--jade-light)] font-medium'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                    )
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--border-default)]">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">
            Jade Mist Theme v2
          </p>
        </div>
      </aside>
    </>
  )
}
