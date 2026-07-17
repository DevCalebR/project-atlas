"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BellRing, Database, MessageSquareWarning } from "lucide-react";
import { useState } from "react";
import { webhookAlertRules } from "@/lib/webhook-dashboard";
import { cn } from "@/lib/utils";

const icons = [Database, BellRing, MessageSquareWarning] as const;

export function AlertRuleExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const selected = webhookAlertRules[selectedIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
      <div role="group" aria-label="Representative alert rules" className="border-t">
        {webhookAlertRules.map((rule, index) => {
          const Icon = icons[index];
          const active = index === selectedIndex;
          return (
            <button
              key={rule.name}
              type="button"
              aria-pressed={active}
              aria-controls="webhook-alert-rule-detail"
              onClick={() => setSelectedIndex(index)}
              className={cn("grid min-h-28 w-full grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b py-4 text-left transition-colors", active ? "bg-[#1b2521] px-4 text-[#f0eee7]" : "hover:bg-black/[0.035]")}
            >
              <span className={cn("grid size-10 place-items-center rounded-full border", active ? "border-[#dca63a] text-[#e9bf69]" : "border-line text-muted")}><Icon size={17} aria-hidden /></span>
              <span><strong className="block text-lg font-medium tracking-[-0.025em]">{rule.name}</strong><span className={cn("mt-2 block font-mono text-[0.56rem] uppercase tracking-[0.13em]", active ? "text-white/45" : "text-muted")}>{rule.condition}</span></span>
              <span className={cn("font-mono text-[0.54rem] uppercase tracking-[0.12em]", active ? "text-[#e9bf69]" : "text-muted")}>{active ? "Selected" : "Inspect"}</span>
            </button>
          );
        })}
      </div>

      <article id="webhook-alert-rule-detail" className="border-t" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected.name} initial={reduceMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -7 }} transition={{ duration: 0.16 }} className="py-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div><p className="font-mono text-[0.6rem] uppercase tracking-[0.17em] text-accent">Rule {String(selectedIndex + 1).padStart(2, "0")}</p><h3 className="mt-4 text-3xl font-medium tracking-[-0.045em] md:text-4xl">{selected.name}</h3></div>
              <div className="flex flex-wrap gap-2"><span className="border px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.12em]">{selected.source}</span><span className="border px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.12em]">{selected.action}</span></div>
            </div>
            <dl className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Trigger condition</dt><dd className="mt-2 text-sm leading-relaxed">{selected.trigger}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Evidence used</dt><dd className="mt-2 text-sm leading-relaxed">{selected.evidence}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Operator response</dt><dd className="mt-2 text-sm leading-relaxed">{selected.operatorAction}</dd></div>
              <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Accepted limitation</dt><dd className="mt-2 text-sm leading-relaxed text-muted">{selected.limitation}</dd></div>
            </dl>
            <div className="mt-9 flex items-center justify-between gap-5 border-y py-4"><span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Cooldown</span><strong className="text-sm font-medium">{selected.cooldown}</strong></div>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}
