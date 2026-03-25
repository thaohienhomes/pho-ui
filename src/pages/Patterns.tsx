import { PageHeader } from '@/components/PageHeader'

/* ─── Demo mini-components ─── */

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 ${className}`}>
      {children}
    </div>
  )
}

function Placeholder({ h = 'h-8', label }: { h?: string; label: string }) {
  return (
    <div className={`${h} rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] flex items-center justify-center`}>
      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
    </div>
  )
}

/* ─── Page ─── */

export default function Patterns() {
  return (
    <>
      <PageHeader
        title="Patterns"
        description="Common layout patterns used across Phở Chat. Copy the structure, customize the content."
      />

      {/* ─── Sidebar + Content ─── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Sidebar + Content</h2>
        <p className="text-xs text-[var(--text-muted)] mb-4">Primary app layout. Fixed sidebar, scrollable content area.</p>
        <Card>
          <div className="flex gap-3 h-48">
            <div className="w-48 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-base)] p-3 flex flex-col gap-2">
              <Placeholder h="h-6" label="Logo" />
              <Placeholder h="h-4" label="Nav 1" />
              <Placeholder h="h-4" label="Nav 2" />
              <Placeholder h="h-4" label="Nav 3" />
              <div className="flex-1" />
              <Placeholder h="h-6" label="User" />
            </div>
            <div className="flex-1 rounded-[var(--radius-sm)] border border-dashed border-[var(--border-default)] p-3 flex items-center justify-center">
              <span className="text-xs text-[var(--text-muted)]">Main Content Area</span>
            </div>
          </div>
        </Card>
      </section>

      {/* ─── Chat Layout ─── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Chat Layout</h2>
        <p className="text-xs text-[var(--text-muted)] mb-4">Message list with fixed input at bottom. Messages alternate sides.</p>
        <Card>
          <div className="flex flex-col h-56">
            <Placeholder h="h-8" label="Chat Header" />
            <div className="flex-1 overflow-hidden py-3 flex flex-col gap-2">
              <div className="flex">
                <div className="max-w-[60%] rounded-[var(--radius-md)] bg-[var(--bg-elevated)] px-3 py-2">
                  <span className="text-xs text-[var(--text-secondary)]">AI response message</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[60%] rounded-[var(--radius-md)] bg-[var(--jade)] px-3 py-2">
                  <span className="text-xs text-white">User message</span>
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[60%] rounded-[var(--radius-md)] bg-[var(--bg-elevated)] px-3 py-2">
                  <span className="text-xs text-[var(--text-secondary)]">AI response message</span>
                </div>
              </div>
            </div>
            <Placeholder h="h-10" label="Input Bar" />
          </div>
        </Card>
      </section>

      {/* ─── Dashboard Cards ─── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Dashboard Grid</h2>
        <p className="text-xs text-[var(--text-muted)] mb-4">Responsive card grid for metrics, settings, or feature panels.</p>
        <Card>
          <div className="grid grid-cols-3 gap-3">
            {['Metric A', 'Metric B', 'Metric C'].map((label) => (
              <div key={label} className="rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">{label}</span>
                <div className="mt-1 text-lg font-semibold text-[var(--jade-light)]">42.5k</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ─── Form Stack ─── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Form Stack</h2>
        <p className="text-xs text-[var(--text-muted)] mb-4">Label + input pairs with consistent spacing. Used in settings & onboarding.</p>
        <Card className="max-w-md">
          <div className="flex flex-col gap-4">
            {['Display Name', 'Email', 'API Key'].map((label) => (
              <div key={label}>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{label}</label>
                <div className="h-9 rounded-[var(--radius-sm)] border border-[var(--border-default)] bg-[var(--bg-elevated)]" />
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <div className="h-8 w-20 rounded-[var(--radius-sm)] border border-[var(--border-default)] flex items-center justify-center">
                <span className="text-[10px] text-[var(--text-muted)]">Cancel</span>
              </div>
              <div className="h-8 w-20 rounded-[var(--radius-sm)] bg-[var(--jade)] flex items-center justify-center">
                <span className="text-[10px] text-white">Save</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ─── Empty State ─── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Empty State</h2>
        <p className="text-xs text-[var(--text-muted)] mb-4">Centered illustration + message + CTA. Used when lists are empty.</p>
        <Card>
          <div className="flex flex-col items-center py-10">
            <div className="size-14 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-3">
              <span className="text-xl">💬</span>
            </div>
            <span className="text-sm font-medium text-[var(--text-primary)]">No conversations yet</span>
            <span className="text-xs text-[var(--text-muted)] mt-1">Start a new chat to begin exploring</span>
            <div className="mt-4 h-8 w-28 rounded-[var(--radius-sm)] bg-[var(--jade)] flex items-center justify-center">
              <span className="text-xs text-white">New Chat</span>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
