"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, CircleSlash2, ShieldAlert } from "lucide-react";
import { useRef, useState } from "react";
import { healthEvidence } from "@/lib/portfolio-dashboard";
import { cn } from "@/lib/utils";

export function ProjectHealth() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = healthEvidence[selectedIndex];

  function move(index: number) {
    const next = (index + healthEvidence.length) % healthEvidence.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return <div className="grid gap-px bg-line lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)]">
    <div className="grid gap-px bg-line sm:grid-cols-2" role="group" aria-label="Inspect Portfolio Dashboard health evidence">
      {healthEvidence.map((item, index) => {
        const active = selectedIndex === index;
        const Icon = item.state === "Confirmed" ? CheckCircle2 : item.state === "Unavailable" || item.state === "Not implemented" ? CircleSlash2 : ShieldAlert;
        return <button key={item.id} ref={(node) => { refs.current[index] = node; }} type="button" aria-pressed={active} aria-controls="project-health-inspector" onClick={() => setSelectedIndex(index)} onKeyDown={(event) => {
          if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
          if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
          if (event.key === "Home") { event.preventDefault(); move(0); }
          if (event.key === "End") { event.preventDefault(); move(healthEvidence.length - 1); }
        }} className={cn("group flex min-h-44 flex-col justify-between bg-background p-5 text-left transition-colors sm:p-6", active ? "bg-[#b8ef5b] text-[#10130e]" : "hover:bg-surface")}> <div className="flex items-start justify-between gap-4"><Icon size={19} aria-hidden /><span className="font-mono text-[0.54rem]">H{index + 1}</span></div><div><p className={cn("font-mono text-[0.52rem] uppercase tracking-[0.13em]", active ? "text-black/55" : "text-[#607d22]")}>{item.state}</p><h3 className="mt-3 text-xl font-medium">{item.label}</h3><ArrowRight size={15} className="mt-5 transition-transform group-hover:translate-x-1" aria-hidden /></div></button>;
      })}
    </div>
    <aside id="project-health-inspector" className="min-w-0 bg-[#11140f] p-6 text-[#f2f0e8] sm:p-8" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}><motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.17 }}><p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#b8ef5b]">Health is evidence, not color</p><h3 className="mt-7 text-3xl font-medium tracking-[-0.045em]">{selected.label}</h3><p className="mt-5 text-base leading-relaxed text-white/65">{selected.fact}</p><div className="mt-8 border-t border-[#343a30] pt-5"><p className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-[#b8ef5b]">Confirmed source</p><p className="mt-2 break-words font-mono text-[0.63rem] text-white/43">{selected.source}</p></div><p className="mt-7 border-l-2 border-[#b8ef5b] pl-4 text-sm leading-relaxed text-white/52">The state describes the repository boundary. It is not a computed health score and does not ingest live telemetry.</p></motion.div></AnimatePresence>
    </aside>
  </div>;
}
