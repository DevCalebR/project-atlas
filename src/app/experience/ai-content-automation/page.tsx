import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, Braces, Check, Database, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { DeliveryBoundary } from "@/components/experience/ai-content-automation/delivery-boundary";
import { ExecutionHistory } from "@/components/experience/ai-content-automation/execution-history";
import { ReviewBoundary } from "@/components/experience/ai-content-automation/review-boundary";
import { WorkflowStudio } from "@/components/experience/ai-content-automation/workflow-studio";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { engineeringDecisions, limitations, technologies } from "@/lib/ai-content-automation";

export const metadata: Metadata = {
  title: "AI Content Automation Engineering Experience",
  description: "Explore a repository-backed workflow for structured content briefs, schema-backed AI generation, human review, deterministic exports, and Google Docs delivery architecture.",
  alternates: { canonical: "/experience/ai-content-automation" },
};

const repositoryUrl = "https://github.com/DevCalebR/ai-content-automation-app-google-docs-delivery";
const architectureUrl = `${repositoryUrl}/blob/main/docs/ARCHITECTURE.md`;

const intakeFields = [
  { label: "Business context", value: "Offer + niche + audience" },
  { label: "Editorial direction", value: "Voice + themes + platforms" },
  { label: "Operating goal", value: "Cadence + goals + calls to action" },
  { label: "Persistence", value: "Workspace-scoped brief snapshot" },
] as const;

const intakeIcons = [FileText, Sparkles, ShieldCheck, Database] as const;

export default function AiContentAutomationExperiencePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#071326] text-[#f4f6fb] lg:min-h-[calc(100svh-var(--header-height))]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] signal-grid" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-[26%] h-px bg-[#76a6ff]/25" aria-hidden />
        <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col py-8 md:py-11">
          <Reveal className="flex items-center justify-between gap-5">
            <Link href="/experience" className="group inline-flex min-h-11 items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#9bbdff]"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Experience hub</Link>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">04 / Workflow orchestration</p>
          </Reveal>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(25rem,0.92fr)] lg:gap-20 lg:py-16">
            <div>
              <Reveal delay={0.05}><p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#8eb6ff]">AI Content Automation / Engineering experience</p></Reveal>
              <Reveal delay={0.1}><h1 className="mt-7 max-w-5xl text-[clamp(3.25rem,7vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.072em]">The model call is a boundary. The workflow is the product.</h1></Reveal>
              <Reveal delay={0.16}><p className="mt-7 max-w-2xl text-base leading-relaxed text-white/58 md:text-lg">Follow a structured brief through safety checks, instruction assembly, schema-backed generation, persisted review, deterministic exports, and Google Docs delivery preparation.</p></Reveal>
              <Reveal delay={0.2} className="mt-8 border-l-2 border-[#76a6ff] pl-5"><p className="font-medium text-[#dce7ff]">Code and architecture case study — live deployment currently unavailable.</p><p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">Provider-backed generation and Google Docs delivery require separate configuration and are not represented as verified live outcomes.</p></Reveal>
              <Reveal delay={0.24}><a href="#intake" className="group mt-8 inline-flex min-h-12 items-center gap-4 border-b border-white text-sm font-medium transition-colors hover:border-[#76a6ff] hover:text-[#9bbdff]">Enter the workflow studio <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" aria-hidden /></a></Reveal>
            </div>

            <Reveal delay={0.24} className="border border-[#2c426c] bg-[#0a192f] shadow-[0_35px_100px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#2c426c] px-5 py-4"><span className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-white/38">Orchestration summary</span><span className="inline-flex items-center gap-2 font-mono text-[0.54rem] uppercase tracking-[0.12em] text-[#9bbdff]"><span className="size-2 rounded-full bg-[#76a6ff]" aria-hidden /> repository-backed</span></div>
              <ol className="p-5 sm:p-6">
                {["Represent intent", "Constrain transformation", "Persist the result", "Require review", "Prepare delivery"].map((step, index) => <li key={step} className="grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-[#2c426c] py-4 last:border-b-0"><span className="font-mono text-[0.58rem] text-[#76a6ff]">0{index + 1}</span><span className="text-sm font-medium">{step}</span>{index < 4 ? <ArrowDown size={14} className="text-white/28" aria-hidden /> : <Check size={15} className="text-[#76a6ff]" aria-hidden />}</li>)}
              </ol>
              <div className="grid grid-cols-3 border-t border-[#2c426c] text-center"><Metric value="8" label="workflow stations" /><Metric value="5" label="output families" /><Metric value="2" label="Docs auth modes" /></div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="intake" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="01" eyebrow="Workflow intake" title="Useful automation starts by representing intent." description="The repository begins with a typed, workspace-scoped content brief—not a blank chat box. That contract gives every downstream service explicit context." /></Reveal>
          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(25rem,1.2fr)] lg:gap-16">
            <Reveal className="flex flex-col justify-between border-l-2 border-[#2d6cdf] pl-6"><div><Braces className="text-[#2d6cdf]" aria-hidden /><h3 className="mt-7 text-3xl font-medium tracking-[-0.045em]">A brief is an application record.</h3><p className="mt-5 text-base leading-relaxed text-muted">Workspace access is checked server-side. Submitted fields are validated, normalized, and saved with a snapshot before a run can use them.</p></div><p className="mt-10 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">ContentBrief · BriefStatus · WorkspaceMembership</p></Reveal>
            <Reveal className="grid gap-px bg-line sm:grid-cols-2">{intakeFields.map((field, index) => {
              const Icon = intakeIcons[index];
              return <article key={field.label} className="min-h-44 bg-surface p-6"><div className="flex items-start justify-between gap-4"><span className="font-mono text-[0.58rem] text-[#2d6cdf]">0{index + 1}</span><Icon size={19} aria-hidden /></div><p className="mt-10 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-muted">{field.label}</p><h3 className="mt-3 text-xl font-medium tracking-[-0.025em]">{field.value}</h3></article>;
            })}</Reveal>
          </div>
        </Container>
      </section>

      <section id="orchestration" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="02" eyebrow="Orchestration canvas + transformation inspector" title="Each station owns one decision—and one failure boundary." description="Select all eight stations to inspect inputs, work, outputs, failure conditions, ownership, and repository evidence. Then inspect sanitized representative data without triggering a provider request." /></Reveal>
          <div className="mt-14 md:mt-20"><WorkflowStudio /></div>
        </Container>
      </section>

      <section id="review" className="scroll-mt-20 border-y bg-[#dfe9fb] py-20 text-[#101a2c] md:py-32">
        <Container>
          <Reveal><SectionHeading index="03" eyebrow="Review boundary" title="Validation can approve a shape. Only a person can approve the meaning." description="Inspect which decisions can be automatic, which require judgment, which block progress, and which approval state is a recommended production extension rather than current persistence." /></Reveal>
          <div className="mt-14 md:mt-20"><ReviewBoundary /></div>
        </Container>
      </section>

      <section id="delivery" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="04" eyebrow="Google Docs delivery architecture" title="External delivery is a separate, owner-controlled transaction." description="The repository implements authorization, document preparation, Docs and Drive API work, and failure recording. This walkthrough explains that code boundary; it does not simulate a successful live delivery." /></Reveal>
          <div className="mt-14 md:mt-20"><DeliveryBoundary /></div>
          <Reveal><p className="mt-7 max-w-4xl border-l-2 border-[#2d6cdf] pl-5 text-sm leading-relaxed text-muted"><strong className="text-foreground">Verification boundary:</strong> delivery services and automated tests are present in the public repository. OAuth consent, provider credentials, folder permissions, and a successful external document write still require separate live-environment verification.</p></Reveal>
        </Container>
      </section>

      <section id="history" className="scroll-mt-20 border-y bg-surface py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="05" eyebrow="Execution history + recovery" title="A failed boundary should remain inspectable—not become a success animation." description="These clearly labeled synthetic runs show the states supported by the schema and realistic failure points. There are no timers, live traffic, or claimed automatic retries." /></Reveal>
          <div className="mt-14 md:mt-20"><ExecutionHistory /></div>
        </Container>
      </section>

      <section id="decisions" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="06" eyebrow="Engineering decisions" title="The architecture protects work by making transitions explicit." description="Each choice below is tied to repository evidence, its accepted tradeoff, and an operational consequence." /></Reveal>
          <div className="mt-14 border-t md:mt-20">
            {engineeringDecisions.map((item, index) => <Reveal key={item.decision}><article className="grid gap-6 border-b py-8 md:grid-cols-[3rem_minmax(12rem,0.65fr)_minmax(0,1.35fr)] md:gap-9"><span className="font-mono text-[0.6rem] text-[#2d6cdf]">0{index + 1}</span><div><h3 className="text-2xl font-medium tracking-[-0.035em]">{item.decision}</h3><p className="mt-4 font-mono text-[0.57rem] leading-relaxed text-muted">{item.evidence}</p></div><dl className="grid gap-6 sm:grid-cols-2"><div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-[#2d6cdf]">Accepted tradeoff</dt><dd className="mt-3 text-sm leading-relaxed">{item.tradeoff}</dd></div><div><dt className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-muted">Operational consequence</dt><dd className="mt-3 text-sm leading-relaxed text-muted">{item.consequence}</dd></div></dl></article></Reveal>)}
          </div>
        </Container>
      </section>

      <section id="evidence" className="scroll-mt-20 bg-[#071326] py-20 text-[#f4f6fb] md:py-32">
        <Container>
          <Reveal><SectionHeading index="07" eyebrow="Technology evidence" title="The stack is connected to work—not displayed as decoration." description="Every technology below owns an observable application responsibility in the public repository." dark /></Reveal>
          <div className="mt-14 border-t border-white/18 md:mt-20">{technologies.map((technology, index) => <Reveal key={technology.name}><article className="grid gap-4 border-b border-white/14 py-7 sm:grid-cols-[2.5rem_13rem_minmax(0,1fr)] lg:grid-cols-[3rem_15rem_minmax(0,1fr)_14rem] lg:items-baseline lg:gap-8"><span className="font-mono text-[0.58rem] text-[#8eb6ff]">0{index + 1}</span><h3 className="text-xl font-medium">{technology.name}</h3><p className="text-sm leading-relaxed text-white/62">{technology.role}</p><p className="break-words font-mono text-[0.55rem] uppercase tracking-[0.11em] text-white/35 sm:col-start-2 lg:col-start-auto">{technology.evidence}</p></article></Reveal>)}</div>
        </Container>
      </section>

      <section id="reflection" className="scroll-mt-20 border-b py-20 md:py-32">
        <Container>
          <Reveal><SectionHeading index="08" eyebrow="Deployment reality + reflection" title="Production AI automation begins after the response arrives." description="This project demonstrates coordination across tenancy, provider contracts, persistence, review, export, and delivery. Dependable live operation still requires durable background work and verified external configuration." /></Reveal>
          <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.7fr)] lg:gap-20">
            <Reveal><h3 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.045em] md:text-4xl">The most important artifact is not generated copy. It is a workflow that knows when to persist, pause, ask, and fail honestly.</h3><p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">Before a live release, I would move generation into a durable worker, add explicit approval records, verify OAuth reconnect and revoke behavior, configure transactional email, exercise provider failure paths against disposable infrastructure, and establish operational monitoring.</p><div className="mt-9 flex flex-wrap gap-6"><a href={repositoryUrl} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-3 border-b border-foreground text-sm font-medium transition-colors hover:border-[#2d6cdf] hover:text-[#2d6cdf]">Public repository <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></a><a href={architectureUrl} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-3 text-sm font-medium text-muted transition-colors hover:text-[#2d6cdf]">Architecture documentation <ArrowUpRight size={16} aria-hidden /></a></div></Reveal>
            <Reveal><p className="font-mono text-[0.59rem] uppercase tracking-[0.16em] text-[#2d6cdf]">Honest limitations</p><ul className="mt-5 border-t">{limitations.map((limitation) => <li key={limitation} className="grid grid-cols-[1.5rem_1fr] gap-3 border-b py-5 text-sm leading-relaxed text-muted"><span className="font-mono text-[0.56rem] text-[#2d6cdf]">—</span>{limitation}</li>)}</ul></Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-[#2d6cdf] py-20 text-white md:py-28">
        <Container className="grid gap-10 md:grid-cols-[9rem_1fr] md:gap-12">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/62">Current status</p>
          <div><h2 className="max-w-5xl text-balance text-4xl font-medium leading-tight tracking-[-0.055em] sm:text-5xl md:text-7xl">Code and architecture case study — live deployment currently unavailable.</h2><p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70">The repository proves the application boundaries. A live environment must still prove the providers, persistence, authentication email, and operating model together.</p><div className="mt-9 flex flex-wrap gap-7"><Link href="/experience" className="inline-flex min-h-12 items-center border-b border-white text-sm font-medium">Experience hub</Link><Link href="#orchestration" className="inline-flex min-h-12 items-center gap-2 text-sm font-medium">Reopen the workflow <ArrowUpRight size={17} aria-hidden /></Link></div></div>
        </Container>
      </section>
    </>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="border-r border-[#2c426c] px-2 py-4 last:border-r-0"><strong className="block text-xl font-medium">{value}</strong><span className="mt-1 block font-mono text-[0.48rem] uppercase tracking-[0.1em] text-white/38">{label}</span></div>;
}

function SectionHeading({ index, eyebrow, title, description, dark = false }: { index: string; eyebrow: string; title: string; description: string; dark?: boolean }) {
  return <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-12"><p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-white/35" : "font-mono text-xs uppercase tracking-[0.2em] text-muted"}>{index} / 08</p><div><p className={dark ? "font-mono text-xs uppercase tracking-[0.2em] text-[#8eb6ff]" : "font-mono text-xs uppercase tracking-[0.2em] text-[#2d6cdf]"}>{eyebrow}</p><h2 className="mt-5 max-w-5xl text-balance text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl">{title}</h2><p className={dark ? "mt-6 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg" : "mt-6 max-w-3xl text-base leading-relaxed text-muted md:text-lg"}>{description}</p></div></div>;
}
