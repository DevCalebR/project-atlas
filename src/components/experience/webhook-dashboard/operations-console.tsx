"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Braces, Check, FileSearch, History } from "lucide-react";
import { useRef, useState } from "react";
import { webhookEvents } from "@/lib/webhook-dashboard";
import { cn } from "@/lib/utils";

const views = [
  { id: "evidence", label: "Evidence", icon: FileSearch },
  { id: "payload", label: "Payload", icon: Braces },
  { id: "history", label: "History", icon: History },
] as const;

type ViewId = (typeof views)[number]["id"];

export function OperationsConsole() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [view, setView] = useState<ViewId>("evidence");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selected = webhookEvents[selectedIndex];

  function selectEvent(index: number) {
    setSelectedIndex(index);
  }

  function moveTab(index: number) {
    const next = (index + views.length) % views.length;
    setView(views[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="border-y border-[#25312d] bg-[#0d1210] text-[#e9e7de] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(25rem,0.92fr)]">
      <div className="border-[#25312d] lg:border-r">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#25312d] px-4 py-5 sm:px-6">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#dca63a]">Persisted event ledger</p>
            <p className="mt-2 text-sm text-white/55">Representative synthetic records · newest first</p>
          </div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-white/35">04 visible / static demo</p>
        </div>

        <ul aria-label="Representative webhook events">
          {webhookEvents.map((event, index) => {
            const selectedRow = index === selectedIndex;
            return (
              <li key={event.id} className="border-b border-[#25312d] last:border-b-0">
                <button
                  type="button"
                  aria-pressed={selectedRow}
                  aria-controls="webhook-event-inspector"
                  onClick={() => selectEvent(index)}
                  className={cn(
                    "group grid min-h-28 w-full gap-3 px-4 py-5 text-left transition-colors sm:grid-cols-[7.5rem_minmax(0,1fr)_7.5rem] sm:items-center sm:px-6",
                    selectedRow ? "bg-[#dca63a] text-[#101512]" : "hover:bg-white/[0.04]",
                  )}
                >
                  <span>
                    <span className={cn("block font-mono text-[0.58rem] uppercase tracking-[0.13em]", selectedRow ? "text-black/55" : "text-white/35")}>Received</span>
                    <span className="mt-2 block font-mono text-xs">{event.receivedAt}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <strong className="break-words text-base font-medium sm:text-lg">{event.type}</strong>
                      <span className={cn("border px-2 py-1 font-mono text-[0.52rem] uppercase tracking-[0.12em]", selectedRow ? "border-black/25" : "border-white/20 text-white/55")}>{event.source}</span>
                    </span>
                    <span className={cn("mt-2 block break-all font-mono text-[0.62rem]", selectedRow ? "text-black/55" : "text-white/35")}>{event.id}</span>
                  </span>
                  <span className="flex items-center gap-3 sm:justify-end">
                    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full border", selectedRow ? "border-black/35" : "border-[#dca63a] text-[#dca63a]")}><Check size={13} strokeWidth={3} aria-hidden /></span>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em]">{event.result}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside id="webhook-event-inspector" className="min-w-0 lg:sticky lg:top-28 lg:self-start" aria-live="polite" aria-atomic="true">
        <div className="border-b border-[#25312d] px-4 py-5 sm:px-6">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#dca63a]">Selected evidence</p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="break-words text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{selected.type}</h3>
              <p className="mt-2 break-all font-mono text-[0.62rem] text-white/40">{selected.dedupeKey}</p>
            </div>
            <span className="inline-flex min-h-8 items-center border border-[#dca63a]/50 px-3 font-mono text-[0.56rem] uppercase tracking-[0.13em] text-[#e9bf69]">signature {selected.signature}</span>
          </div>
        </div>

        <div role="tablist" aria-label="Event evidence views" className="grid grid-cols-3 border-b border-[#25312d]">
          {views.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                type="button"
                role="tab"
                id={`webhook-tab-${item.id}`}
                aria-selected={view === item.id}
                aria-controls={`webhook-panel-${item.id}`}
                tabIndex={view === item.id ? 0 : -1}
                onClick={() => setView(item.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") { event.preventDefault(); moveTab(index + 1); }
                  if (event.key === "ArrowLeft") { event.preventDefault(); moveTab(index - 1); }
                  if (event.key === "Home") { event.preventDefault(); moveTab(0); }
                  if (event.key === "End") { event.preventDefault(); moveTab(views.length - 1); }
                }}
                className={cn("flex min-h-14 items-center justify-center gap-2 border-r border-[#25312d] px-2 text-xs last:border-r-0", view === item.id ? "bg-white/[0.07] font-semibold text-[#e9bf69]" : "text-white/45 hover:text-white")}
              >
                <Icon size={15} aria-hidden /> {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${selected.id}-${view}`}
            id={`webhook-panel-${view}`}
            role="tabpanel"
            aria-labelledby={`webhook-tab-${view}`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
            className="min-h-[25rem] px-4 py-7 sm:px-6"
          >
            {view === "evidence" ? (
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-white/65">{selected.resultDetail}</p>
                <dl className="mt-8 space-y-6">
                  {selected.evidence.map((item) => <div key={item.label} className="grid gap-2 border-t border-[#25312d] pt-4 sm:grid-cols-[8rem_1fr]"><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">{item.label}</dt><dd className="text-sm leading-relaxed">{item.value}</dd></div>)}
                </dl>
                <div className="mt-8 border border-[#25312d] p-4"><p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">Raw-body hash</p><p className="mt-2 break-all font-mono text-xs text-[#e9bf69]">{selected.rawBodyHash}</p></div>
              </div>
            ) : null}

            {view === "payload" ? (
              <div>
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">Sanitized representative JSON</p>
                <pre className="mt-5 max-w-full overflow-x-auto whitespace-pre-wrap break-words border border-[#25312d] bg-black/25 p-5 font-mono text-xs leading-7 text-[#e9bf69]"><code>{JSON.stringify(selected.payload, null, 2)}</code></pre>
                <p className="mt-5 text-xs leading-relaxed text-white/45">No signing material, customer data, private URL, or real provider payload is included.</p>
              </div>
            ) : null}

            {view === "history" ? (
              <ol className="space-y-0">
                {selected.history.map((item, index) => <li key={item.label} className="relative grid grid-cols-[2rem_1fr] gap-4 pb-8 last:pb-0"><span className="relative z-10 grid size-8 place-items-center rounded-full border border-[#dca63a] bg-[#0d1210] font-mono text-[0.58rem] text-[#e9bf69]">{String(index + 1).padStart(2, "0")}</span>{index < selected.history.length - 1 ? <span className="absolute bottom-0 left-[0.98rem] top-8 w-px bg-[#25312d]" aria-hidden /> : null}<div><h4 className="font-medium">{item.label}</h4><p className="mt-2 text-sm leading-relaxed text-white/55">{item.detail}</p></div></li>)}
              </ol>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
