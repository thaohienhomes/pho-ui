import { PageHeader } from '@/components/PageHeader'
import { Preview } from '@/components/Preview'
import { useState } from 'react'
import {
  Search, X, ChevronDown, Plus,
  Copy, Check, MoreHorizontal, Bell, User,
  AlertTriangle, Info, CheckCircle2,
} from 'lucide-react'

function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0)
  const items = [
    { q: 'What is Phở Chat?', a: 'A modern AI chat platform with Vietnamese branding and multi-provider runtime.' },
    { q: 'What color system?', a: 'Jade Mist — dark-first design with #059669 as the single accent color.' },
    { q: 'Is it open source?', a: 'The design system and documentation are publicly accessible.' },
  ]
  return (
    <div className="max-w-md divide-y divide-[var(--border-default)] border border-[var(--border-default)] rounded-[var(--radius-md)]">
      {items.map((it, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors">
            {it.q}
            <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && <div className="px-4 pb-3 text-xs text-[var(--text-secondary)]">{it.a}</div>}
        </div>
      ))}
    </div>
  )
}

function TabsDemo() {
  const [tab, setTab] = useState(0)
  const tabs = ['Account', 'Notifications', 'Security']
  return (
    <div className="max-w-md">
      <div className="flex gap-1 p-1 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)]">
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)}
            className={`flex-1 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all ${tab === i ? 'bg-[var(--bg-base)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
        <p className="text-xs text-[var(--text-secondary)]">{tabs[tab]} settings content goes here.</p>
      </div>
    </div>
  )
}

function SwitchDemo() {
  const [on, setOn] = useState(true)
  return (
    <button onClick={() => setOn(!on)} role="switch" aria-checked={on}
      className={`relative w-10 h-6 rounded-full transition-colors ${on ? 'bg-[var(--jade)]' : 'bg-[var(--bg-active)]'}`}>
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  )
}

function CheckboxDemo() {
  const [items, setItems] = useState([true, false, false])
  const labels = ['Enable notifications', 'Dark mode auto-switch', 'Send analytics']
  return (
    <div className="space-y-2">
      {labels.map((l, i) => (
        <label key={l} className="flex items-center gap-2.5 cursor-pointer group">
          <div onClick={() => { const n = [...items]; n[i] = !n[i]; setItems(n) }}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${items[i] ? 'bg-[var(--jade)] border-[var(--jade)]' : 'border-[var(--border-hover)] group-hover:border-[var(--text-muted)]'}`}>
            {items[i] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
          <span className="text-sm text-[var(--text-primary)]">{l}</span>
        </label>
      ))}
    </div>
  )
}

function SelectDemo() {
  return (
    <div className="relative max-w-xs">
      <select className="w-full appearance-none px-3 py-2 pr-8 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none">
        <option>GPT-4o</option>
        <option>Claude 3.5 Sonnet</option>
        <option>Gemini Pro</option>
        <option>Llama 3.3 70B</option>
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
    </div>
  )
}

function ProgressDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      {[25, 60, 90].map(v => (
        <div key={v}>
          <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
            <span>Progress</span><span>{v}%</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--jade)] transition-all" style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function CommandDemo() {
  return (
    <div className="max-w-sm rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 border-b border-[var(--border-default)]">
        <Search className="w-4 h-4 text-[var(--text-muted)]" />
        <input className="flex-1 py-2.5 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none" placeholder="Type a command or search…" />
      </div>
      <div className="p-1">
        <p className="px-2 py-1.5 text-[10px] font-medium text-[var(--text-muted)] uppercase">Suggestions</p>
        {['New Chat', 'Search History', 'Change Model', 'Settings'].map(item => (
          <button key={item} className="w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)] transition-colors">
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

function ToastDemo() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <button onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000) }}
        className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-sm font-medium text-[var(--color-jade-50)] hover:bg-[var(--jade-dim)] transition-colors">
        Show Toast
      </button>
      {show && (
        <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-lg animate-fade-in-up max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-[var(--jade)] shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">Settings saved</p>
            <p className="text-xs text-[var(--text-muted)]">Your changes have been applied.</p>
          </div>
          <button onClick={() => setShow(false)} className="p-1 rounded hover:bg-[var(--bg-hover)]">
            <X className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          </button>
        </div>
      )}
    </div>
  )
}

/* ─── MAIN ─── */

export default function Components() {
  return (
    <div>
      <PageHeader
        title="Components"
        description="Live interactive previews with code snippets. Built with Jade Mist design tokens."
      />

      {/* ═══ BUTTON ═══ */}
      <S title="Button">
        <Preview title="Variants" description="primary, secondary, outline, ghost, destructive"
          code={`<button class="... bg-jade text-jade-50">Primary</button>
<button class="... bg-elevated border">Secondary</button>
<button class="... border border-border-default">Outline</button>
<button class="... hover:bg-hover">Ghost</button>
<button class="... bg-error text-white">Destructive</button>`}>
          <div className="flex flex-wrap gap-3">
            <Btn v="primary">Primary</Btn>
            <Btn v="secondary">Secondary</Btn>
            <Btn v="outline">Outline</Btn>
            <Btn v="ghost">Ghost</Btn>
            <Btn v="destructive">Destructive</Btn>
          </div>
        </Preview>
        <Preview title="Sizes" description="xs, sm, default, lg, icon"
          code={`<button class="px-2 py-1 text-xs">XS</button>
<button class="px-3 py-1 text-xs">Small</button>
<button class="px-4 py-2 text-sm">Default</button>
<button class="px-6 py-3 text-sm">Large</button>
<button class="p-2"><Icon /></button>`}>
          <div className="flex items-center gap-3">
            <button className="px-2 py-1 rounded text-[10px] font-medium bg-[var(--jade)] text-[var(--color-jade-50)]">XS</button>
            <button className="px-3 py-1 rounded-[var(--radius-sm)] text-xs font-medium bg-[var(--jade)] text-[var(--color-jade-50)]">Small</button>
            <Btn v="primary">Default</Btn>
            <button className="px-6 py-3 rounded-[var(--radius-md)] text-sm font-medium bg-[var(--jade)] text-[var(--color-jade-50)] hover:bg-[var(--jade-dim)] transition-colors">Large</button>
            <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--jade)] text-[var(--color-jade-50)]"><Plus className="w-4 h-4" /></button>
          </div>
        </Preview>
      </S>

      {/* ═══ INPUT ═══ */}
      <S title="Input">
        <Preview title="Default / Disabled / With Icon" description="Text input with jade focus ring"
          code={`<input class="... bg-input border focus:border-jade" placeholder="..." />
<input disabled class="... opacity-50 cursor-not-allowed" />
<div class="relative"><Search /><input class="pl-9 ..." /></div>`}>
          <div className="max-w-sm space-y-3">
            <input className="w-full px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none transition-colors" placeholder="Type something..." />
            <input disabled className="w-full px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-disabled)] placeholder:text-[var(--text-disabled)] opacity-50 cursor-not-allowed" placeholder="Disabled input" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input className="w-full pl-9 pr-3 py-2 rounded-[var(--radius-sm)] bg-[var(--input)] border border-[var(--border-default)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--jade)] focus:ring-1 focus:ring-[var(--jade)] outline-none transition-colors" placeholder="Search..." />
            </div>
          </div>
        </Preview>
      </S>

      {/* ═══ BADGE ═══ */}
      <S title="Badge">
        <Preview title="6 Variants" description="Status indicators and labels"
          code={`<span class="px-2 py-0.5 rounded-full text-[10px] font-medium bg-jade/15 text-jade-light">Active</span>`}>
          <div className="flex flex-wrap gap-2">
            <Badge c="jade">Active</Badge>
            <Badge c="blue">Info</Badge>
            <Badge c="amber">Warning</Badge>
            <Badge c="red">Error</Badge>
            <Badge c="default">Default</Badge>
            <Badge c="outline">Outline</Badge>
          </div>
        </Preview>
      </S>

      {/* ═══ CARD ═══ */}
      <S title="Card">
        <Preview title="Standard + Glass" description="Content containers"
          code={`<div class="p-6 rounded-radius-md bg-surface border">Standard</div>
<div class="p-6 rounded-radius-md bg-surface/60 backdrop-blur border border-jade-border shadow-glow">Glass</div>`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-default)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Standard Card</h3>
              <p className="text-xs text-[var(--text-secondary)]">Default surface with border.</p>
            </div>
            <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-surface)]/60 backdrop-blur-md border border-[var(--jade-border)] shadow-[var(--shadow-glow)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Glass Card</h3>
              <p className="text-xs text-[var(--text-secondary)]">Jade border with glow effect.</p>
            </div>
          </div>
        </Preview>
      </S>

      {/* ═══ TABS ═══ */}
      <S title="Tabs">
        <Preview title="Segmented Control" description="Elevated active tab style"
          code={`<div class="flex gap-1 p-1 rounded bg-elevated">
  <button class="... bg-base shadow-sm">Active</button>
  <button class="... text-muted">Inactive</button>
</div>`}>
          <TabsDemo />
        </Preview>
      </S>

      {/* ═══ DIALOG ═══ */}
      <S title="Dialog">
        <Preview title="Confirmation Dialog" description="Overlay with backdrop blur"
          code={`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
<div class="... rounded-radius-lg bg-elevated border shadow-overlay">
  <h3>Title</h3><p>Description</p>
  <div><button>Cancel</button><button>Confirm</button></div>
</div>`}>
          <div className="max-w-sm mx-auto p-6 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Delete conversation?</h3>
              <button className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)]"><X className="w-4 h-4 text-[var(--text-muted)]" /></button>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Btn v="ghost">Cancel</Btn>
              <Btn v="destructive">Delete</Btn>
            </div>
          </div>
        </Preview>
      </S>

      {/* ═══ SHEET ═══ */}
      <S title="Sheet">
        <Preview title="Side Panel" description="Slide-in panel from the right"
          code={`<div class="fixed right-0 top-0 h-full w-80 bg-surface border-l shadow-overlay p-6">
  <h3>Sheet Title</h3>
</div>`}>
          <div className="relative h-48 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-base)] overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-64 bg-[var(--bg-surface)] border-l border-[var(--border-default)] p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">Settings</h3>
                <button className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-hover)]"><X className="w-4 h-4 text-[var(--text-muted)]" /></button>
              </div>
              <div className="space-y-3">
                {['Model', 'Temperature', 'Max Tokens'].map(l => (
                  <div key={l}><p className="text-xs text-[var(--text-muted)] mb-1">{l}</p><div className="h-8 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)]" /></div>
                ))}
              </div>
            </div>
          </div>
        </Preview>
      </S>

      {/* ═══ TOOLTIP ═══ */}
      <S title="Tooltip">
        <Preview title="Contextual Hints" description="On-hover information"
          code={`<div class="px-3 py-1.5 rounded bg-elevated border shadow-md text-xs">Tooltip</div>`}>
          <div className="flex items-center gap-8">
            {[{ icon: Copy, label: 'Copy to clipboard' }, { icon: MoreHorizontal, label: 'More options' }, { icon: Bell, label: 'Notifications' }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] border border-[var(--border-default)] shadow-md text-xs text-[var(--text-primary)]">{label}</div>
                <button className="p-2 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-default)]"><Icon className="w-4 h-4 text-[var(--text-muted)]" /></button>
              </div>
            ))}
          </div>
        </Preview>
      </S>

      {/* ═══ SWITCH ═══ */}
      <S title="Switch">
        <Preview title="Toggle" description="On/off switch with jade active state"
          code={`<button role="switch" aria-checked={on}
  class="relative w-10 h-6 rounded-full bg-jade|bg-active">
  <span class="w-4 h-4 rounded-full bg-white translate-x-4|0" />
</button>`}>
          <div className="flex items-center gap-3">
            <SwitchDemo />
            <span className="text-sm text-[var(--text-secondary)]">Enable feature</span>
          </div>
        </Preview>
      </S>

      {/* ═══ CHECKBOX ═══ */}
      <S title="Checkbox">
        <Preview title="Multi-select" description="Jade checked state"
          code={`<div class="w-4 h-4 rounded border bg-jade|transparent">
  {checked && <Check class="w-3 h-3 text-white" />}
</div>`}>
          <CheckboxDemo />
        </Preview>
      </S>

      {/* ═══ SELECT ═══ */}
      <S title="Select">
        <Preview title="Dropdown Select" description="Native select with custom styling"
          code={`<select class="... bg-input border focus:border-jade">
  <option>GPT-4o</option>
</select>`}>
          <SelectDemo />
        </Preview>
      </S>

      {/* ═══ AVATAR ═══ */}
      <S title="Avatar">
        <Preview title="User Avatars" description="Image, initials, and fallback"
          code={`<div class="w-10 h-10 rounded-full bg-jade flex items-center justify-center text-sm font-semibold text-jade-50">HN</div>`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--jade)] flex items-center justify-center text-sm font-semibold text-[var(--color-jade-50)]">HN</div>
            <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center"><User className="w-5 h-5 text-[var(--text-muted)]" /></div>
            <div className="w-8 h-8 rounded-full bg-[var(--jade-dim)] flex items-center justify-center text-xs font-semibold text-[var(--color-jade-50)]">P</div>
            <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--jade)] flex items-center justify-center text-sm font-semibold text-[var(--jade-light)]">AI</div>
          </div>
        </Preview>
      </S>

      {/* ═══ SKELETON ═══ */}
      <S title="Skeleton">
        <Preview title="Loading Placeholder" description="Pulse animation for content loading"
          code={`<div class="animate-pulse">
  <div class="h-4 w-3/4 rounded bg-elevated" />
</div>`}>
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
      </S>

      {/* ═══ TOAST ═══ */}
      <S title="Toast">
        <Preview title="Notification Toast" description="Click to show — auto-dismisses in 3s"
          code={`<div class="flex items-center gap-3 px-4 py-3 rounded bg-elevated border shadow-lg">
  <CheckCircle2 class="text-jade" />
  <div><p class="text-sm font-medium">Title</p><p class="text-xs text-muted">Description</p></div>
</div>`}>
          <ToastDemo />
        </Preview>
      </S>

      {/* ═══ SEPARATOR ═══ */}
      <S title="Separator">
        <Preview title="Horizontal & Vertical" description="Divider lines"
          code={`<div class="h-px bg-border-default" /> /* horizontal */
<div class="w-px h-6 bg-border-default" /> /* vertical */`}>
          <div className="space-y-4 max-w-sm">
            <p className="text-sm text-[var(--text-primary)]">Section A</p>
            <div className="h-px bg-[var(--border-default)]" />
            <p className="text-sm text-[var(--text-primary)]">Section B</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)]">Left</span>
              <div className="w-px h-4 bg-[var(--border-default)]" />
              <span className="text-xs text-[var(--text-muted)]">Center</span>
              <div className="w-px h-4 bg-[var(--border-default)]" />
              <span className="text-xs text-[var(--text-muted)]">Right</span>
            </div>
          </div>
        </Preview>
      </S>

      {/* ═══ ACCORDION ═══ */}
      <S title="Accordion">
        <Preview title="Expandable Sections" description="Click to expand/collapse"
          code={`<button class="w-full flex items-center justify-between px-4 py-3">
  Question <ChevronDown class="rotate-180|0" />
</button>
{open && <div class="px-4 pb-3">Answer</div>}`}>
          <AccordionDemo />
        </Preview>
      </S>

      {/* ═══ ALERT ═══ */}
      <S title="Alert">
        <Preview title="Contextual Alerts" description="Info, success, warning, error"
          code={`<div class="flex gap-3 p-4 rounded border border-jade/20 bg-jade/5">
  <CheckCircle2 class="text-jade" />
  <div><p class="text-sm font-medium">Title</p><p class="text-xs text-muted">Message</p></div>
</div>`}>
          <div className="space-y-3 max-w-md">
            <Alert icon={<CheckCircle2 className="w-4 h-4 text-[var(--jade)]" />} border="jade" title="Success" msg="Your changes have been saved." />
            <Alert icon={<Info className="w-4 h-4 text-[#60a5fa]" />} border="blue" title="Information" msg="A new model is available." />
            <Alert icon={<AlertTriangle className="w-4 h-4 text-[#fbbf24]" />} border="amber" title="Warning" msg="You're approaching the rate limit." />
            <Alert icon={<X className="w-4 h-4 text-[#f87171]" />} border="red" title="Error" msg="Failed to send message." />
          </div>
        </Preview>
      </S>

      {/* ═══ PROGRESS ═══ */}
      <S title="Progress">
        <Preview title="Progress Bar" description="Jade fill with animated width"
          code={`<div class="h-2 rounded-full bg-elevated overflow-hidden">
  <div class="h-full rounded-full bg-jade" style="width: 60%" />
</div>`}>
          <ProgressDemo />
        </Preview>
      </S>

      {/* ═══ COMMAND PALETTE ═══ */}
      <S title="Command Palette">
        <Preview title="⌘K Dialog" description="Search and execute commands"
          code={`<div class="rounded border bg-elevated shadow-lg">
  <div class="flex items-center gap-2 px-3 border-b">
    <Search /><input placeholder="Type a command..." />
  </div>
  <div class="p-1">
    <button class="w-full px-3 py-2 text-left hover:bg-hover">Item</button>
  </div>
</div>`}>
          <CommandDemo />
        </Preview>
      </S>
    </div>
  )
}

/* ─── Micro-components ─── */

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mb-12"><h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">{title}</h2><div className="space-y-4">{children}</div></section>
}

function Btn({ v, children }: { v: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    primary: 'bg-[var(--jade)] text-[var(--color-jade-50)] hover:bg-[var(--jade-dim)]',
    secondary: 'bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]',
    outline: 'border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
    ghost: 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
    destructive: 'bg-[var(--error)] text-white hover:opacity-90',
  }
  return <button className={`px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${styles[v]}`}>{children}</button>
}

function Badge({ c, children }: { c: 'jade' | 'blue' | 'amber' | 'red' | 'default' | 'outline'; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    jade: 'bg-[rgba(5,150,105,0.15)] text-[var(--jade-light)]',
    blue: 'bg-[rgba(37,99,235,0.15)] text-[#60a5fa]',
    amber: 'bg-[rgba(217,119,6,0.15)] text-[#fbbf24]',
    red: 'bg-[rgba(220,38,38,0.15)] text-[#f87171]',
    default: 'bg-[var(--bg-elevated)] text-[var(--text-muted)]',
    outline: 'border border-[var(--border-default)] text-[var(--text-muted)]',
  }
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${styles[c]}`}>{children}</span>
}

function Alert({ icon, border, title, msg }: { icon: React.ReactNode; border: string; title: string; msg: string }) {
  const colors: Record<string, string> = {
    jade: 'border-[rgba(5,150,105,0.3)] bg-[rgba(5,150,105,0.05)]',
    blue: 'border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.05)]',
    amber: 'border-[rgba(217,119,6,0.3)] bg-[rgba(217,119,6,0.05)]',
    red: 'border-[rgba(220,38,38,0.3)] bg-[rgba(220,38,38,0.05)]',
  }
  return (
    <div className={`flex gap-3 p-4 rounded-[var(--radius-md)] border ${colors[border]}`}>
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div><p className="text-sm font-medium text-[var(--text-primary)]">{title}</p><p className="text-xs text-[var(--text-secondary)] mt-0.5">{msg}</p></div>
    </div>
  )
}
