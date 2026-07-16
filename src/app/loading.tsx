export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-[90rem] items-center px-5 md:px-10" role="status" aria-live="polite">
      <div className="w-full">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Loading</span>
        <div className="mt-4 h-px w-full overflow-hidden bg-line"><div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] bg-accent" /></div>
      </div>
    </div>
  );
}

