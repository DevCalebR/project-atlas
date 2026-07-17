"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GitCommitHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import { decisions } from "@/lib/portfolio-dashboard";
import { cn } from "@/lib/utils";

export function DecisionLog() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = decisions[selectedIndex];

  function move(index: number) {
    const next = (index + decisions.length) % decisions.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="grid border-y lg:grid-cols-[minmax(0,0.82fr)_minmax(24rem,1.18fr)]">
      <div className="border-line lg:border-r" role="group" aria-label="Select an engineering decision">
        {decisions.map((decision, index) => <button
          key={decision.id}
          ref={(node) => { refs.current[index] = node; }}
          type="button"
          aria-pressed={selectedIndex === index}
          aria-controls="decision-log-inspector"
          onClick={() => setSelectedIndex(index)}
          onKeyDown={(event) => {
            if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); move(index + 1); }
            if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); move(index - 1); }
            if (event.key === "Home") { event.preventDefault(); move(0); }
            if (event.key === "End") { event.preventDefault(); move(decisions.length - 1); }
          }}
          className={cn("group grid min-h-24 w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b px-4 py-4 text-left transition-colors last:border-b-0 sm:px-6", selectedIndex === index ? "bg-[#b8ef5b] text-[#10130e]" : "hover:bg-surface")}
        ><span className="font-mono text-[0.57rem]">0{index + 1}</span><strong className="text-lg font-medium tracking-[-0.025em]">{decision.title}</strong><ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></button>)}
      </div>
      <aside id="decision-log-inspector" className="min-w-0 bg-[#11140f] p-6 text-[#f2f0e8] sm:p-8 lg:p-10" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -5 }} transition={{ duration: reduceMotion ? 0 : 0.17 }}>
            <p className="flex items-center gap-3 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#b8ef5b]"><GitCommitHorizontal size={16} aria-hidden /> Decision record / 0{selectedIndex + 1}</p>
            <h3 className="mt-7 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.title}</h3>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <DecisionField label="Problem" value={selected.problem} />
              <DecisionField label="Choice" value={selected.choice} />
              <DecisionField label="Reason" value={selected.reason} />
              <DecisionField label="Accepted tradeoff" value={selected.tradeoff} />
              <DecisionField label="Repository evidence" value={selected.evidence} mono />
              <DecisionField label="Reconsider when" value={selected.reconsider} />
            </dl>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}

function DecisionField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="border-t border-[#343a30] pt-4"><dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-[#b8ef5b]">{label}</dt><dd className={cn("mt-2 text-sm leading-relaxed text-white/62", mono && "font-mono text-[0.61rem] text-white/45")}>{value}</dd></div>;
}
