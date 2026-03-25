import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'
import { motion } from '@/tokens'
import { useState } from 'react'
import { cn } from '@/lib/utils'

function EasingDemo({ name, value }: { name: string; value: string }) {
  const [play, setPlay] = useState(false)

  const trigger = () => {
    setPlay(false)
    requestAnimationFrame(() => setPlay(true))
  }

  return (
    <button
      onClick={trigger}
      className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)] text-left hover:border-[var(--border-hover)] transition-colors"
    >
      <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{name}</p>
      <p className="text-[10px] font-mono text-[var(--text-muted)] mb-3">{value}</p>
      <div className="h-2 bg-[var(--bg-base)] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-[var(--jade)]', play ? 'w-full' : 'w-0')}
          style={{
            transition: play ? `width 600ms ${value}` : 'none',
          }}
        />
      </div>
      <p className="text-[10px] text-[var(--text-muted)] mt-2">Click to replay</p>
    </button>
  )
}

function DurationDemo({ name, value }: { name: string; value: string }) {
  const [play, setPlay] = useState(false)

  const trigger = () => {
    setPlay(false)
    requestAnimationFrame(() => setPlay(true))
  }

  return (
    <button
      onClick={trigger}
      className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)] text-left hover:border-[var(--border-hover)] transition-colors"
    >
      <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{name}</p>
      <p className="text-[10px] font-mono text-[var(--text-muted)] mb-3">{value}</p>
      <div className="h-2 bg-[var(--bg-base)] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-[var(--jade-light)]', play ? 'w-full' : 'w-0')}
          style={{
            transition: play ? `width ${value} cubic-bezier(0.16, 1, 0.3, 1)` : 'none',
          }}
        />
      </div>
      <p className="text-[10px] text-[var(--text-muted)] mt-2">Click to replay</p>
    </button>
  )
}

export default function Motion() {
  const [showCard, setShowCard] = useState(true)

  return (
    <div>
      <PageHeader
        title="Motion"
        description="Animation tokens and transition demos. Smooth, purposeful motion with expo easing."
      />

      {/* Easing Curves */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Easing Curves</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Click each card to see the easing in action.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(motion.easing).map(([name, value]) => (
            <EasingDemo key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      {/* Durations */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-2">Durations</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">Three speeds for different interaction types.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(motion.duration).map(([name, value]) => (
            <DurationDemo key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      {/* Token Reference */}
      <section className="mb-12">
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Token Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[var(--text-muted)] border-b border-[var(--border-default)]">
                <th className="pb-3 pr-4 font-medium">CSS Variable</th>
                <th className="pb-3 pr-4 font-medium">Value</th>
                <th className="pb-3 font-medium">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              <tr className="border-t border-[var(--border-default)]">
                <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--ease-default</td>
                <td className="py-2.5 pr-4 font-mono">{motion.easing.default}</td>
                <td className="py-2.5">Default for all UI transitions</td>
              </tr>
              <tr className="border-t border-[var(--border-default)]">
                <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--ease-spring</td>
                <td className="py-2.5 pr-4 font-mono">{motion.easing.spring}</td>
                <td className="py-2.5">Bouncy — tooltips, popovers, notifications</td>
              </tr>
              <tr className="border-t border-[var(--border-default)]">
                <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--duration-fast</td>
                <td className="py-2.5 pr-4 font-mono">{motion.duration.fast}</td>
                <td className="py-2.5">Hover states, color changes</td>
              </tr>
              <tr className="border-t border-[var(--border-default)]">
                <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--duration-normal</td>
                <td className="py-2.5 pr-4 font-mono">{motion.duration.normal}</td>
                <td className="py-2.5">Expand/collapse, slide transitions</td>
              </tr>
              <tr className="border-t border-[var(--border-default)]">
                <td className="py-2.5 pr-4 font-mono text-[var(--jade-light)]">--duration-slow</td>
                <td className="py-2.5 pr-4 font-mono">{motion.duration.slow}</td>
                <td className="py-2.5">Page transitions, modals</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Transition Demo */}
      <section className="mb-12">
        <Preview
          title="Fade In Up"
          description="Default entrance animation for content"
          code={`@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 300ms var(--ease-default) both;
}`}
        >
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => { setShowCard(false); setTimeout(() => setShowCard(true), 100) }}
              className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)] hover:bg-[var(--jade-dim)] transition-colors"
            >
              Replay Animation
            </button>
            {showCard && (
              <div className="animate-fade-in-up p-5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)] max-w-xs">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Animated Card</h3>
                <p className="text-xs text-[var(--text-secondary)]">This card fades in and slides up on mount.</p>
              </div>
            )}
          </div>
        </Preview>
      </section>

      {/* Guidelines */}
      <section>
        <h2 className="text-[var(--font-size-lg)] font-semibold text-[var(--text-primary)] mb-4">Guidelines</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-5 rounded-[var(--radius-md)] border border-[rgba(5,150,105,0.2)] bg-[var(--bg-surface)]">
            <p className="text-xs font-semibold text-[var(--jade-light)] uppercase tracking-wide mb-3">Do</p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>Use expo easing (--ease-default) for natural feel</li>
              <li>Keep transitions under 350ms for responsiveness</li>
              <li>Use spring easing for playful elements only</li>
              <li>Respect prefers-reduced-motion</li>
              <li>Animate opacity + transform together</li>
            </ul>
          </div>
          <div className="p-5 rounded-[var(--radius-md)] border border-[rgba(220,38,38,0.2)] bg-[var(--bg-surface)]">
            <p className="text-xs font-semibold text-[#f87171] uppercase tracking-wide mb-3">Don't</p>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>Use linear easing for UI transitions</li>
              <li>Animate layout properties (width, height, top)</li>
              <li>Add animation just for decoration</li>
              <li>Use more than 2 backdrop-blur effects at once</li>
              <li>Exceed 500ms for any transition</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
