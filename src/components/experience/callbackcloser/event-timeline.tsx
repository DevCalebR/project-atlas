"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { callbackTimeline } from "@/lib/callbackcloser";
import { cn } from "@/lib/utils";

export function EventTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedThrough, setCompletedThrough] = useState(-1);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);
  const reduceMotion = useReducedMotion();
  const active = callbackTimeline[activeIndex];

  useEffect(() => () => { runId.current += 1; }, []);

  async function runSequence() {
    if (running) return;
    const currentRun = runId.current + 1;
    runId.current = currentRun;
    setRunning(true);
    setCompletedThrough(-1);

    for (let index = 0; index < callbackTimeline.length; index += 1) {
      if (runId.current !== currentRun) return;
      setActiveIndex(index);
      await new Promise((resolve) => window.setTimeout(resolve, reduceMotion ? 40 : index === 1 ? 760 : 520));
      if (runId.current !== currentRun) return;
      setCompletedThrough(index);
    }

    if (runId.current === currentRun) setRunning(false);
  }

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] xl:gap-20">
      <div>
        <div className="flex flex-col gap-5 border-y border-white/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className={cn("relative grid size-11 shrink-0 place-items-center rounded-full border border-white/20", running && "border-[#ff674d]")}>
              <span className={cn("size-2 rounded-full bg-white/35", running && "bg-[#ff674d]")} />
              {running && !reduceMotion ? <motion.span className="absolute inset-0 rounded-full border border-[#ff674d]" animate={{ scale: [1, 1.65], opacity: [0.7, 0] }} transition={{ duration: 1.1, repeat: Infinity }} /> : null}
            </span>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">Representative event trace</p>
              <p className="mt-1 text-sm">One missed call · one durable lead</p>
            </div>
          </div>
          <button type="button" onClick={runSequence} disabled={running} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#ff674d] px-5 text-sm font-semibold text-[#121314] transition-opacity disabled:cursor-wait disabled:opacity-60">
            {completedThrough === callbackTimeline.length - 1 ? <RotateCcw size={16} aria-hidden /> : <Play size={16} fill="currentColor" aria-hidden />}
            {running ? "Event chain active" : completedThrough === callbackTimeline.length - 1 ? "Run again" : "Start event trace"}
          </button>
        </div>

        <ol className="relative mt-7">
          <span className="absolute bottom-8 left-[1.12rem] top-8 w-px bg-white/15" aria-hidden />
          {callbackTimeline.map((stage, index) => {
            const isActive = index === activeIndex;
            const complete = index <= completedThrough;
            return (
              <li key={stage.label} className="relative">
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={cn("group grid min-h-[4.5rem] w-full grid-cols-[2.25rem_1fr_auto] items-center gap-4 border-b border-white/10 py-3 text-left transition-colors", isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]")}
                >
                  <span className={cn("relative z-10 grid size-9 place-items-center rounded-full border border-white/25 bg-[#121314] font-mono text-[0.6rem]", isActive && "border-[#ff674d] text-[#ff674d]", complete && "border-[#ff674d] bg-[#ff674d] text-[#121314]")}>
                    {complete ? <Check size={14} strokeWidth={3} aria-hidden /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-sm sm:text-base", isActive && "font-semibold text-white")}>{stage.label}</span>
                  <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/40 sm:block">{complete ? "Handled" : isActive && running ? "Active" : "Inspect"}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="border-t border-white/20 xl:sticky xl:top-28 xl:self-start" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.label} initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: 0.18 }} className="py-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#ff674d]">Event {String(activeIndex + 1).padStart(2, "0")} / {String(callbackTimeline.length).padStart(2, "0")}</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{active.label}</h3>
            <dl className="mt-8 space-y-6 text-sm leading-relaxed">
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/40">What happened</dt><dd className="mt-2 text-white/75">{active.event}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/40">Why it exists</dt><dd className="mt-2 text-white/75">{active.why}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/40">Engineering challenge</dt><dd className="mt-2 text-white/75">{active.challenge}</dd></div>
            </dl>
            <div className="mt-8 border-y border-white/15 py-4"><p className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-white/40">Observed signal</p><p className="mt-2 break-words font-mono text-xs text-[#ff9a87]">{active.signal}</p></div>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
