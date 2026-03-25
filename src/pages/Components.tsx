import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'
import { Send, Sparkles, Copy, Check, ChevronDown, X, Search, Plus, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

function CopyBtn() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-[var(--jade)]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function Components() {
  return (
    <div>
      <PageHeader
        title="Components"
        description="Interactive component previews with code snippets. Built with shadcn/ui + Jade Mist tokens."
      />

      {/* Buttons */}
      <section className="mb-10">
        <Preview
          title="Button"
          description="Primary, secondary, ghost, destructive variants"
          code={`<button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-jade-50 hover:bg-[var(--jade-dim)]">
  Primary
</button>

<button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] text-sm text-[var(--text-secondary)]">
  Secondary
</button>

<button className="px-4 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]">
  Ghost
</button>

<button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--error)] text-sm font-medium text-white">
  Destructive
</button>`}
        >
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)] hover:bg-[var(--jade-dim)] transition-colors">
              Primary
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-colors">
              Secondary
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors">
              Ghost
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--error)] text-sm font-medium text-white hover:opacity-90 transition-colors">
              Destructive
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)] opacity-50 cursor-not-allowed">
              Disabled
            </button>
          </div>
        </Preview>
      </section>

      {/* Button Sizes */}
      <section className="mb-10">
        <Preview
          title="Button Sizes"
          description="sm, default, lg — all respect 44px touch target on mobile"
          code={`/* sm */  <button className="px-3 py-1 text-xs rounded-[var(--radius-sm)]">Small</button>
/* md */  <button className="px-4 py-2 text-sm rounded-[var(--radius-sm)]">Default</button>
/* lg */  <button className="px-6 py-3 text-sm rounded-[var(--radius-md)]">Large</button>
/* icon */ <button className="p-2 rounded-[var(--radius-sm)]"><Icon /></button>`}
        >
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-[var(--radius-sm)] bg-[var(--jade)] text-xs font-medium text-[var(--color-jade-50)]">
              Small
            </button>
            <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)]">
              Default
            </button>
            <button className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)]">
              Large
            </button>
            <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-[var(--color-jade-50)]">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </Preview>
      </section>

      {/* Input */}
      <section className="mb-10">
        <Preview
          title="Input"
          description="Text input with jade focus ring"
          code={`<input
  className="w-full px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none"
  placeholder="Type something..."
/>`}
        >
          <div className="max-w-sm space-y-3">
            <input
              className="w-full px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none transition-colors"
              placeholder="Type something..."
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none transition-colors"
                placeholder="Search..."
              />
            </div>
          </div>
        </Preview>
      </section>

      {/* Chat Input */}
      <section className="mb-10">
        <Preview
          title="Chat Input"
          description="The main message composer"
          code={`<div className="flex items-end gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)]">
  <textarea className="flex-1 bg-transparent resize-none text-sm" placeholder="Ask anything..." />
  <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--jade)]">
    <Send className="w-4 h-4" />
  </button>
</div>`}
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-end gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)]">
              <textarea
                className="flex-1 bg-transparent resize-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none min-h-[36px]"
                placeholder="Ask anything..."
                rows={1}
              />
              <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-[var(--color-jade-50)] shrink-0 hover:bg-[var(--jade-dim)] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Preview>
      </section>

      {/* Message Bubble */}
      <section className="mb-10">
        <Preview
          title="Message Bubble"
          description="User and AI message styles"
          code={`/* User message */
<div className="ml-auto max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md bg-[var(--jade-dim)] text-sm">
  Hello!
</div>

/* AI message */
<div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md bg-[var(--bg-surface)] border border-[var(--border-default)]">
  AI response with glass effect
</div>`}
        >
          <div className="max-w-lg mx-auto space-y-3">
            <div className="flex justify-end">
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-br-md bg-[var(--jade-dim)] text-sm text-[var(--text-primary)]">
                Can you explain the Jade Mist color system?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-[var(--jade)] flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-jade-50)]" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm text-[var(--text-primary)]">
                  The Jade Mist system uses layered dark surfaces with a single jade accent (#059669). Background elevation goes from #0a0a0a (base) to #252525 (active).
                </div>
              </div>
            </div>
          </div>
        </Preview>
      </section>

      {/* Badge */}
      <section className="mb-10">
        <Preview
          title="Badge"
          description="Status indicators and labels"
          code={`<span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--jade-faint)] text-[var(--jade-light)]">
  Active
</span>`}
        >
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(5,150,105,0.15)] text-[var(--jade-light)]">Active</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(37,99,235,0.15)] text-[#60a5fa]">Info</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(217,119,6,0.15)] text-[#fbbf24]">Warning</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[rgba(220,38,38,0.15)] text-[#f87171]">Error</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-default)]">Default</span>
          </div>
        </Preview>
      </section>

      {/* Card */}
      <section className="mb-10">
        <Preview
          title="Card"
          description="Content container with surface background"
          code={`<div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
  <h3 className="text-sm font-semibold mb-2">Card Title</h3>
  <p className="text-xs text-[var(--text-secondary)]">Card content</p>
</div>`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Default Card</h3>
              <p className="text-xs text-[var(--text-secondary)]">Standard surface background with default border.</p>
            </div>
            <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--jade-border)] hover:shadow-[var(--shadow-glow)] transition-shadow">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Interactive Card</h3>
              <p className="text-xs text-[var(--text-secondary)]">Jade border with glow on hover.</p>
            </div>
          </div>
        </Preview>
      </section>

      {/* Dropdown */}
      <section className="mb-10">
        <Preview
          title="Dropdown Menu"
          description="Popover-style action menu"
          code={`<div className="w-48 p-1 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-lg)]">
  <button className="w-full px-3 py-2 text-left text-sm rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)]">
    Action
  </button>
</div>`}
        >
          <div className="w-52 p-1.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-lg">
            <button className="w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)] transition-colors">
              New Chat
            </button>
            <button className="w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between">
              Model
              <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
            </button>
            <div className="my-1 h-px bg-[var(--border-default)]" />
            <button className="w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)] transition-colors">
              Settings
            </button>
            <button className="w-full px-3 py-2 text-left text-sm text-[#f87171] rounded-[var(--radius-sm)] hover:bg-[rgba(220,38,38,0.08)] transition-colors">
              Delete
            </button>
          </div>
        </Preview>
      </section>

      {/* Tooltip */}
      <section className="mb-10">
        <Preview
          title="Tooltip"
          description="Contextual information on hover"
          code={`<div className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-md)] text-xs">
  Tooltip text
</div>`}
        >
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-md text-xs text-[var(--text-primary)]">
                Copy to clipboard
              </div>
              <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
                <Copy className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-md text-xs text-[var(--text-primary)]">
                More options
              </div>
              <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
                <MoreHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>
        </Preview>
      </section>

      {/* Dialog */}
      <section className="mb-10">
        <Preview
          title="Dialog / Modal"
          description="Overlay dialog with backdrop blur"
          code={`<div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
<div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] p-6 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-[var(--shadow-overlay)]">
  <h2>Title</h2>
  <p>Content</p>
</div>`}
        >
          <div className="relative max-w-sm mx-auto">
            <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Delete conversation?</h3>
                <button className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)]">
                  <X className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                This action cannot be undone. The conversation and all its messages will be permanently deleted.
              </p>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--error)] text-sm font-medium text-white hover:opacity-90 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Preview>
      </section>

      {/* Copy Button */}
      <section className="mb-10">
        <Preview
          title="Copy Button"
          description="Click-to-copy with check feedback"
          code={`const [copied, setCopied] = useState(false)

<button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }}>
  {copied ? <Check className="text-jade" /> : <Copy />}
</button>`}
        >
          <div className="flex items-center gap-4">
            <CopyBtn />
            <span className="text-xs text-[var(--text-muted)]">Click to copy — shows checkmark feedback</span>
          </div>
        </Preview>
      </section>

      {/* Skeleton */}
      <section>
        <Preview
          title="Skeleton Loader"
          description="Placeholder for loading content"
          code={`<div className="animate-pulse space-y-3">
  <div className="h-4 w-3/4 rounded bg-[var(--bg-elevated)]" />
  <div className="h-4 w-full rounded bg-[var(--bg-elevated)]" />
  <div className="h-4 w-1/2 rounded bg-[var(--bg-elevated)]" />
</div>`}
        >
          <div className="max-w-sm animate-pulse space-y-3">
            <div className="h-4 w-3/4 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-full rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-1/2 rounded bg-[var(--bg-elevated)]" />
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-[var(--bg-elevated)]" />
                <div className="h-3 w-full rounded bg-[var(--bg-elevated)]" />
              </div>
            </div>
          </div>
        </Preview>
      </section>
    </div>
  )
}
