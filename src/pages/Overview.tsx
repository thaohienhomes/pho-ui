import { PageHeader } from '@/components/PageHeader'
import { Palette, Type, Ruler, Zap, Component, Accessibility } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const sections = [
  { to: '/colors', label: 'Colors', desc: 'Jade Mist palette, surfaces, borders, and semantic colors.', icon: Palette },
  { to: '/typography', label: 'Typography', desc: 'Type scale, font loading, Vietnamese text support.', icon: Type },
  { to: '/spacing', label: 'Spacing', desc: '4px grid, spacing scale, live layout demos.', icon: Ruler },
  { to: '/components', label: 'Components', desc: 'Interactive previews with code snippets.', icon: Component },
  { to: '/motion', label: 'Motion', desc: 'Easing curves, durations, and animation tokens.', icon: Zap },
  { to: '/accessibility', label: 'Accessibility', desc: 'WCAG guidelines, contrast ratios, focus management.', icon: Accessibility },
]

const principles = [
  { title: 'Quiet Luxury', desc: 'Minimal, content-focused. Let whitespace and typography speak.' },
  { title: 'One Accent', desc: 'Only Jade Green #059669. No scattered rainbow accents.' },
  { title: 'Dark-First', desc: '#0A0A0A default background. Light theme supported but secondary.' },
  { title: 'Generous Space', desc: '24-32px padding, 16-24px gaps. Room to breathe.' },
  { title: 'Smooth Motion', desc: '200-300ms transitions. Expo easing for natural feel.' },
]

export default function Overview() {
  return (
    <div>
      <PageHeader
        title="Phở UI Design System"
        description="The design language for Phở Chat — Vietnamese branding meets quiet luxury. Jade Mist tokens, components, and guidelines."
      />

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-6">
          Design Principles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]"
            >
              <h3 className="text-sm font-semibold text-[var(--jade-light)] mb-1">{p.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">
          Quick Start
        </h2>
        <div className="p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Phở UI uses shadcn/ui components with Jade Mist tokens. Copy the design tokens CSS into your project:
          </p>
          <pre className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-base)] text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
{`/* Import the design tokens */
@import 'tailwindcss';

/* Copy CSS variables from globals.css */
:root {
  --jade: #059669;
  --bg-base: #0a0a0a;
  --bg-surface: #111111;
  --text-primary: #f0f0f0;
  /* ... full tokens in Colors page */
}`}
          </pre>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">
          Tech Stack
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Frontend', 'Vite 6, React 19, TanStack Router'],
            ['Styling', 'Tailwind CSS v4'],
            ['State', 'Zustand'],
            ['API', 'Hono, tRPC v11'],
            ['Database', 'PostgreSQL (Neon) + Drizzle ORM'],
            ['AI Runtime', '@pho/model-runtime (40+ providers)'],
          ].map(([label, tech]) => (
            <div key={label} className="flex gap-3 p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <span className="text-xs font-semibold text-[var(--jade-light)] min-w-[80px]">{label}</span>
              <span className="text-xs text-[var(--text-secondary)]">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section cards */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-6">
          Explore
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ to, label, desc, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'group p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]',
                'transition-all hover:border-[var(--jade-border)] hover:shadow-[var(--shadow-glow)]'
              )}
            >
              <Icon className="w-5 h-5 text-[var(--jade)] mb-3 transition-transform group-hover:scale-110" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{label}</h3>
              <p className="text-xs text-[var(--text-muted)]">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
