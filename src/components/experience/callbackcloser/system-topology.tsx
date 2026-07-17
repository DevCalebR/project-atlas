"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { callbackArchitecture } from "@/lib/callbackcloser";
import { cn } from "@/lib/utils";

export function SystemTopology() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = callbackArchitecture[activeIndex];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)] lg:gap-16">
      <div role="group" aria-label="CallbackCloser architecture" className="grid gap-px bg-line sm:grid-cols-2">
        {callbackArchitecture.map((node, index) => {
          const selected = index === activeIndex;
          return (
            <div key={node.label} className="relative bg-background">
              <button
                type="button"
                aria-pressed={selected}
                aria-controls="callbackcloser-architecture-detail"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn("group grid min-h-28 w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 p-4 text-left transition-colors sm:min-h-32 sm:p-5", selected ? "bg-foreground text-background" : "hover:bg-surface")}
              >
                <span className={cn("font-mono text-[0.62rem]", selected ? "text-[#ff674d]" : "text-muted")}>{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium tracking-[-0.025em]">{node.label}</span>
                <span className={cn("font-mono text-[0.54rem] uppercase tracking-[0.12em]", selected ? "text-background/60" : "text-muted")}>{selected ? "Selected" : "Inspect"}</span>
              </button>
              {index < callbackArchitecture.length - 2 ? <ArrowDown className="pointer-events-none absolute -bottom-3 left-1/2 z-10 hidden -translate-x-1/2 bg-background text-accent sm:block" size={20} aria-hidden /> : null}
            </div>
          );
        })}
      </div>

      <article id="callbackcloser-architecture-detail" className="border-t lg:sticky lg:top-28 lg:self-start" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.label} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="py-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">Boundary {String(activeIndex + 1).padStart(2, "0")} / {String(callbackArchitecture.length).padStart(2, "0")}</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{active.label}</h3>
            <dl className="mt-8 space-y-7">
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">Responsibility</dt><dd className="mt-2 text-sm leading-relaxed">{active.role}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">System boundary</dt><dd className="mt-2 text-sm leading-relaxed">{active.boundary}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-muted">Accepted tradeoff</dt><dd className="mt-2 text-sm leading-relaxed text-muted">{active.tradeoff}</dd></div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}
