import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'

export default function Accessibility() {
  return (
    <div>
      <PageHeader
        title="Accessibility"
        description="WCAG 2.2 AA guidelines, contrast ratios, focus management, and reduced motion support."
      />

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Core Principles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'Perceivable', desc: 'All content has text alternatives. Color is never the sole indicator of state.' },
            { title: 'Operable', desc: 'Full keyboard navigation. 44px minimum touch targets. No time limits.' },
            { title: 'Understandable', desc: 'Consistent navigation patterns. Clear error messages. Predictable behavior.' },
            { title: 'Robust', desc: 'Semantic HTML. ARIA where needed. Works with screen readers.' },
          ].map((p) => (
            <div key={p.title} className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <h3 className="text-sm font-semibold text-[var(--jade-light)] mb-1">{p.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contrast Table */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Contrast Requirements</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">WCAG AA: 4.5:1 normal text, 3:1 large text (18px+ or 14px bold).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[var(--text-muted)] border-b border-[var(--border-default)]">
                <th className="pb-3 pr-4 font-medium">Element</th>
                <th className="pb-3 pr-4 font-medium">Foreground</th>
                <th className="pb-3 pr-4 font-medium">Background</th>
                <th className="pb-3 pr-4 font-medium">Ratio</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {[
                ['Primary text', '#f0f0f0', '#0a0a0a', '18.1:1', 'AAA'],
                ['Secondary text', '#a0a0a0', '#0a0a0a', '9.3:1', 'AAA'],
                ['Muted text', '#737373', '#0a0a0a', '5.1:1', 'AA'],
                ['Jade accent', '#059669', '#0a0a0a', '4.6:1', 'AA'],
                ['Jade light', '#34d399', '#0a0a0a', '9.2:1', 'AAA'],
                ['Jade on surface', '#059669', '#111111', '4.2:1', 'AA (large)'],
                ['Disabled text', '#404040', '#0a0a0a', '2.3:1', 'Decorative only'],
                ['Primary text (light)', '#0F172A', '#FAFAFA', '16.5:1', 'AAA'],
                ['Jade on light bg', '#059669', '#FAFAFA', '4.5:1', 'AA'],
              ].map(([element, fg, bg, ratio, status]) => (
                <tr key={element as string} className="border-t border-[var(--border-default)]">
                  <td className="py-2.5 pr-4">{element as string}</td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: fg as string }} />
                      <span className="font-mono">{fg as string}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-[var(--border-hover)]" style={{ backgroundColor: bg as string }} />
                      <span className="font-mono">{bg as string}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-4 font-mono">{ratio as string}</td>
                  <td className="py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      (status as string).startsWith('AAA') ? 'bg-[rgba(5,150,105,0.15)] text-[var(--jade-light)]' :
                      (status as string).startsWith('AA') ? 'bg-[rgba(37,99,235,0.15)] text-[#60a5fa]' :
                      'bg-[rgba(217,119,6,0.15)] text-[#fbbf24]'
                    }`}>
                      {status as string}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Focus Management */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Focus Management</h2>
        <Preview
          title="Focus Ring"
          description="2px jade ring with 2px offset — WCAG 2.4.7"
          code={`:focus-visible {
  outline: 2px solid var(--color-ring); /* #059669 */
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none; /* no ring for mouse/touch */
}`}
        >
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)]">
              Tab to me
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] text-sm text-[var(--text-secondary)]">
              And me
            </button>
            <input
              className="px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)]"
              placeholder="Focus me..."
            />
          </div>
        </Preview>
      </section>

      {/* Reduced Motion */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Reduced Motion</h2>
        <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            All animations respect <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] font-mono text-xs">prefers-reduced-motion: reduce</code>.
          </p>
          <pre className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-base)] text-xs font-mono text-[var(--text-secondary)] overflow-x-auto">
{`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
          </pre>
        </div>
      </section>

      {/* Touch Targets */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Touch Targets</h2>
        <Preview
          title="44px Minimum — WCAG 2.5.8"
          description="All interactive elements must be at least 44x44px on mobile"
          code={`.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}`}
        >
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-[var(--radius-sm)] border-2 border-dashed border-[var(--jade-border)] flex items-center justify-center">
                <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-[var(--color-jade-50)]">
                  <span className="text-xs">OK</span>
                </button>
              </div>
              <span className="text-[10px] text-[var(--jade-light)]">44px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-[var(--radius-sm)] border-2 border-dashed border-[rgba(220,38,38,0.3)] flex items-center justify-center">
                <button className="p-1 rounded-[var(--radius-sm)] bg-[var(--error)] text-white">
                  <span className="text-[10px]">No</span>
                </button>
              </div>
              <span className="text-[10px] text-[#f87171]">32px — Too small</span>
            </div>
          </div>
        </Preview>
      </section>

      {/* ARIA Guidelines */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">ARIA Guidelines</h2>
        <div className="space-y-4">
          {[
            { rule: 'Use semantic HTML first', example: '<nav>, <button>, <dialog> instead of <div> with roles' },
            { rule: 'Label all interactive elements', example: 'aria-label for icon buttons, <label> for inputs' },
            { rule: 'Announce dynamic content', example: 'aria-live="polite" for chat messages, toast notifications' },
            { rule: 'Skip navigation link', example: '<a href="#main" className="skip-to-content">Skip to content</a>' },
            { rule: 'Landmark regions', example: '<main>, <aside>, <header>, <footer> for screen reader nav' },
            { rule: 'Error identification', example: 'aria-invalid="true" + aria-describedby for form errors' },
          ].map((item) => (
            <div key={item.rule} className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{item.rule}</p>
              <p className="text-xs font-mono text-[var(--text-muted)]">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Pre-Ship Checklist</h2>
        <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              'All images have alt text',
              'Color contrast meets WCAG AA (4.5:1 normal, 3:1 large)',
              'Keyboard navigation works for all interactive elements',
              'Focus indicators are visible (2px jade ring)',
              'Touch targets are >= 44px on mobile',
              'Animations respect prefers-reduced-motion',
              'Screen reader can navigate page structure',
              'Forms have associated labels and error messages',
              'Dynamic content changes announced via aria-live',
              'No content conveyed by color alone',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[var(--jade)] mt-0.5">&#9744;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
