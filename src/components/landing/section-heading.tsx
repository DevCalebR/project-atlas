export function SectionHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="grid gap-8 border-b pb-10 md:grid-cols-[8rem_1fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{index}</p>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[1] tracking-[-0.05em] sm:text-5xl md:text-7xl">{title}</h2>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
      </div>
    </div>
  );
}

