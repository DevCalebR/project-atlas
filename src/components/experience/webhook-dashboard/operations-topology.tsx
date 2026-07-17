"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Bell, Database, KeyRound, LayoutDashboard, Network, RotateCcw, Waypoints } from "lucide-react";
import { useState } from "react";
import { webhookTopology } from "@/lib/webhook-dashboard";
import { cn } from "@/lib/utils";

const icons = [Waypoints, Network, KeyRound, Database, Activity, LayoutDashboard, Bell, RotateCcw] as const;
const positions = ["md:[grid-area:1/1]", "md:[grid-area:1/2]", "md:[grid-area:1/3]", "md:[grid-area:2/2]", "md:[grid-area:2/3]", "md:[grid-area:3/1]", "md:[grid-area:3/2]", "md:[grid-area:3/3]"] as const;

export function OperationsTopology() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const reduceMotion = useReducedMotion();
  const selected = webhookTopology[selectedIndex];

  return (
    <div>
      <div className="relative border-y border-[#31403a] bg-[#101613] p-4 text-[#efede5] sm:p-6 md:p-8">
        <svg className="pointer-events-none absolute inset-0 hidden size-full md:block" viewBox="0 0 900 620" preserveAspectRatio="none" aria-hidden>
          <g fill="none" stroke="#65746d" strokeDasharray="4 8" strokeWidth="1">
            <path d="M150 105 L450 310 L750 105" />
            <path d="M450 105 L450 310 L150 515" />
            <path d="M450 310 L750 310 L750 515" />
            <path d="M450 310 L450 515" />
          </g>
          <circle cx="450" cy="310" r="82" fill="none" stroke="#dca63a" strokeOpacity=".55" />
        </svg>
        <div role="group" aria-label="Webhook Dashboard system topology" className="relative grid gap-3 md:min-h-[34rem] md:grid-cols-3 md:grid-rows-3 md:gap-8">
          {webhookTopology.map((node, index) => {
            const Icon = icons[index];
            const active = index === selectedIndex;
            return (
              <button
                key={node.label}
                type="button"
                aria-pressed={active}
                aria-controls="webhook-topology-detail"
                onClick={() => setSelectedIndex(index)}
                onFocus={() => setSelectedIndex(index)}
                className={cn("relative z-10 grid min-h-24 w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 border px-4 py-4 text-left transition-colors md:self-center", positions[index], active ? "border-[#dca63a] bg-[#dca63a] text-[#101613]" : "border-[#3a4943] bg-[#151d19] hover:border-[#dca63a]/70")}
              >
                <span className={cn("grid size-10 place-items-center rounded-full border", active ? "border-black/30" : "border-white/15 text-[#e9bf69]")}><Icon size={17} aria-hidden /></span>
                <span className="text-sm font-medium sm:text-base">{node.label}</span>
                <span className={cn("font-mono text-[0.5rem] uppercase tracking-[0.11em]", active ? "text-black/55" : "text-white/35")}>{active ? "Active" : String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <article id="webhook-topology-detail" className="border-b" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.label} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: 0.16 }} className="grid gap-8 py-8 md:grid-cols-[1.1fr_1fr_1fr] md:py-10">
            <div><p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-accent">Selected boundary</p><h3 className="mt-4 text-3xl font-medium tracking-[-0.045em]">{selected.label}</h3><p className="mt-4 text-sm leading-relaxed text-muted">{selected.responsibility}</p></div>
            <dl className="space-y-6"><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Data entering</dt><dd className="mt-2 text-sm leading-relaxed">{selected.input}</dd></div><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Data leaving</dt><dd className="mt-2 text-sm leading-relaxed">{selected.output}</dd></div></dl>
            <dl className="space-y-6"><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Operational signal</dt><dd className="mt-2 text-sm leading-relaxed">{selected.signal}</dd></div><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Accepted tradeoff</dt><dd className="mt-2 text-sm leading-relaxed text-muted">{selected.tradeoff}</dd></div></dl>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}
