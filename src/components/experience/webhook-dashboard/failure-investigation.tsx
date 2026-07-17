"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const investigation = [
  { label: "Confirm trust", signal: "signatureValid: true", evidence: "The timestamped signature passed before parsing, so this is not an authentication rejection.", conclusion: "The request crossed the public trust boundary successfully." },
  { label: "Confirm persistence", signal: "eventId: evt_demo_failure_01", evidence: "The event has a stable ID, dedupe key, raw-body hash, and stored payload.", conclusion: "Ingestion completed; the failure is downstream of event storage." },
  { label: "Inspect rule match", signal: "status: fired", evidence: "The source and event type matched an enabled slack_webhook rule outside cooldown.", conclusion: "Rule classification worked and the action was attempted." },
  { label: "Read the run note", signal: "slack_failed: http_503", evidence: "The AlertRun retained the downstream HTTP failure while keeping its matched-rule context.", conclusion: "The likely fault boundary is Slack delivery, not signature, storage, or matching." },
  { label: "Choose the response", signal: "accepted webhook · visible failure", evidence: "The provider received success, preventing a retry storm. An admin can inspect and deliberately replay evaluation.", conclusion: "The current system exposes the failure but does not automatically retry it." },
] as const;

export function FailureInvestigation() {
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = investigation[step];
  const complete = step === investigation.length - 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(23rem,1.2fr)] lg:gap-16">
      <div>
        <div className="border-y border-white/15 py-5">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#e9bf69]">Representative failure scenario</p>
          <p className="mt-3 text-sm leading-relaxed text-white/55">This is a sanitized demonstration assembled from tested Slack-failure behavior—not a claimed production incident.</p>
        </div>
        <ol className="mt-3">
          {investigation.map((item, index) => (
            <li key={item.label} className="border-b border-white/10">
              <button type="button" aria-pressed={index === step} aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)} className={cn("grid min-h-16 w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-2 text-left transition-colors", index === step ? "bg-white/[0.08]" : "hover:bg-white/[0.04]")}>
                <span className={cn("font-mono text-[0.58rem]", index <= step ? "text-[#e9bf69]" : "text-white/30")}>{String(index + 1).padStart(2, "0")}</span><span className={cn("text-sm", index === step && "font-semibold")}>{item.label}</span><span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/30">{index < step ? "Reviewed" : index === step ? "Active" : "Queued"}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <article aria-live="polite" aria-atomic="true" className="border-t border-white/20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active.label} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: 0.16 }} className="py-7">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[#e9bf69]">Investigation {String(step + 1).padStart(2, "0")} / {String(investigation.length).padStart(2, "0")}</p>
            <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em] md:text-4xl">{active.label}</h3>
            <div className="mt-8 border border-white/15 bg-black/20 p-5"><p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">Observed signal</p><p className="mt-3 break-all font-mono text-sm text-[#e9bf69]">{active.signal}</p></div>
            <dl className="mt-8 space-y-7"><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">Evidence</dt><dd className="mt-2 text-sm leading-relaxed text-white/65">{active.evidence}</dd></div><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">Working conclusion</dt><dd className="mt-2 text-sm leading-relaxed">{active.conclusion}</dd></div></dl>
            <button type="button" onClick={() => setStep(complete ? 0 : step + 1)} className="mt-9 inline-flex min-h-12 items-center gap-3 bg-[#dca63a] px-5 text-sm font-semibold text-[#101512]">
              {complete ? <RotateCcw size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden />}{complete ? "Restart investigation" : "Follow next signal"}
            </button>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
}
