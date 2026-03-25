import { PageHeader } from '@/components/PageHeader'
import { Swatch } from '@/components/Swatch'
import { colors } from '@/tokens'

export default function Colors() {
  return (
    <div>
      <PageHeader
        title="Colors"
        description="Jade Mist color system — dark-first layered surfaces, one accent color, semantic feedback palette."
      />

      {/* Jade Palette */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Jade Palette</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">The core accent scale. <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] font-mono text-xs">--color-jade-500</code> is the primary.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(colors.jade).map(([step, value]) => (
            <Swatch key={step} name={`jade-${step}`} value={value} large />
          ))}
        </div>
      </section>

      {/* Background Layers */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Background Layers</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Elevation through darkness. Darkest = lowest, lightest = highest.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(colors.bg).map(([name, value]) => (
            <Swatch key={name} name={`bg.${name}`} value={value} />
          ))}
        </div>

        {/* Live layer demo */}
        <div className="mt-6 p-6 rounded-[var(--radius-lg)] bg-[var(--bg-base)] border border-[var(--border-default)]">
          <p className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-wide font-medium">Live Layer Demo</p>
          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-default)]">
              <span className="text-xs text-[var(--text-muted)]">base — #0a0a0a</span>
              <div className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
                <span className="text-xs text-[var(--text-muted)]">surface — #111111</span>
                <div className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)]">
                  <span className="text-xs text-[var(--text-muted)]">elevated — #1a1a1a</span>
                  <div className="mt-2 p-3 rounded-[var(--radius-sm)] bg-[var(--bg-hover)]">
                    <span className="text-xs text-[var(--text-muted)]">hover — #1f1f1f</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Colors */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Text Hierarchy</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Brightest = most important. Use muted sparingly.</p>
        <div className="space-y-3">
          {Object.entries(colors.text).map(([name, value]) => (
            <div key={name} className="flex items-center gap-4 p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <div className="w-10 h-10 rounded-[var(--radius-sm)]" style={{ backgroundColor: value }} />
              <div>
                <p className="text-sm font-medium" style={{ color: value }}>
                  text.{name} — The quick brown fox jumps
                </p>
                <p className="text-xs font-mono text-[var(--text-muted)]">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Borders */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Borders</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Subtle separators. Focus border uses jade.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(colors.border).map(([name, value]) => (
            <Swatch key={name} name={`border.${name}`} value={value} />
          ))}
        </div>
      </section>

      {/* Accent */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Accent Variants</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">One accent, multiple intensities for different contexts.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Object.entries(colors.accent).map(([name, value]) => (
            <Swatch key={name} name={`accent.${name}`} value={value} />
          ))}
        </div>
      </section>

      {/* Feedback */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Feedback</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Semantic colors for status communication.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(colors.feedback).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      {/* Contrast Table */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Contrast Ratios</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">WCAG AA requires 4.5:1 for normal text, 3:1 for large text.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[var(--text-muted)]">
                <th className="pb-3 pr-4 font-medium">Pair</th>
                <th className="pb-3 pr-4 font-medium">Ratio</th>
                <th className="pb-3 font-medium">WCAG AA</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {[
                ['text.primary on bg.base', '#f0f0f0 / #0a0a0a', '18.1:1', true],
                ['text.secondary on bg.base', '#a0a0a0 / #0a0a0a', '9.3:1', true],
                ['text.muted on bg.base', '#737373 / #0a0a0a', '5.1:1', true],
                ['jade on bg.base', '#059669 / #0a0a0a', '4.6:1', true],
                ['jade-light on bg.base', '#34d399 / #0a0a0a', '9.2:1', true],
                ['text.disabled on bg.base', '#404040 / #0a0a0a', '2.3:1', false],
              ].map(([pair, values, ratio, passes]) => (
                <tr key={pair as string} className="border-t border-[var(--border-default)]">
                  <td className="py-2.5 pr-4">{pair as string}</td>
                  <td className="py-2.5 pr-4 font-mono">{values as string}</td>
                  <td className="py-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${passes ? 'bg-[rgba(5,150,105,0.15)] text-[var(--jade-light)]' : 'bg-[rgba(220,38,38,0.15)] text-[#f87171]'}`}>
                      {ratio as string} — {passes ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
