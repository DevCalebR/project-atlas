"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Client", detail: "A user action begins the request." },
  { label: "Next.js", detail: "Renders the interface and coordinates server work." },
  { label: "REST APIs", detail: "Create clear contracts between parts of the system." },
  { label: "FastAPI", detail: "Validates requests and runs Python application logic." },
  { label: "Background jobs", detail: "Move long-running work outside the request cycle." },
  { label: "AI pipelines", detail: "Transform inputs through defined processing stages." },
  { label: "Outputs", detail: "Return useful results to the person who asked." },
] as const;

export function ArchitectureMap() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative flex h-full min-h-[32rem] flex-col border-l pl-5 sm:pl-8 lg:min-h-[36rem]" aria-label="Interactive request architecture">
      <div className="flex items-center justify-between border-b pb-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Trace a request</p>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Input → output</p>
      </div>

      <div className="relative flex flex-1 flex-col justify-between py-5">
        <div className="absolute bottom-7 left-2 top-7 w-px bg-line sm:left-3" aria-hidden>
          <motion.span
            className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_5px_var(--background)]"
            animate={{ top: `${(active / (nodes.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>

        {nodes.map((node, index) => (
          <button
            key={node.label}
            type="button"
            aria-pressed={active === index}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            className={cn(
              "group relative ml-7 flex min-h-12 w-[calc(100%-1.75rem)] items-center justify-between border-b text-left transition-colors sm:ml-10 sm:w-[calc(100%-2.5rem)]",
              active === index ? "border-accent text-foreground" : "text-muted hover:text-foreground",
            )}
          >
            <span className="text-base font-medium tracking-[-0.02em] sm:text-lg">{node.label}</span>
            <span className={cn("font-mono text-[0.65rem] transition-colors", active === index ? "text-accent" : "text-muted")}>0{index + 1}</span>
          </button>
        ))}
      </div>

      <div className="min-h-20 border-t pt-4" aria-live="polite">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">{nodes[active].label}</p>
        <motion.p key={nodes[active].label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {nodes[active].detail}
        </motion.p>
      </div>
    </div>
  );
}

