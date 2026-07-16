"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-[90rem] items-center px-5 md:px-10">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">System interruption</p>
        <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] md:text-7xl">Something lost the signal.</h1>
        <p className="mt-6 text-lg text-muted">The page hit an unexpected error. You can safely try the request again.</p>
        <button onClick={reset} className="mt-8 inline-flex min-h-12 items-center gap-2 border-b border-foreground text-sm font-medium hover:text-accent"><RotateCcw aria-hidden size={18} /> Try again</button>
      </div>
    </section>
  );
}
