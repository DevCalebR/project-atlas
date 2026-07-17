"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Hand, LockKeyhole, ScanLine } from "lucide-react";
import { useRef, useState } from "react";
import { reviewStates } from "@/lib/ai-content-automation";
import { cn } from "@/lib/utils";

const icons = [ScanLine, Hand, LockKeyhole, Check] as const;

export function ReviewBoundary() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = reviewStates[selectedIndex];

  function move(index: number) {
    const next = (index + reviewStates.length) % reviewStates.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="border-y border-[#263a64] bg-[#0a172b] text-[#f3f6fb] lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(24rem,1.18fr)]">
      <div role="group" aria-label="Review boundary states" className="border-[#263a64] lg:border-r">
        {reviewStates.map((state, index) => {
          const Icon = icons[index];
          const active = selectedIndex === index;
          return (
            <button
              key={state.id}
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              aria-pressed={active}
              aria-controls="review-boundary-inspector"
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
                if (event.key === "Home") { event.preventDefault(); move(0); }
                if (event.key === "End") { event.preventDefault(); move(reviewStates.length - 1); }
              }}
              className={cn("grid min-h-24 w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-[#263a64] px-4 py-4 text-left transition-colors last:border-b-0 sm:px-6", active ? "bg-[#f3f6fb] text-[#09162a]" : "hover:bg-white/[0.04]")}
            >
              <span className={cn("grid size-10 place-items-center rounded-full border", active ? "border-[#2d6cdf] text-[#2d6cdf]" : "border-white/18 text-[#8cb5ff]")}><Icon size={18} aria-hidden /></span>
              <span><strong className="block text-lg font-medium">{state.label}</strong><span className={cn("mt-1 block font-mono text-[0.54rem] uppercase tracking-[0.13em]", active ? "text-[#2d4c80]" : "text-white/38")}>{state.classification}</span></span>
              <span className={cn("h-8 w-1", active ? "bg-[#2d6cdf]" : "bg-white/10")} aria-hidden />
            </button>
          );
        })}
      </div>
      <aside id="review-boundary-inspector" className="min-w-0 p-6 sm:p-8 lg:p-10" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -6 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.17em] text-[#8cb5ff]">Committed review state</p>
              <span className="border border-[#466596] px-3 py-1.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/55">{selected.classification}</span>
            </div>
            <h3 className="mt-8 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.title}</h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/62">{selected.detail}</p>
            <div className="mt-8 border-l-2 border-[#5d93f5] pl-5">
              <p className="font-mono text-[0.54rem] uppercase tracking-[0.15em] text-[#8cb5ff]">Next responsible action</p>
              <p className="mt-3 text-sm leading-relaxed text-white/68">{selected.next}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
