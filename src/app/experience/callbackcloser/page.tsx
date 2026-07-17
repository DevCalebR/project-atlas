import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { EventTimeline } from "@/components/experience/callbackcloser/event-timeline";
import { SystemTopology } from "@/components/experience/callbackcloser/system-topology";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { callbackDecisions, callbackTechnologies } from "@/lib/callbackcloser";

export const metadata: Metadata = {
  title: "CallbackCloser Engineering Experience",
  description: "Trace a missed call through CallbackCloser's signed webhooks, durable state, SMS qualification, and owner notification boundaries.",
  alternates: { canonical: "/experience/callbackcloser" },
};

const impacts = [
  { index: "01", title: "The missed call remains visible.", detail: "A durable call and lead record preserves the opportunity even when billing, compliance, or provider setup prevents automation from continuing." },
  { index: "02", title: "The caller supplies useful context.", detail: "The SMS state machine collects service need, urgency, location, and callback preference instead of leaving the owner with only a phone number." },
  { index: "03", title: "The owner receives an actionable handoff.", detail: "SMS, optional email, and the protected workspace expose the qualified lead and each channel's delivery state." },
] as const;

const lessons = [
  { label: "Event design", title: "Retries are part of the happy path.", detail: "Provider callbacks are not exactly-once messages. Designing around stable provider IDs, database constraints, and claimed side effects was more reliable than treating duplicates as exceptional." },
  { label: "Operational state", title: "A sent message is not a delivered message.", detail: "Twilio acceptance starts another event lifecycle. Persisting status callbacks and suppression reasons makes the difference between an optimistic interface and an operable system." },
  { label: "Product boundaries", title: "Billing should gate automation, not erase demand.", detail: "Inactive subscriptions and usage limits stop outbound follow-up while the missed call and lead remain visible. Commercial state changes side effects, not the historical event." },
  { label: "Complexity budget", title: "The next backend boundary is a durable queue.", detail: "Request-bound delivery is understandable at the current scale. Higher volume or stronger resumability requirements would move messaging and notifications into durable background work." },
  { label: "Honest outcomes", title: "Qualification is not booking.", detail: "The current system captures callback-ready context and notifies the owner. It does not contain a calendar integration, so this experience makes no automated-booking or conversion-rate claim." },
] as const;

export default function CallbackCloserExperiencePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-[#111315] text-[#f4f1ea]">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-[#ff674d]/40" aria-hidden />
        <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-between py-9 md:py-12">
          <Reveal className="flex items-center justify-between gap-5">
            <Link href="/experience" className="group inline-flex min-h-11 items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-[#ff674d]"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Experience hub</Link>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/40">02 / Event-driven SaaS</p>
          </Reveal>

          <div className="grid items-end gap-12 py-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-20 lg:py-16">
            <div>
              <Reveal delay={0.05}><p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff674d]">CallbackCloser / Engineering experience</p></Reveal>
              <Reveal delay={0.1}><h1 className="mt-7 max-w-5xl text-[clamp(3.7rem,9vw,9rem)] font-medium leading-[0.88] tracking-[-0.075em]">No answer is a systems event.</h1></Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 md:text-xl">Trace one missed call across telephony, signed webhooks, durable business rules, SMS qualification, and owner visibility.</p>
                <a href="#timeline" className="group mt-8 inline-flex min-h-12 items-center gap-4 border-b border-white text-sm font-medium transition-colors hover:border-[#ff674d] hover:text-[#ff674d]">Begin the walkthrough <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" aria-hidden /></a>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="border-t border-white/20">
              <div className="grid grid-cols-[4.5rem_1fr] border-b border-white/15 py-4"><span className="font-mono text-[0.6rem] text-[#ff674d]">00:00</span><span className="text-sm">Call enters Twilio Voice</span></div>
              <div className="grid grid-cols-[4.5rem_1fr] border-b border-white/15 py-4"><span className="font-mono text-[0.6rem] text-white/35">00:20</span><span className="text-sm">Default no-answer threshold</span></div>
              <div className="grid grid-cols-[4.5rem_1fr] border-b border-white/15 py-4"><span className="font-mono text-[0.6rem] text-white/35">EVENT</span><span className="text-sm">Dial status moves the system</span></div>
              <p className="mt-5 font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-white/35">Representative trace · not a production latency claim</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="timeline" className="scroll-mt-20 bg-[#111315] py-20 text-[#f4f1ea] md:py-32">
        <Container>
          <Reveal><SectionHeading index="01" eyebrow="Live workflow timeline" title="One missed call becomes a chain of accountable events." description="Start the trace, then inspect any stage. The accelerated sequence teaches ordering; it does not claim measured production latency." dark /></Reveal>
          <div className="mt-14 md:mt-20"><EventTimeline /></div>
        </Container>
      </section>

      <section id="architecture" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="02" eyebrow="System architecture" title="Events cross boundaries. State holds the story together." description="Select a boundary to see what it owns, why it exists, and the complexity it introduces." /></Reveal>
          <div className="mt-14 md:mt-20"><SystemTopology /></div>
        </Container>
      </section>

      <section id="decisions" className="scroll-mt-20 border-b bg-surface py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="03" eyebrow="Engineering decisions" title="Reliability is a collection of explicit choices." description="These decisions are visible in the route handlers, domain modules, schema constraints, and operating runbook." /></Reveal>
          <div className="mt-14 border-t lg:ml-[10rem] md:mt-20">
            {callbackDecisions.map((decision, index) => (
              <Reveal key={decision.title}>
                <details className="group border-b" open={index === 0}>
                  <summary className="grid min-h-24 cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-[0.62rem] text-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-xl font-medium tracking-[-0.025em] md:text-2xl">{decision.title}</span>
                    <ChevronDown size={18} className="transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="grid gap-8 pb-9 pl-[4rem] md:grid-cols-2 md:gap-12">
                    <div><p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">{decision.question}</p><p className="mt-4 text-sm leading-relaxed">{decision.answer}</p></div>
                    <div><p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">Accepted tradeoff</p><p className="mt-4 text-sm leading-relaxed text-muted">{decision.tradeoff}</p></div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="impact" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="04" eyebrow="Operational impact" title="The outcome is continuity—not invented conversion metrics." description="The system makes an interrupted customer journey visible, structured, and actionable." /></Reveal>
          <div className="mt-16 border-t md:mt-24">
            {impacts.map((impact) => <Reveal key={impact.index}><article className="grid gap-5 border-b py-8 md:grid-cols-[6rem_1fr_1fr] md:items-baseline md:gap-10 md:py-10"><span className="font-mono text-[0.62rem] text-accent">{impact.index}</span><h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">{impact.title}</h3><p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">{impact.detail}</p></article></Reveal>)}
          </div>
          <Reveal><p className="mt-8 max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">CallbackCloser captures a callback preference and creates an owner handoff. The current code does not book an appointment automatically, and no customer conversion rate is claimed.</p></Reveal>
        </Container>
      </section>

      <section id="evidence" className="scroll-mt-20 bg-[#111315] py-20 text-[#f4f1ea] md:py-32">
        <Container>
          <Reveal><SectionHeading index="05" eyebrow="Technology evidence" title="Every technology has a concrete responsibility." description="The stack is presented as implementation evidence, not a logo collection." dark /></Reveal>
          <div className="mt-14 border-t border-white/20 md:mt-20">
            {callbackTechnologies.map((technology, index) => (
              <Reveal key={technology.name}>
                <article className="grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[2.5rem_11rem_1fr] lg:grid-cols-[3rem_14rem_1fr_15rem] lg:items-baseline lg:gap-8">
                  <span className="font-mono text-[0.6rem] text-[#ff674d]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-medium">{technology.name}</h3>
                  <p className="text-sm leading-relaxed text-white/65">{technology.use}</p>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/35 sm:col-start-2 lg:col-start-auto">{technology.evidence}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="lessons" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="06" eyebrow="Lessons learned" title="The hard part was coordinating truth across systems." description="The strongest lessons came from provider behavior, operational failure states, and knowing where the architecture should stop." /></Reveal>
          <div className="mt-14 grid border-t md:mt-20 lg:grid-cols-2">
            {lessons.map((lesson, index) => (
              <Reveal key={lesson.label} className={index === lessons.length - 1 ? "lg:col-span-2" : undefined}>
                <article className="min-h-full border-b p-6 md:p-8 lg:border-r">
                  <div className="flex items-start justify-between gap-5"><p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">{lesson.label}</p><span className="font-mono text-[0.6rem] text-muted">{String(index + 1).padStart(2, "0")}</span></div>
                  <h3 className="mt-8 max-w-xl text-2xl font-medium tracking-[-0.035em] md:text-3xl">{lesson.title}</h3>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{lesson.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#ff674d] py-20 text-[#111315] md:py-28">
        <Container className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-55">Trace complete</p>
          <div>
            <h2 className="max-w-5xl text-balance text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-5xl md:text-7xl">The call ended. The system kept the opportunity moving.</h2>
            <div className="mt-9 flex flex-wrap gap-6"><ArrowLink href="/experience" className="border-[#111315] text-[#111315]">Experience hub</ArrowLink><Link href="#timeline" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium">Replay the trace <ArrowUpRight size={17} aria-hidden /></Link></div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionHeading({ index, eyebrow, title, description, dark = false }: { index: string; eyebrow: string; title: string; description: string; dark?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-12">
      <p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-white/35" : "font-mono text-xs uppercase tracking-[0.2em] text-muted"}>{index} / 06</p>
      <div>
        <p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-[#ff674d]" : "font-mono text-xs uppercase tracking-[0.2em] text-accent"}>{eyebrow}</p>
        <h2 className="mt-5 max-w-5xl text-balance text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl">{title}</h2>
        <p className={dark ? "mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg" : "mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"}>{description}</p>
      </div>
    </div>
  );
}
