import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'
import { typeScale } from '@/tokens'

export default function Typography() {
  return (
    <div>
      <PageHeader
        title="Typography"
        description="Major Third (1.25) type scale at 15px base. Inter for UI, JetBrains Mono for code."
      />

      {/* Font Stack */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Font Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">Sans — UI Text</p>
            <p className="text-xl font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-sans)' }}>
              Inter Variable
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] mt-2">
              --font-sans: 'Inter', -apple-system, ...
            </p>
          </div>
          <div className="p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">Mono — Code</p>
            <p className="text-xl font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>
              JetBrains Mono
            </p>
            <p className="text-xs font-mono text-[var(--text-muted)] mt-2">
              --font-mono: 'JetBrains Mono', 'Fira Code', ...
            </p>
          </div>
        </div>
      </section>

      {/* Type Scale */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Type Scale</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Major Third ratio (1.25). Fluid clamped for md+ sizes.</p>

        <div className="space-y-4">
          {Object.entries(typeScale).map(([key, val]) => (
            <div
              key={key}
              className="flex items-baseline gap-4 p-4 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]"
            >
              <span className="text-xs font-mono text-[var(--jade-light)] w-12 shrink-0">{key}</span>
              <span
                className="text-[var(--text-primary)] flex-1"
                style={{
                  fontSize: `${val.size}px`,
                  lineHeight: `${val.lineHeight}px`,
                  fontWeight: val.weight,
                  letterSpacing: val.letterSpacing,
                }}
              >
                The quick brown phở
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0 hidden sm:block">
                {val.size}px / {val.lineHeight}px / {val.weight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Props table */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Token Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[var(--text-muted)] border-b border-[var(--border-default)]">
                <th className="pb-3 pr-4 font-medium">Token</th>
                <th className="pb-3 pr-4 font-medium">Size</th>
                <th className="pb-3 pr-4 font-medium">Line Height</th>
                <th className="pb-3 pr-4 font-medium">Weight</th>
                <th className="pb-3 font-medium">Letter Spacing</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {Object.entries(typeScale).map(([key, val]) => (
                <tr key={key} className="border-t border-[var(--border-default)]">
                  <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--font-size-{key}</td>
                  <td className="py-2.5 pr-4 font-mono">{val.size}px</td>
                  <td className="py-2.5 pr-4 font-mono">{val.lineHeight}px</td>
                  <td className="py-2.5 pr-4">{val.weight}</td>
                  <td className="py-2.5 font-mono">{val.letterSpacing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vietnamese Test */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Vietnamese Text Rendering</h2>
        <Preview
          title="Vietnamese Diacritics"
          description="Inter handles Vietnamese tone marks well at all sizes"
          code={`<p className="text-[var(--font-size-xl)]">
  Phở bò Việt Nam ngon tuyệt vời
</p>
<p className="text-[var(--font-size-base)]">
  Xin chào! Chào mừng bạn đến với Phở Chat.
</p>`}
        >
          <div className="space-y-4">
            <p className="text-[var(--text-primary)]" style={{ fontSize: '30px', lineHeight: '36px', fontWeight: 600 }}>
              Phở bò Việt Nam ngon tuyệt vời
            </p>
            <p className="text-[var(--text-primary)]" style={{ fontSize: '15px', lineHeight: '24px' }}>
              Xin chào! Chào mừng bạn đến với Phở Chat. Trải nghiệm AI chat với giao diện đẹp, nhanh, và thông minh.
              Hỗ trợ đầy đủ tiếng Việt với dấu thanh: sắc, huyền, hỏi, ngã, nặng.
            </p>
            <p className="text-xs text-[var(--text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
              ă â đ ê ô ơ ư — Ắ Ấ Đ Ế Ố Ớ Ứ
            </p>
          </div>
        </Preview>
      </section>

      {/* Font Loading */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Font Loading Strategy</h2>
        <div className="p-5 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2">
              <span className="text-[var(--jade)]">1.</span>
              <span><strong className="text-[var(--text-primary)]">Preconnect</strong> to rsms.me for Inter</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--jade)]">2.</span>
              <span><strong className="text-[var(--text-primary)]">font-display: swap</strong> — shows fallback immediately</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--jade)]">3.</span>
              <span><strong className="text-[var(--text-primary)]">System fallback stack</strong> — -apple-system, BlinkMacSystemFont, Segoe UI</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--jade)]">4.</span>
              <span><strong className="text-[var(--text-primary)]">Variable font</strong> — single file, all weights (300-900)</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
