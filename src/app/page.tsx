import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ArchitectureMap } from "@/components/landing/architecture-map";
import { SectionHeading } from "@/components/landing/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Caleb Rogers — Software Engineer",
  description: "Explore the production software, engineering decisions, and real systems built by Caleb Rogers.",
  alternates: { canonical: "/" },
};

const principles = [
  { number: "01", title: "Build things that last.", detail: "Choose foundations that make the next change easier, not harder." },
  { number: "02", title: "Automate the repeatable.", detail: "Save human attention for the decisions that actually need it." },
  { number: "03", title: "Prefer clarity over cleverness.", detail: "The best system is one another person can understand and trust." },
  { number: "04", title: "Ship, then sharpen.", detail: "Real feedback improves software faster than endless speculation." },
] as const;

const evidence = [
  { capability: "Python", usedIn: ["RelayWorks", "CallbackCloser", "Webhook Dashboard"] },
  { capability: "FastAPI", usedIn: ["REST APIs", "Background jobs", "File processing", "Authentication"] },
  { capability: "Next.js", usedIn: ["Interactive interfaces", "Server-rendered applications", "API-connected experiences"] },
  { capability: "Automation", usedIn: ["Document processing", "Webhook workflows", "AI content pipelines"] },
] as const;

const domains = [
  { number: "01", title: "AI Applications", href: "/experience/ai-content-automation" },
  { number: "02", title: "Backend Systems", href: "/experience/relayworks" },
  { number: "03", title: "Workflow Automation", href: "/experience/callbackcloser" },
  { number: "04", title: "API Integrations", href: "/experience/webhook-dashboard" },
  { number: "05", title: "Developer Tools", href: "/experience/webhook-dashboard" },
  { number: "06", title: "Full-Stack Applications", href: "/experience/portfolio-dashboard" },
] as const;

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden border-b">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative grid min-h-[calc(100svh-var(--header-height))] gap-14 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.75fr)] lg:items-center lg:gap-20 lg:py-14">
          <div className="flex min-h-[33rem] flex-col justify-between lg:min-h-[36rem]">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"><span className="size-2 rounded-full bg-accent" aria-hidden /> Production software / Real systems</p>
            </Reveal>
            <div className="py-12 lg:py-8">
              <Reveal delay={0.06}><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Caleb Rogers · Software Engineer</p></Reveal>
              <Reveal delay={0.12}><h1 className="mt-5 max-w-4xl text-balance text-[clamp(3.75rem,7.2vw,7.75rem)] font-medium leading-[0.87] tracking-[-0.07em]">Production software.<br /><span className="text-muted">Built as a system.</span></h1></Reveal>
              <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">I design and ship interfaces, APIs, automations, and AI workflows—with each part built to make the whole more reliable.</p></Reveal>
            </div>
            <Reveal delay={0.26} className="flex items-end justify-between">
              <ArrowLink href="/experience">Explore My Engineering</ArrowLink>
              <a href="#principles" aria-label="Continue to engineering philosophy" className="hidden size-12 place-items-center rounded-full border text-muted transition-colors hover:border-accent hover:text-accent sm:grid"><ArrowDown size={18} aria-hidden /></a>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="self-stretch lg:py-4"><ArchitectureMap /></Reveal>
        </Container>
      </section>

      <section id="principles" className="scroll-mt-24 py-24 md:py-36">
        <Container>
          <Reveal><SectionHeading index="01 / 04" eyebrow="Engineering philosophy" title="The decisions behind the code." description="Principles earned by building, debugging, and maintaining real software." /></Reveal>
          <div className="mt-4 md:ml-[11rem]">
            {principles.map((principle) => (
              <Reveal key={principle.number}>
                <article className="grid gap-4 border-b py-8 md:grid-cols-[4rem_1fr_1fr] md:items-baseline md:gap-8 md:py-10">
                  <span className="font-mono text-xs text-muted">{principle.number}</span>
                  <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">{principle.title}</h3>
                  <p className="max-w-md leading-relaxed text-muted">{principle.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y bg-surface py-24 md:py-36">
        <Container>
          <Reveal><SectionHeading index="02 / 04" eyebrow="What I’ve actually built" title="Capability, connected to evidence." description="Technologies matter because of what they make possible. Here is where each one shows up in the work." /></Reveal>
          <div className="md:ml-[11rem]">
            {evidence.map((item) => (
              <Reveal key={item.capability}>
                <article className="grid gap-6 border-b py-9 md:grid-cols-[minmax(12rem,0.65fr)_1.35fr] md:py-12">
                  <h3 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">{item.capability}</h3>
                  <div><p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">Used in</p><ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2" aria-label={`${item.capability} evidence`}>{item.usedIn.map((use, index) => <li key={use} className="text-base text-muted"><span>{use}</span>{index < item.usedIn.length - 1 && <span className="ml-2 text-line" aria-hidden>/</span>}</li>)}</ul></div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-36">
        <Container>
          <Reveal><SectionHeading index="03 / 04" eyebrow="Featured engineering domains" title="Different problems. One systems mindset." description="Each domain opens into a working project, its architecture, and the reasoning behind it." /></Reveal>
          <nav aria-label="Engineering domains" className="mt-4 md:ml-[11rem]">
            {domains.map((domain) => (
              <Reveal key={domain.title}>
                <Link href={domain.href} className="group grid min-h-24 grid-cols-[3rem_1fr_auto] items-center gap-3 border-b transition-colors hover:text-accent md:min-h-28 md:grid-cols-[5rem_1fr_auto]">
                  <span className="font-mono text-xs text-muted">{domain.number}</span>
                  <span className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl md:text-4xl">{domain.title}</span>
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </nav>
        </Container>
      </section>

      <section className="border-t bg-[#121314] py-24 text-[#f4f1ea] md:py-40">
        <Container>
          <Reveal className="grid gap-12 md:grid-cols-[8rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">04 / 04</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff654d]">Experience my work</p>
              <h2 className="mt-6 max-w-5xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-8xl">The interface is the invitation. The engineering is underneath.</h2>
              <ArrowLink href="/experience" className="mt-10 border-[#f4f1ea] text-[#f4f1ea] hover:border-[#ff654d] hover:text-[#ff654d]">See How I Build</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
