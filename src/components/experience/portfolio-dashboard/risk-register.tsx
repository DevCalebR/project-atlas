"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { risks } from "@/lib/portfolio-dashboard";
import { cn } from "@/lib/utils";

export function RiskRegister() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = risks[selectedIndex];

  function move(index: number) {
    const next = (index + risks.length) % risks.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="border-y border-[#4a3928] bg-[#1b1510] text-[#f5eee4] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)]">
      <div className="border-[#4a3928] lg:border-r" role="group" aria-label="Select a repository risk">
        {risks.map((risk, index) => <button
          key={risk.id}
          ref={(node) => { refs.current[index] = node; }}
          type="button"
          aria-pressed={selectedIndex === index}
          aria-controls="risk-register-inspector"
          onClick={() => setSelectedIndex(index)}
          onKeyDown={(event) => {
            if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
            if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
            if (event.key === "Home") { event.preventDefault(); move(0); }
            if (event.key === "End") { event.preventDefault(); move(risks.length - 1); }
          }}
          className={cn("group grid min-h-24 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-[#4a3928] px-4 py-4 text-left transition-colors last:border-b-0 sm:px-6", selectedIndex === index ? "bg-[#f0b968] text-[#17110c]" : "hover:bg-white/[0.04]")}
        ><span className={cn("font-mono text-[0.56rem]", selectedIndex === index ? "text-black/55" : "text-[#f0b968]")}>R{index + 1}</span><span><strong className="block text-lg font-medium">{risk.title}</strong><span className={cn("mt-2 block font-mono text-[0.52rem] uppercase tracking-[0.12em]", selectedIndex === index ? "text-black/55" : "text-white/38")}>{risk.severity}</span></span><ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></button>)}
      </div>
      <aside id="risk-register-inspector" className="min-w-0 p-6 sm:p-8 lg:sticky lg:top-24 lg:self-start lg:p-10" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.17 }}>
            <div className="flex items-center justify-between gap-4"><p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#f0b968]">Active limitation / R{selectedIndex + 1}</p><AlertTriangle size={18} className="text-[#f0b968]" aria-hidden /></div>
            <h3 className="mt-7 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.title}</h3>
            <dl className="mt-8 border-t border-[#4a3928]">
              <RiskField label="What is known" value={selected.known} />
              <RiskField label="Why it matters" value={selected.why} />
              <RiskField label="Current mitigation" value={selected.mitigation} />
              <RiskField label="Next reasonable action" value={selected.next} accent />
            </dl>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}

function RiskField({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="border-b border-[#4a3928] py-5"><dt className={cn("font-mono text-[0.52rem] uppercase tracking-[0.13em]", accent ? "text-[#f0b968]" : "text-white/42")}>{label}</dt><dd className="mt-2 text-sm leading-relaxed text-white/65">{value}</dd></div>;
}
