"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CircleDot, Crosshair } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { systemRecords } from "@/lib/portfolio-dashboard";
import { cn } from "@/lib/utils";

const domains = ["All systems", "AI systems", "Workflow systems", "Developer tools", "Frontend systems"] as const;
type Domain = (typeof domains)[number];

export function ControlRoom() {
  const [domain, setDomain] = useState<Domain>("All systems");
  const [selectedId, setSelectedId] = useState(systemRecords[0].id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const visible = useMemo(() => systemRecords.filter((system) => domain === "All systems" || system.domain === domain), [domain]);
  const selected = systemRecords.find((system) => system.id === selectedId) ?? visible[0] ?? systemRecords[0];

  function changeDomain(next: Domain) {
    setDomain(next);
    const first = systemRecords.find((system) => next === "All systems" || system.domain === next);
    if (first) setSelectedId(first.id);
  }

  function move(index: number) {
    const next = (index + visible.length) % visible.length;
    setSelectedId(visible[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className="border-y border-[#30352d] bg-[#11140f] text-[#f2f0e8]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#30352d] px-4 py-4 sm:px-6">
        <div><p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#b8ef5b]">System portfolio</p><p className="mt-1 text-xs text-white/48">Confirmed project evidence · no live telemetry</p></div>
        <span className="inline-flex items-center gap-2 font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/40"><CircleDot size={14} aria-hidden /> committed selection</span>
      </div>

      <div aria-label="Filter systems by engineering domain" className="grid grid-cols-2 border-b border-[#30352d] sm:grid-cols-5" role="group">
        {domains.map((item) => <button key={item} type="button" aria-pressed={domain === item} onClick={() => changeDomain(item)} className={cn("min-h-14 border-b border-r border-[#30352d] px-3 py-3 text-left font-mono text-[0.52rem] uppercase tracking-[0.11em] transition-colors sm:border-b-0", domain === item ? "bg-[#b8ef5b] text-[#10130e]" : "text-white/48 hover:bg-white/[0.05]")}>{item}</button>)}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)]">
        <div className="border-[#30352d] lg:border-r" role="group" aria-label="Select a system for evaluation">
          {visible.map((system, index) => {
            const active = system.id === selected.id;
            return <button
              key={system.id}
              ref={(node) => { refs.current[index] = node; }}
              type="button"
              aria-pressed={active}
              aria-controls="control-room-inspector"
              onClick={() => setSelectedId(system.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
                if (event.key === "Home") { event.preventDefault(); move(0); }
                if (event.key === "End") { event.preventDefault(); move(visible.length - 1); }
              }}
              className={cn("group grid min-h-28 w-full grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-[#30352d] px-4 py-5 text-left transition-colors last:border-b-0 sm:px-6", active ? "bg-[#f2f0e8] text-[#10130e]" : "hover:bg-white/[0.04]")}
            >
              <span className={cn("grid size-9 place-items-center rounded-full border font-mono text-[0.56rem]", active ? "border-[#10130e]/25 bg-[#b8ef5b]" : "border-white/18 text-white/42")}>0{systemRecords.findIndex((item) => item.id === system.id) + 1}</span>
              <span className="min-w-0"><strong className="block text-xl font-medium tracking-[-0.03em] sm:text-2xl">{system.name}</strong><span className={cn("mt-2 block font-mono text-[0.54rem] uppercase tracking-[0.13em]", active ? "text-[#46503f]" : "text-white/38")}>{system.domain} · {system.state}</span></span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </button>;
          })}
        </div>
        <aside id="control-room-inspector" className="min-w-0 p-5 sm:p-7 lg:sticky lg:top-24 lg:self-start lg:p-9" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -6 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
              <div className="flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-[0.56rem] uppercase tracking-[0.17em] text-[#b8ef5b]">Selected evidence rail</p><Crosshair size={18} className="text-[#b8ef5b]" aria-hidden /></div>
              <h3 className="mt-7 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.name}</h3>
              <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-white/42">Derived state / {selected.state}</p>
              <dl className="mt-8 border-t border-[#30352d]">
                <EvidenceField label="Confirmed evidence" value={selected.evidence} />
                <EvidenceField label="Active risk" value={selected.activeRisk} accent />
                <EvidenceField label="Recent verified change" value={selected.recentChange} />
                <EvidenceField label="Next engineering action" value={selected.nextAction} />
                <EvidenceField label="Evidence source" value={selected.source} mono />
              </dl>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}

function EvidenceField({ label, value, accent = false, mono = false }: { label: string; value: string; accent?: boolean; mono?: boolean }) {
  return <div className="border-b border-[#30352d] py-5"><dt className={cn("font-mono text-[0.53rem] uppercase tracking-[0.14em]", accent ? "text-[#f0b968]" : "text-[#b8ef5b]")}>{label}</dt><dd className={cn("mt-2 text-sm leading-relaxed text-white/64", mono && "break-words font-mono text-[0.62rem] text-white/42")}>{value}</dd></div>;
}
