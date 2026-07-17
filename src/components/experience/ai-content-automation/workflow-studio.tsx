"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, CircleDot } from "lucide-react";
import { useRef, useState } from "react";
import { transformationViews, workflowStages } from "@/lib/ai-content-automation";
import { cn } from "@/lib/utils";

export function WorkflowStudio() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = workflowStages[selectedIndex];
  const view = transformationViews[viewIndex];

  function moveStage(index: number) {
    const next = (index + workflowStages.length) % workflowStages.length;
    setSelectedIndex(next);
    stageRefs.current[next]?.focus();
  }

  function moveView(index: number) {
    const next = (index + transformationViews.length) % transformationViews.length;
    setViewIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="border border-[#253962] bg-[#081426] text-[#f2f5fb] shadow-[0_30px_90px_rgba(5,15,35,0.2)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#253962] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="relative grid size-8 place-items-center rounded-full border border-[#73a4ff]/45 text-[#8cb5ff]">
            <CircleDot size={15} aria-hidden />
          </span>
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-[#8cb5ff]">Orchestration canvas</p>
            <p className="mt-1 text-xs text-white/45">Repository-backed workflow · no live provider calls</p>
          </div>
        </div>
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-white/35">Select a station to inspect its contract</p>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)]">
        <div className="border-[#253962] xl:border-r">
          <ol aria-label="Content automation workflow stages" className="grid sm:grid-cols-2">
            {workflowStages.map((stage, index) => {
              const active = selectedIndex === index;
              return (
                <li key={stage.id} className={cn("relative border-b border-[#253962]", index % 2 === 0 && "sm:border-r")}>
                  <button
                    ref={(node) => { stageRefs.current[index] = node; }}
                    type="button"
                    aria-pressed={active}
                    aria-controls="workflow-stage-inspector"
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(event) => {
                      if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); moveStage(index + 1); }
                      if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); moveStage(index - 1); }
                      if (event.key === "Home") { event.preventDefault(); moveStage(0); }
                      if (event.key === "End") { event.preventDefault(); moveStage(workflowStages.length - 1); }
                    }}
                    className={cn(
                      "group relative flex min-h-36 w-full items-stretch gap-4 overflow-hidden px-4 py-5 text-left transition-colors sm:min-h-40 sm:px-5",
                      active ? "bg-[#2d6cdf] text-white" : "hover:bg-white/[0.045]",
                    )}
                  >
                    <span className={cn("flex w-9 shrink-0 flex-col items-center gap-3 border-r pr-4 font-mono text-[0.6rem]", active ? "border-white/30" : "border-white/12 text-white/38")}>
                      {stage.index}
                      <span className={cn("h-full w-px", active ? "bg-white/55" : "bg-[#2d6cdf]/65")} aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col justify-between">
                      <span>
                        <span className={cn("font-mono text-[0.52rem] uppercase tracking-[0.13em]", active ? "text-white/70" : "text-[#8cb5ff]")}>{stage.status}</span>
                        <strong className="mt-3 block text-xl font-medium tracking-[-0.025em]">{stage.label}</strong>
                      </span>
                      <span className={cn("mt-5 flex items-center justify-between gap-3 font-mono text-[0.54rem] uppercase tracking-[0.12em]", active ? "text-white/70" : "text-white/35")}>
                        inspect boundary
                        {index < workflowStages.length - 1 ? <ArrowDown size={14} className="sm:hidden" aria-hidden /> : null}
                        {index < workflowStages.length - 1 ? <ArrowRight size={14} className="hidden sm:block" aria-hidden /> : <Check size={14} aria-hidden />}
                      </span>
                    </span>
                    {active && <span className="absolute inset-y-0 left-0 w-1 bg-white" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <aside id="workflow-stage-inspector" className="min-w-0 xl:sticky xl:top-24 xl:self-start" aria-live="polite" aria-atomic="true">
          <div className="border-b border-[#253962] px-5 py-6 sm:px-7">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#8cb5ff]">Selected station / {selected.index}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected.id} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{selected.label}</h3>
                <p className="mt-3 break-words font-mono text-[0.6rem] leading-relaxed text-white/40">Owner: {selected.owner}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.dl key={`${selected.id}-details`} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="grid sm:grid-cols-2 xl:grid-cols-1">
              <InspectorField label="Input" value={selected.input} />
              <InspectorField label="Work performed" value={selected.work} />
              <InspectorField label="Output" value={selected.output} />
              <InspectorField label="Failure condition" value={selected.failure} accent />
              <InspectorField label="Why this boundary exists" value={selected.boundary} className="sm:col-span-2 xl:col-span-1" />
              <InspectorField label="Repository evidence" value={selected.evidence} mono className="sm:col-span-2 xl:col-span-1" />
            </motion.dl>
          </AnimatePresence>
        </aside>
      </div>

      <section className="border-t border-[#253962]" aria-labelledby="transformation-inspector-title">
        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)]">
          <div className="border-[#253962] p-5 lg:border-r lg:p-6">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-[#8cb5ff]">Transformation inspector</p>
            <h3 id="transformation-inspector-title" className="mt-4 text-2xl font-medium tracking-[-0.035em]">Inspect the shape, not a staged model call.</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/48">Each view is sanitized and representative of repository contracts or opt-in seed data.</p>
          </div>
          <div className="min-w-0">
            <div role="tablist" aria-label="Transformation evidence views" className="grid grid-cols-2 border-b border-[#253962] sm:grid-cols-4">
              {transformationViews.map((item, index) => (
                <button
                  key={item.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  type="button"
                  role="tab"
                  id={`transform-tab-${item.id}`}
                  aria-selected={viewIndex === index}
                  aria-controls={`transform-panel-${item.id}`}
                  tabIndex={viewIndex === index ? 0 : -1}
                  onClick={() => setViewIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") { event.preventDefault(); moveView(index + 1); }
                    if (event.key === "ArrowLeft") { event.preventDefault(); moveView(index - 1); }
                    if (event.key === "Home") { event.preventDefault(); moveView(0); }
                    if (event.key === "End") { event.preventDefault(); moveView(transformationViews.length - 1); }
                  }}
                  className={cn("min-h-14 border-[#253962] px-3 py-3 text-left font-mono text-[0.55rem] uppercase tracking-[0.11em] transition-colors sm:border-r sm:last:border-r-0", viewIndex === index ? "bg-[#2d6cdf] text-white" : "text-white/48 hover:bg-white/[0.04]")}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div id={`transform-panel-${view.id}`} role="tabpanel" aria-labelledby={`transform-tab-${view.id}`} className="min-w-0 p-4 sm:p-6">
              <p className="mb-4 text-xs leading-relaxed text-white/45">{view.note}</p>
              <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words border border-[#253962] bg-[#050d19] p-4 font-mono text-[0.68rem] leading-6 text-[#c8d9f8] sm:p-5"><code>{JSON.stringify(view.content, null, 2)}</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InspectorField({ label, value, accent = false, mono = false, className }: { label: string; value: string; accent?: boolean; mono?: boolean; className?: string }) {
  return (
    <div className={cn("border-b border-[#253962] px-5 py-5 sm:px-7", className)}>
      <dt className={cn("font-mono text-[0.54rem] uppercase tracking-[0.15em]", accent ? "text-[#ffb45f]" : "text-[#8cb5ff]")}>{label}</dt>
      <dd className={cn("mt-2 break-words text-sm leading-relaxed text-white/62", mono && "font-mono text-[0.65rem] text-white/45")}>{value}</dd>
    </div>
  );
}
