import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'
import { space } from '@/tokens'

export default function Spacing() {
  return (
    <div>
      <PageHeader
        title="Spacing"
        description="4px base grid. space(n) = n x 4px. Consistent rhythm across all components."
      />

      {/* Scale */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Spacing Scale</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Every value is a multiple of 4px.</p>
        <div className="space-y-2">
          {Object.entries(space).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="text-xs font-mono text-[var(--jade-light)] w-10 text-right shrink-0">{key}</span>
              <div
                className="h-6 rounded-[var(--radius-sm)] bg-[var(--jade-dim)]"
                style={{ width: value, minWidth: '2px' }}
              />
              <span className="text-xs font-mono text-[var(--text-muted)]">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4px Grid Demo */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">4px Grid</h2>
        <Preview
          title="Grid Alignment"
          description="All elements snap to a 4px grid"
          code={`/* Spacing tokens */
const space = {
  1: '4px',    // tight
  2: '8px',    // compact
  3: '12px',   // default gap
  4: '16px',   // section gap
  6: '24px',   // generous
  8: '32px',   // layout
};

/* Usage */
<div className="p-4 gap-3">
  <Card className="p-6" />
</div>`}
        >
          <div
            className="relative p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]"
            style={{
              backgroundImage: 'linear-gradient(rgba(5,150,105,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.06) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
            }}
          >
            <div className="flex gap-3">
              <div className="flex-1 p-4 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)]">
                <div className="h-3 w-24 rounded bg-[var(--jade-faint)] mb-2" />
                <div className="h-2 w-full rounded bg-[var(--bg-hover)]" />
                <div className="h-2 w-3/4 rounded bg-[var(--bg-hover)] mt-1" />
              </div>
              <div className="flex-1 p-4 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)]">
                <div className="h-3 w-20 rounded bg-[var(--jade-faint)] mb-2" />
                <div className="h-2 w-full rounded bg-[var(--bg-hover)]" />
                <div className="h-2 w-1/2 rounded bg-[var(--bg-hover)] mt-1" />
              </div>
            </div>
          </div>
        </Preview>
      </section>

      {/* Live Card Demo */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Live Card Demo</h2>
        <Preview
          title="Card Spacing Anatomy"
          description="Padding, gaps, and margins visualized"
          code={`<div className="p-6 rounded-[var(--radius-md)] border bg-surface">
  <h3 className="text-sm font-semibold mb-3">Card Title</h3>
  <p className="text-xs text-muted mb-4">Description text</p>
  <div className="flex gap-2">
    <button className="px-3 py-1.5 rounded-sm">Action</button>
  </div>
</div>`}
        >
          <div className="max-w-sm mx-auto">
            {/* Outer padding indicator */}
            <div className="relative p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              {/* Padding markers */}
              <div className="absolute top-0 left-6 right-6 h-6 border-l border-r border-b border-dashed border-[var(--jade-border)] opacity-50" />
              <div className="absolute left-0 top-6 bottom-6 w-6 border-t border-b border-r border-dashed border-[var(--jade-border)] opacity-50" />

              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Card Title</h3>
              <p className="text-xs text-[var(--text-secondary)] mb-4">
                Description text with generous breathing room. 24px padding on all sides.
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--jade)] text-xs font-medium text-[var(--color-jade-50)]">
                  Primary
                </button>
                <button className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)] border border-[var(--border-default)]">
                  Secondary
                </button>
              </div>

              {/* Size annotations */}
              <div className="absolute -right-16 top-0 h-6 flex items-center">
                <span className="text-[10px] font-mono text-[var(--jade-light)]">24px</span>
              </div>
            </div>
          </div>
        </Preview>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Usage Guidelines</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-5 rounded-[var(--radius-md)] border border-[rgba(5,150,105,0.2)] bg-[var(--bg-surface)]">
            <p className="text-xs font-semibold text-[var(--jade-light)] uppercase tracking-wide mb-3">Do</p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>Use 4px multiples for all spacing</li>
              <li>24-32px padding for cards and sections</li>
              <li>12-16px gaps between related items</li>
              <li>8px for tight spacing (badges, tags)</li>
            </ul>
          </div>
          <div className="p-5 rounded-[var(--radius-md)] border border-[rgba(220,38,38,0.2)] bg-[var(--bg-surface)]">
            <p className="text-xs font-semibold text-[#f87171] uppercase tracking-wide mb-3">Don't</p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>Use odd pixel values (5px, 7px, 13px)</li>
              <li>Mix spacing systems (rem + px randomly)</li>
              <li>Use less than 44px touch targets on mobile</li>
              <li>Forget to test spacing on mobile viewport</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
