"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileOutput, KeyRound, ShieldAlert, Waypoints } from "lucide-react";
import { useRef, useState } from "react";
import { deliveryBoundaries } from "@/lib/ai-content-automation";
import { cn } from "@/lib/utils";

const icons = [KeyRound, FileOutput, Waypoints, ShieldAlert] as const;

export function DeliveryBoundary() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = deliveryBoundaries[selectedIndex];

  function move(index: number) {
    const next = (index + deliveryBoundaries.length) % deliveryBoundaries.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="grid gap-px bg-[#b8c8e5] lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
      <div className="grid gap-px bg-[#b8c8e5] sm:grid-cols-2" role="group" aria-label="Google Docs delivery architecture boundaries">
        {deliveryBoundaries.map((boundary, index) => {
          const Icon = icons[index];
          const active = selectedIndex === index;
          return (
            <button
              key={boundary.id}
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              aria-pressed={active}
              aria-controls="delivery-boundary-inspector"
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
                if (event.key === "Home") { event.preventDefault(); move(0); }
                if (event.key === "End") { event.preventDefault(); move(deliveryBoundaries.length - 1); }
              }}
              className={cn("relative flex min-h-52 flex-col justify-between bg-[#edf3ff] p-5 text-left text-[#101a2c] transition-colors sm:p-6", active ? "bg-[#2d6cdf] text-white" : "hover:bg-white")}
            >
              <div className="flex items-start justify-between gap-4"><Icon size={21} aria-hidden /><span className={cn("font-mono text-[0.55rem] uppercase tracking-[0.13em]", active ? "text-white/68" : "text-[#506587]")}>0{index + 1}</span></div>
              <div><p className={cn("font-mono text-[0.54rem] uppercase tracking-[0.14em]", active ? "text-white/68" : "text-[#2d6cdf]")}>{boundary.state}</p><h3 className="mt-3 text-2xl font-medium tracking-[-0.04em]">{boundary.label}</h3></div>
              {active && <span className="absolute inset-x-0 bottom-0 h-1 bg-white" aria-hidden />}
            </button>
          );
        })}
      </div>
      <aside id="delivery-boundary-inspector" className="min-w-0 bg-[#0a172b] p-6 text-[#f3f6fb] sm:p-8 lg:p-10" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
            <p className="font-mono text-[0.57rem] uppercase tracking-[0.17em] text-[#8cb5ff]">Selected integration boundary</p>
            <h3 className="mt-6 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.title}</h3>
            <p className="mt-6 text-base leading-relaxed text-white/62">{selected.detail}</p>
            <dl className="mt-9 border-t border-[#30456d]">
              <div className="border-b border-[#30456d] py-5"><dt className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#8cb5ff]">Evidence</dt><dd className="mt-2 break-words font-mono text-[0.65rem] leading-relaxed text-white/52">{selected.evidence}</dd></div>
              <div className="border-b border-[#30456d] py-5"><dt className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#8cb5ff]">Verification state</dt><dd className="mt-2 text-sm text-white/70">{selected.state}</dd></div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
