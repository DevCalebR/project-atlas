"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, CircleCheck, Clock3, LoaderCircle } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { runFixtures } from "@/lib/portfolio-dashboard";
import { cn } from "@/lib/utils";

const filters = ["all", "done", "failed", "queued", "running"] as const;
const tabs = ["Evidence", "Configuration", "Interpretation"] as const;
type Filter = (typeof filters)[number];

export function RunInspector() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(runFixtures[0].id);
  const [tabIndex, setTabIndex] = useState(0);
  const runRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const visible = useMemo(() => runFixtures.filter((run) => filter === "all" || run.status === filter), [filter]);
  const selected = runFixtures.find((run) => run.id === selectedId) ?? visible[0] ?? runFixtures[0];

  function changeFilter(next: Filter) {
    setFilter(next);
    const first = runFixtures.find((run) => next === "all" || run.status === next);
    if (first) setSelectedId(first.id);
  }

  function moveRun(index: number) {
    const next = (index + visible.length) % visible.length;
    setSelectedId(visible[next].id);
    runRefs.current[next]?.focus();
  }

  function moveTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setTabIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="border-y">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-4 sm:px-6"><div><p className="font-mono text-[0.58rem] uppercase tracking-[0.17em] text-[#607d22]">Repository run fixtures</p><p className="mt-1 text-xs text-muted">Authentic synthetic records from mockData.ts · never live trading activity</p></div><p className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-muted">04 selected fixtures / 12 total</p></div>
      <div className="grid grid-cols-3 border-b sm:grid-cols-5" role="group" aria-label="Filter synthetic runs by status">
        {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => changeFilter(item)} className={cn("min-h-14 border-r px-3 py-3 text-left font-mono text-[0.54rem] uppercase tracking-[0.12em] transition-colors last:border-r-0", filter === item ? "bg-[#b8ef5b] text-[#10130e]" : "hover:bg-surface")}>{item}</button>)}
      </div>
      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(25rem,1.08fr)]">
        <div className="border-line lg:border-r" role="group" aria-label="Select a synthetic run fixture">
          {visible.map((run, index) => {
            const active = selected.id === run.id;
            const Icon = run.status === "done" ? CircleCheck : run.status === "failed" ? AlertTriangle : run.status === "queued" ? Clock3 : LoaderCircle;
            return <button
              key={run.id}
              ref={(node) => { runRefs.current[index] = node; }}
              type="button"
              aria-pressed={active}
              aria-controls="run-fixture-inspector"
              onClick={() => setSelectedId(run.id)}
              onKeyDown={(event) => {
                if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); moveRun(index + 1); }
                if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); moveRun(index - 1); }
                if (event.key === "Home") { event.preventDefault(); moveRun(0); }
                if (event.key === "End") { event.preventDefault(); moveRun(visible.length - 1); }
              }}
              className={cn("group grid min-h-28 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b px-4 py-5 text-left transition-colors last:border-b-0 sm:px-6", active ? "bg-[#171b14] text-white" : "hover:bg-surface")}
            >
              <span className={cn("grid size-9 place-items-center rounded-full border", active ? "border-[#b8ef5b] text-[#b8ef5b]" : "text-muted")}><Icon size={16} aria-hidden /></span>
              <span><strong className="font-mono text-sm">{run.id}</strong><span className={cn("mt-2 block text-sm", active ? "text-white/62" : "text-muted")}>{run.pair} · {run.timeframe} · {run.strategy}</span></span>
              <span className="flex items-center gap-3"><span className={cn("font-mono text-[0.52rem] uppercase tracking-[0.12em]", active ? "text-[#b8ef5b]" : "text-muted")}>{run.status}</span><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
            </button>;
          })}
        </div>

        <aside id="run-fixture-inspector" className="min-w-0" aria-live="polite" aria-atomic="true">
          <div className="border-b px-5 py-6 sm:px-7"><p className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-[#607d22]">Selected fixture / {selected.id}</p><div className="mt-3 flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-3xl font-medium tracking-[-0.045em]">{selected.pair}</h3><span className="border px-3 py-1.5 font-mono text-[0.53rem] uppercase tracking-[0.12em]">{selected.status}</span></div></div>
          <div role="tablist" aria-label="Run fixture evidence layers" className="grid grid-cols-3 border-b">
            {tabs.map((tab, index) => <button
              key={tab}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`run-tab-${index}`}
              aria-selected={tabIndex === index}
              aria-controls={`run-panel-${index}`}
              tabIndex={tabIndex === index ? 0 : -1}
              onClick={() => setTabIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") { event.preventDefault(); moveTab(index + 1); }
                if (event.key === "ArrowLeft") { event.preventDefault(); moveTab(index - 1); }
                if (event.key === "Home") { event.preventDefault(); moveTab(0); }
                if (event.key === "End") { event.preventDefault(); moveTab(tabs.length - 1); }
              }}
              className={cn("min-h-14 border-r px-3 py-3 text-left font-mono text-[0.53rem] uppercase tracking-[0.1em] transition-colors last:border-r-0", tabIndex === index ? "bg-[#b8ef5b] text-[#10130e]" : "hover:bg-surface")}
            >{tab}</button>)}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${selected.id}-${tabIndex}`} id={`run-panel-${tabIndex}`} role="tabpanel" aria-labelledby={`run-tab-${tabIndex}`} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.16 }} className="p-5 sm:p-7">
              {tabIndex === 0 && <dl className="grid gap-px bg-line sm:grid-cols-2"><RunField label="Profit factor" value={selected.profitFactor} caveat /><RunField label="Trades" value={String(selected.trades)} caveat /><RunField label="Max drawdown" value={selected.maxDrawdown} caveat /><RunField label="Created" value={selected.created} /></dl>}
              {tabIndex === 1 && <dl className="grid gap-px bg-line sm:grid-cols-2"><RunField label="Pair / timeframe" value={`${selected.pair} / ${selected.timeframe}`} /><RunField label="Strategy" value={selected.strategy} /><RunField label="Risk input" value={selected.risk} /><RunField label="Historical window" value={selected.range} /></dl>}
              {tabIndex === 2 && <div><p className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#607d22]">What this record proves</p><p className="mt-4 text-base leading-relaxed">{selected.interpretation}</p><div className="mt-7 border-l-2 border-[#607d22] pl-5"><p className="font-mono text-[0.53rem] uppercase tracking-[0.13em] text-muted">Follow-up action</p><p className="mt-2 text-sm leading-relaxed text-muted">{selected.followUp}</p></div></div>}
              <p className="mt-6 border-t pt-4 text-xs leading-relaxed text-muted"><strong className="text-foreground">Fixture boundary:</strong> values come from the repository’s synthetic mock data. They are not market results, financial advice, or live executions.</p>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}

function RunField({ label, value, caveat = false }: { label: string; value: string; caveat?: boolean }) {
  return <div className="bg-background p-4"><dt className="font-mono text-[0.52rem] uppercase tracking-[0.13em] text-muted">{label}</dt><dd className="mt-3 text-xl font-medium">{value}</dd>{caveat && <p className="mt-2 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-[#607d22]">synthetic fixture value</p>}</div>;
}
