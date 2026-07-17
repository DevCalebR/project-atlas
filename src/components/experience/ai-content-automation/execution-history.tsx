"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { representativeRuns } from "@/lib/ai-content-automation";
import { cn } from "@/lib/utils";

export function ExecutionHistory() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = representativeRuns[selectedIndex];

  function move(index: number) {
    const next = (index + representativeRuns.length) % representativeRuns.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="border-y">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-4 sm:px-6">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">Representative execution history</p>
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">Synthetic records · static · no live traffic</p>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
        <div role="group" aria-label="Representative workflow runs" className="border-line lg:border-r">
          {representativeRuns.map((run, index) => {
            const active = index === selectedIndex;
            const failed = run.result === "Failed" || run.delivery === "Failed";
            return (
              <button
                key={run.id}
                ref={(node) => { refs.current[index] = node; }}
                type="button"
                aria-pressed={active}
                aria-controls="execution-history-inspector"
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => {
                  if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
                  if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
                  if (event.key === "Home") { event.preventDefault(); move(0); }
                  if (event.key === "End") { event.preventDefault(); move(representativeRuns.length - 1); }
                }}
                className={cn("group grid min-h-32 w-full gap-4 border-b px-4 py-5 text-left transition-colors last:border-b-0 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-center sm:px-6", active ? "bg-[#2d6cdf] text-white" : "hover:bg-surface")}
              >
                <span><span className={cn("block font-mono text-[0.53rem] uppercase tracking-[0.13em]", active ? "text-white/65" : "text-muted")}>Run identifier</span><span className="mt-2 block break-all font-mono text-[0.67rem]">{run.id}</span></span>
                <span><strong className="block text-xl font-medium tracking-[-0.025em]">{run.goal}</strong><span className={cn("mt-2 block text-sm", active ? "text-white/70" : "text-muted")}>{run.stage} · {run.review}</span></span>
                <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.08em]">{failed ? <CircleX size={18} aria-hidden /> : <CircleCheck size={18} aria-hidden />}{run.result}<ArrowRight size={16} className="hidden transition-transform group-hover:translate-x-1 sm:block" aria-hidden /></span>
              </button>
            );
          })}
        </div>
        <aside id="execution-history-inspector" className="min-w-0 p-5 sm:p-7 lg:p-9" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-[0.57rem] uppercase tracking-[0.16em] text-accent">Selected run evidence</p><span className="border px-3 py-1.5 font-mono text-[0.53rem] uppercase tracking-[0.12em]">{selected.delivery}</span></div>
              <h3 className="mt-7 text-3xl font-medium tracking-[-0.045em]">{selected.stage}</h3>
              <dl className="mt-7 grid gap-px bg-line sm:grid-cols-2">
                <RunField label="Result" value={selected.result} />
                <RunField label="Review" value={selected.review} />
                <RunField label="Delivery" value={selected.delivery} />
                <RunField label="Artifact" value={selected.result === "Saved output" ? "Persisted StructuredOutput" : "Failure state + error message"} />
              </dl>
              <div className="mt-7 border-l-2 border-amber-500 pl-4"><p className="flex items-center gap-2 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300"><AlertTriangle size={14} aria-hidden /> Warning</p><p className="mt-2 text-sm leading-relaxed text-muted">{selected.warning}</p></div>
              <div className="mt-6"><p className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-accent">Recovery path</p><p className="mt-2 text-sm leading-relaxed text-muted">{selected.recovery}</p></div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}

function RunField({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 bg-background p-4"><dt className="font-mono text-[0.53rem] uppercase tracking-[0.13em] text-muted">{label}</dt><dd className="mt-2 break-words text-sm font-medium">{value}</dd></div>;
}
