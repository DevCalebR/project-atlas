import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, CircleDotDashed } from "lucide-react";
import { AlertRuleExplorer } from "@/components/experience/webhook-dashboard/alert-rule-explorer";
import { FailureInvestigation } from "@/components/experience/webhook-dashboard/failure-investigation";
import { OperationsConsole } from "@/components/experience/webhook-dashboard/operations-console";
import { OperationsTopology } from "@/components/experience/webhook-dashboard/operations-topology";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { webhookDecisions, webhookLimitations, webhookTechnologies } from "@/lib/webhook-dashboard";

export const metadata: Metadata = {
  title: "Webhook Dashboard Engineering Experience",
  description: "Inspect how signed webhook events become durable, diagnosable evidence through verification, deduplication, alert evaluation, and operator tooling.",
  alternates: { canonical: "/experience/webhook-dashboard" },
};

const reflections = [
  { label: "Visibility", title: "Logs are not an operating surface.", detail: "A useful system joins the event, payload, identity, rule outcome, and delivery note where an operator can reason about them together." },
  { label: "Diagnosis", title: "Raw evidence narrows the fault boundary.", detail: "Signature state, deterministic identity, persistence, and alert history let an engineer rule out entire classes of failure before changing code." },
  { label: "Reliability", title: "A recorded failure is better than a hidden retry.", detail: "The current design keeps accepted ingestion stable when Slack fails, while being honest that durable retry is still a future boundary." },
] as const;

export default function WebhookDashboardExperiencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0d1210] text-[#efede5] lg:min-h-[calc(100svh-var(--header-height))]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] signal-grid" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-[#dca63a]/30 md:block" aria-hidden />
        <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col py-8 md:py-11">
          <Reveal className="flex items-center justify-between gap-5">
            <Link href="/experience" className="group inline-flex min-h-11 items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#e9bf69]"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Experience hub</Link>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">03 / Operations tooling</p>
          </Reveal>

          <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] lg:gap-20 lg:py-14">
            <div>
              <Reveal delay={0.05}><p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#dca63a]">Webhook Dashboard / Engineering experience</p></Reveal>
              <Reveal delay={0.1}><h1 className="mt-7 max-w-4xl text-[clamp(3.4rem,7.5vw,7.6rem)] font-medium leading-[0.91] tracking-[-0.072em]">A webhook should leave more than a log line.</h1></Reveal>
              <Reveal delay={0.15}><p className="mt-7 max-w-2xl text-base leading-relaxed text-white/58 md:text-lg">Follow signed synthetic events through verification, durable identity, alert reasoning, and operator investigation.</p><a href="#event-ledger" className="group mt-7 inline-flex min-h-12 items-center gap-4 border-b border-white text-sm font-medium transition-colors hover:border-[#dca63a] hover:text-[#e9bf69]">Enter the operations ledger <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" aria-hidden /></a></Reveal>
            </div>

            <Reveal delay={0.22} className="border border-[#34443d] bg-[#121a16]">
              <div className="flex items-center justify-between gap-4 border-b border-[#34443d] px-5 py-4"><span className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-white/38">Synthetic signal / sanitized</span><span className="inline-flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-[#e9bf69]"><CircleDotDashed size={14} aria-hidden /> persisted</span></div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3"><p className="text-2xl font-medium tracking-[-0.04em]">invoice.paid</p><p className="font-mono text-xs text-white/40">14:32:08.214Z</p></div>
                <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/32">Event ID</dt><dd className="mt-2 break-all font-mono text-xs">evt_demo_1042</dd></div>
                  <div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/32">Source</dt><dd className="mt-2 font-mono text-xs">generic</dd></div>
                  <div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/32">Signature</dt><dd className="mt-2 inline-flex items-center gap-2 text-xs"><Check size={14} className="text-[#e9bf69]" aria-hidden /> valid</dd></div>
                  <div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/32">Alert state</dt><dd className="mt-2 text-xs">fired · database only</dd></div>
                </dl>
                <div className="mt-7 border-t border-[#34443d] pt-4"><p className="font-mono text-[0.54rem] uppercase tracking-[0.13em] text-white/32">Route</p><p className="mt-2 break-all font-mono text-xs text-[#e9bf69]">POST /api/webhooks/generic</p></div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="event-ledger" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="01" eyebrow="Live event ledger" title="Selection commits the evidence under inspection." description="These synthetic records model the repository’s persisted Event and AlertRun data. Invalid signatures do not appear here because the real route rejects them before persistence." /></Reveal>
          <div className="mt-14 md:mt-20"><OperationsConsole /></div>
        </Container>
      </section>

      <section id="alerting" className="scroll-mt-20 border-y bg-surface py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="02" eyebrow="Alert reasoning" title="An alert is a decision with evidence attached." description="Inspect the rule condition, resulting operator action, and limitation. The third rule reflects tested optional Slack behavior rather than a claimed live integration." /></Reveal>
          <div className="mt-14 md:mt-20"><AlertRuleExplorer /></div>
        </Container>
      </section>

      <section id="topology" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="03" eyebrow="Operations topology" title="The ledger is the center of the diagnostic network." description="Select a boundary to inspect what enters, what leaves, which signal it exposes, and where the present architecture stops." /></Reveal>
          <div className="mt-14 md:mt-20"><OperationsTopology /></div>
        </Container>
      </section>

      <section id="investigation" className="scroll-mt-20 bg-[#0d1210] py-20 text-[#efede5] md:py-32">
        <Container>
          <Reveal><SectionHeading index="04" eyebrow="Failure investigation" title="Follow evidence until only one boundary remains suspect." description="A guided Slack-delivery failure demonstrates how persisted context reduces debugging uncertainty without pretending automated remediation exists." dark /></Reveal>
          <div className="mt-14 md:mt-20"><FailureInvestigation /></div>
        </Container>
      </section>

      <section id="decisions" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="05" eyebrow="Operational decisions" title="Inspectable behavior starts with explicit contracts." description="Each choice is tied to an implementation boundary, a nearby alternative, and a cost the system still carries." /></Reveal>
          <div className="mt-14 border-t md:mt-20">
            {webhookDecisions.map((decision, index) => (
              <Reveal key={decision.title}>
                <article className="grid gap-7 border-b py-8 md:grid-cols-[4rem_minmax(13rem,0.7fr)_minmax(0,1.3fr)] md:gap-10 md:py-10">
                  <span className="font-mono text-[0.62rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-2xl font-medium tracking-[-0.04em]">{decision.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted">{decision.problem}</p></div>
                  <dl className="grid gap-6 sm:grid-cols-2"><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-accent">Chosen approach</dt><dd className="mt-2 text-sm leading-relaxed">{decision.approach}</dd></div><div><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Nearby alternative</dt><dd className="mt-2 text-sm leading-relaxed">{decision.alternative}</dd></div><div className="sm:col-span-2"><dt className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">Accepted cost</dt><dd className="mt-2 text-sm leading-relaxed text-muted">{decision.cost}</dd></div></dl>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="evidence" className="scroll-mt-20 border-b bg-surface py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="06" eyebrow="Technology evidence + limits" title="The implementation is useful because its boundaries are visible." description="Technology is connected to concrete responsibility, then paired with what this repository does not claim." /></Reveal>
          <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-2 lg:gap-20">
            <div className="border-t">
              {webhookTechnologies.map((technology, index) => <Reveal key={technology.name}><article className="grid grid-cols-[2rem_1fr] gap-4 border-b py-6"><span className="font-mono text-[0.58rem] text-accent">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-medium">{technology.name}</h3><p className="mt-3 text-sm leading-relaxed">{technology.role}</p><p className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">{technology.evidence}</p></div></article></Reveal>)}
            </div>
            <div><p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">Honest limitations</p><ul className="mt-6 border-t">{webhookLimitations.map((limitation) => <li key={limitation} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b py-5 text-sm leading-relaxed text-muted"><span className="font-mono text-[0.58rem] text-accent">—</span>{limitation}</li>)}</ul></div>
          </div>
        </Container>
      </section>

      <section id="reflection" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="07" eyebrow="Reflection" title="Observability is part of the system, not a view added afterward." description="The strongest lessons came from preserving context across trust, persistence, classification, and delivery boundaries." /></Reveal>
          <div className="mt-14 border-t md:mt-20">
            {reflections.map((reflection, index) => <Reveal key={reflection.label}><article className="grid gap-5 border-b py-8 md:grid-cols-[8rem_1fr_1fr] md:items-baseline md:gap-10"><p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-accent">{reflection.label} / {String(index + 1).padStart(2, "0")}</p><h3 className="text-2xl font-medium tracking-[-0.04em] md:text-3xl">{reflection.title}</h3><p className="text-sm leading-relaxed text-muted md:text-base">{reflection.detail}</p></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section className="bg-[#dca63a] py-20 text-[#101512] md:py-28">
        <Container className="grid gap-10 md:grid-cols-[9rem_1fr] md:gap-12">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-55">Evidence retained</p>
          <div><h2 className="max-w-5xl text-balance text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-5xl md:text-7xl">The signal arrived. The reasoning stayed inspectable.</h2><div className="mt-9 flex flex-wrap gap-7"><Link href="/experience" className="inline-flex min-h-12 items-center border-b border-[#101512] text-sm font-medium">Experience hub</Link><Link href="#event-ledger" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium">Reopen the ledger <ArrowUpRight size={17} aria-hidden /></Link></div></div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({ index, eyebrow, title, description, dark = false }: { index: string; eyebrow: string; title: string; description: string; dark?: boolean }) {
  return <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-12"><p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-white/35" : "font-mono text-xs uppercase tracking-[0.2em] text-muted"}>{index} / 07</p><div><p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-[#e9bf69]" : "font-mono text-xs uppercase tracking-[0.2em] text-accent"}>{eyebrow}</p><h2 className="mt-5 max-w-5xl text-balance text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl">{title}</h2><p className={dark ? "mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg" : "mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"}>{description}</p></div></div>;
}
