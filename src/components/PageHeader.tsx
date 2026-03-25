interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-[var(--font-size-xl)] font-semibold text-[var(--text-primary)] tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-[var(--text-secondary)] max-w-2xl">
        {description}
      </p>
    </div>
  )
}
