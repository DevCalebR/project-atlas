"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, FileText, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { relayworksPipeline } from "@/lib/relayworks";
import { cn } from "@/lib/utils";

export function DocumentPipeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedThrough, setCompletedThrough] = useState(-1);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);
  const reduceMotion = useReducedMotion();
  const activeStage = relayworksPipeline[activeIndex];

  useEffect(() => () => { runId.current += 1; }, []);

  async function runPipeline() {
    const currentRun = runId.current + 1;
    runId.current = currentRun;
    setRunning(true);
    setCompletedThrough(-1);

    for (let index = 0; index < relayworksPipeline.length; index += 1) {
      if (runId.current !== currentRun) return;
      setActiveIndex(index);
      await new Promise((resolve) => window.setTimeout(resolve, reduceMotion ? 35 : 620));
      if (runId.current !== currentRun) return;
      setCompletedThrough(index);
    }
    setRunning(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:gap-16">
      <div>
        <div className="grid gap-4 border-y py-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-center gap-4">
            <div className="grid size-11 shrink-0 place-items-center border bg-surface"><FileText size={18} aria-hidden /></div>
            <div>
              <p className="text-sm font-medium">NIST.AI.600-1-sample.pdf</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">5 pages · AI Knowledge Base goal</p>
            </div>
          </div>
          <button type="button" onClick={runPipeline} disabled={running} className="inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-5 text-sm font-medium text-background transition-opacity disabled:cursor-wait disabled:opacity-60">
            {completedThrough === relayworksPipeline.length - 1 ? <RotateCcw size={16} aria-hidden /> : null}
            {running ? "Processing…" : completedThrough === relayworksPipeline.length - 1 ? "Run again" : "Begin processing"}
          </button>
        </div>

        <div className="relative mt-7">
          <div className="absolute bottom-0 left-[1.13rem] top-0 w-px bg-line" aria-hidden>
            <motion.span
              className="block w-px origin-top bg-accent"
              animate={{ height: `${Math.max(0, ((completedThrough + 1) / relayworksPipeline.length) * 100)}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <ol className="space-y-1">
            {relayworksPipeline.map((stage, index) => {
              const complete = index <= completedThrough;
              const active = index === activeIndex;
              return (
                <li key={stage.label}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveIndex(index)}
                    className={cn("group relative grid min-h-16 w-full grid-cols-[2.25rem_1fr_auto] items-center gap-4 border-b py-3 text-left transition-colors", active ? "border-foreground bg-surface" : "hover:bg-surface/60")}
                  >
                    <span className={cn("relative z-10 grid size-9 place-items-center rounded-full border bg-background font-mono text-[0.62rem]", complete && "border-accent bg-accent text-white", active && !complete && "border-foreground")}>
                      {complete ? <Check size={14} strokeWidth={2.5} aria-hidden /> : String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-sm", active && "font-semibold")}>{stage.label}</span>
                    <span className="hidden font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted sm:block">{complete ? "Complete" : active && running ? "Active" : "Inspect"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <aside className="border-t lg:sticky lg:top-40" aria-live="polite" aria-atomic="true">
        <motion.div key={activeStage.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="py-7">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">Stage {String(activeIndex + 1).padStart(2, "0")} / {String(relayworksPipeline.length).padStart(2, "0")}</p>
          <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em]">{activeStage.label}</h3>
          <p className="mt-5 text-base leading-relaxed text-muted">{activeStage.detail}</p>
          <div className="mt-8 border-y py-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">Observed signal</p>
            <p className="mt-2 font-mono text-sm">{activeStage.signal}</p>
          </div>
        </motion.div>
      </aside>
    </div>
  );
}
