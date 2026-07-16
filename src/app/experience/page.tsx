import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ExperienceSelector } from "@/components/experience/experience-selector";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Experience Production Software",
  description: "Choose a real software system and explore how Caleb Rogers designed, built, and engineered it.",
  alternates: { canonical: "/experience" },
};

const domains = [
  { index: "01", name: "AI Applications", description: "Structured AI workflows that turn inputs into useful artifacts.", projects: ["RelayWorks", "AI Content Automation"], href: "/experience/relayworks" },
  { index: "02", name: "Backend Systems", description: "Application logic, background work, validation, and processing boundaries.", projects: ["RelayWorks", "Webhook Dashboard"], href: "/experience/relayworks" },
  { index: "03", name: "Workflow Automation", description: "Multi-step systems that move work forward with less manual intervention.", projects: ["CallbackCloser", "AI Content Automation"], href: "/experience/callbackcloser" },
  { index: "04", name: "Developer Tools", description: "Interfaces that make technical systems easier to inspect and operate.", projects: ["Webhook Dashboard"], href: "/experience/webhook-dashboard" },
  { index: "05", name: "API Integrations", description: "Clear boundaries between external events, application logic, and outcomes.", projects: ["CallbackCloser", "Webhook Dashboard"], href: "/experience/webhook-dashboard" },
  { index: "06", name: "Full-Stack Applications", description: "Connected interfaces and services designed as one maintainable system.", projects: ["CallbackCloser", "Portfolio Dashboard"], href: "/experience/portfolio-dashboard" },
] as const;

export default function ExperiencePage() {
  return (
    <>
      <section className="relative min-h-[calc(82svh-var(--header-height))] overflow-hidden border-b">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative flex min-h-[calc(82svh-var(--header-height))] flex-col justify-between py-10 md:py-14">
          <Reveal className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"><span className="size-2 rounded-full bg-accent" aria-hidden /> Engineering exhibition</p>
            <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted sm:block">05 real systems / Select to inspect</p>
          </Reveal>

          <div className="py-16 md:py-24">
            <Reveal delay={0.06}><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Caleb Rogers · Experience hub</p></Reveal>
            <Reveal delay={0.12}><h1 className="mt-6 max-w-6xl text-balance text-[clamp(3.7rem,9vw,9rem)] font-medium leading-[0.86] tracking-[-0.075em]">Experience<br /><span className="text-muted">Production Software</span></h1></Reveal>
            <Reveal delay={0.2}><p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">Choose a real software system and explore how it was designed, built, and engineered.</p></Reveal>
          </div>

          <Reveal delay={0.26} className="flex items-end justify-between gap-5">
            <a href="#experience-selector" className="group inline-flex min-h-12 items-center gap-4 border-b border-foreground text-sm font-medium transition-colors hover:border-accent hover:text-accent">Choose a system <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" aria-hidden /></a>
            <p className="max-w-xs text-right text-xs leading-relaxed text-muted">Architecture, workflow, and product decisions—presented as systems you can enter.</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b py-16 md:py-24">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">The premise</p>
            <p className="max-w-4xl text-balance text-2xl font-medium leading-snug tracking-[-0.035em] sm:text-3xl md:text-4xl">Every experience is grounded in real software and genuine architecture decisions. Nothing here is fictional.</p>
          </Reveal>
        </Container>
      </section>

      <section id="experience-selector" className="scroll-mt-20 py-20 md:py-32">
        <Container>
          <Reveal className="grid gap-6 border-b pb-10 md:grid-cols-[8rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">01 / Select</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Interactive experience selector</p>
              <h2 className="mt-5 max-w-4xl text-balance text-4xl font-medium tracking-[-0.05em] sm:text-5xl md:text-6xl">Choose the system you want to step inside.</h2>
            </div>
          </Reveal>
          <div className="mt-12 md:mt-16"><ExperienceSelector /></div>
        </Container>
      </section>

      <section className="border-y bg-surface py-20 md:py-32">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">02 / Domains</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Engineering domains</p>
              <h2 className="mt-5 max-w-4xl text-balance text-4xl font-medium tracking-[-0.05em] sm:text-5xl md:text-6xl">Capabilities, connected to the systems that demonstrate them.</h2>
            </div>
          </Reveal>

          <div className="mt-14 grid border-t lg:ml-[11rem] lg:grid-cols-2">
            {domains.map((domain, index) => (
              <Reveal key={domain.name} className={cnDomain(index)}>
                <Link href={domain.href} className="group flex min-h-64 flex-col justify-between p-6 transition-colors hover:bg-background md:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-mono text-xs text-muted">{domain.index}</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">{domain.name}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{domain.description}</p>
                    <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{domain.projects.join(" / ")}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#121314] py-24 text-[#f4f1ea] md:py-36">
        <Container>
          <Reveal className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">03 / Continue</p>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff654d]">Continue exploring</p>
              <h2 className="mt-6 max-w-5xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-8xl">Start with the system that makes you curious.</h2>
              <ArrowLink href="/experience/relayworks" className="mt-10 border-[#f4f1ea] text-[#f4f1ea] hover:border-[#ff654d] hover:text-[#ff654d]">Enter RelayWorks</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function cnDomain(index: number) {
  return `border-b ${index % 2 === 0 ? "lg:border-r" : ""}`;
}
