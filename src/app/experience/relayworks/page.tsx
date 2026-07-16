import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ChevronDown } from "lucide-react";
import { ArchitectureExplorer } from "@/components/experience/relayworks/architecture-explorer";
import { DocumentPipeline } from "@/components/experience/relayworks/document-pipeline";
import { ExperienceProgress } from "@/components/experience/relayworks/experience-progress";
import { OutputInspector } from "@/components/experience/relayworks/output-inspector";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { relayworksDecisions } from "@/lib/relayworks";

export const metadata: Metadata = {
  title: "RelayWorks Engineering Experience",
  description: "Follow a real PDF through RelayWorks job handling, parsing, transformation, export, and packaging.",
  alternates: { canonical: "/experience/relayworks" },
};

const problemParts = [
  { index: "01", title: "Ingestion", detail: "PDF validation, bounded uploads, filenames, and local storage." },
  { index: "02", title: "Long-running work", detail: "A conversion can outlive a practical HTTP request and still needs honest status." },
  { index: "03", title: "Useful structure", detail: "Parser output must become reviewable Markdown, HTML, JSON, text, and goal-oriented content." },
  { index: "04", title: "Handoff", detail: "Images, reports, and generated files need predictable names, downloads, and one complete package." },
] as const;

const reflections = [
  {
    label: "What surprised me",
    title: "A completed parse is not the same as a perfect parse.",
    detail: "The real sample completed successfully, but its extracted text still contains spelling artifacts and its table structure needs review. Honest output inspection matters as much as job success.",
  },
  {
    label: "What held up",
    title: "One normalized document can support many downstream forms.",
    detail: "Markdown, HTML, JSON, text, goal output, and the report all come from the same parse. That keeps the artifacts related and avoids paying the parsing cost repeatedly.",
  },
  {
    label: "What I would redesign",
    title: "The job layer would change before the parser did.",
    detail: "For multiple machines or resumable work, the JSON job store and local thread worker would need to become a durable queue plus database-backed state. The current version deliberately favors inspectability on one machine.",
  },
  {
    label: "Operational lesson",
    title: "Installation is part of the architecture.",
    detail: "Marker runs as a separately installed CLI. Python, Node.js, filesystem permissions, timeouts, and process recovery are not setup trivia—they shape whether the workflow is dependable.",
  },
  {
    label: "Next improvements",
    title: "Broader validation before broader claims.",
    detail: "The next useful work is testing more representative PDFs, improving OCR and complex-layout handling, defining retention cleanup, and making interrupted work resumable—not adding decorative features.",
  },
] as const;

export default function RelayWorksExperiencePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-[#121314] text-[#f4f1ea]">
        <div className="signal-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-between py-9 md:py-12">
          <Reveal className="flex items-center justify-between gap-5">
            <Link href="/experience" className="group inline-flex min-h-11 items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#f4f1ea]/60 transition-colors hover:text-[#ff654d]"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Experience hub</Link>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#f4f1ea]/50">01 / Flagship system</p>
          </Reveal>

          <div className="py-14 md:py-20">
            <Reveal delay={0.06}><p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff654d]">Document processing / Engineering experience</p></Reveal>
            <Reveal delay={0.12}><h1 className="mt-6 text-[clamp(4.8rem,14vw,13rem)] font-medium leading-[0.78] tracking-[-0.08em]">RelayWorks</h1></Reveal>
            <Reveal delay={0.18} className="mt-10 grid gap-7 border-t border-white/20 pt-7 md:grid-cols-[1fr_1fr] md:gap-16">
              <h2 className="max-w-xl text-balance text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl md:text-5xl">Inside a local PDF-to-output pipeline.</h2>
              <p className="max-w-xl text-base leading-relaxed text-[#f4f1ea]/65 md:text-lg">Follow one real document through job handling, parsing, transformation, export, and packaging. Every result shown below comes from a local RelayWorks run.</p>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="flex flex-wrap items-end justify-between gap-8">
            <a href="#problem" className="group inline-flex min-h-12 items-center gap-4 border-b border-[#f4f1ea] text-sm font-medium transition-colors hover:border-[#ff654d] hover:text-[#ff654d]">Begin walkthrough <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" aria-hidden /></a>
            <dl className="grid grid-cols-3 gap-7 text-right">
              <div><dt className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#f4f1ea]/45">Sample</dt><dd className="mt-2 text-sm">5 pages</dd></div>
              <div><dt className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#f4f1ea]/45">Runtime</dt><dd className="mt-2 text-sm">120.76s</dd></div>
              <div><dt className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#f4f1ea]/45">Images</dt><dd className="mt-2 text-sm">3 extracted</dd></div>
            </dl>
          </Reveal>
        </Container>
      </section>

      <ExperienceProgress />

      <section id="problem" className="scroll-mt-36 border-b py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="01 / 06" eyebrow="The problem" title="The parser was only one part of the system." description="Turning a PDF into useful artifacts required coordination across upload handling, long-running work, normalization, review, and packaging." /></Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <Reveal>
              <p className="max-w-md text-2xl font-medium leading-snug tracking-[-0.035em]">Document-heavy AI work repeatedly starts with the same glue code before any retrieval or model workflow can begin.</p>
              <div className="mt-10 border-l-2 border-accent pl-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">Observed constraint</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">A real five-page NIST sample spent 120.76 seconds in conversion. The interface could not treat that work like a quick form submission.</p>
              </div>
            </Reveal>
            <div className="border-t">
              {problemParts.map((part) => (
                <Reveal key={part.title}>
                  <article className="grid gap-4 border-b py-7 sm:grid-cols-[3rem_12rem_1fr] sm:items-baseline sm:gap-6">
                    <span className="font-mono text-[0.62rem] text-muted">{part.index}</span>
                    <h3 className="text-lg font-medium">{part.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{part.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="pipeline" className="scroll-mt-36 border-b bg-surface py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="02 / 06" eyebrow="Follow a document" title="Watch the request become a package." description="Run the representative sequence, then select any stage to inspect the work and the observable signal behind it." /></Reveal>
          <div className="mt-14 md:mt-20"><DocumentPipeline /></div>
        </Container>
      </section>

      <section id="architecture" className="scroll-mt-36 border-b py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="03 / 06" eyebrow="Architecture" title="Every boundary has a job—and a cost." description="Select a node to inspect its responsibility, why it exists, the nearby alternative, and the tradeoff the implementation accepts." /></Reveal>
          <div className="mt-14 md:mt-20"><ArchitectureExplorer /></div>
        </Container>
      </section>

      <section id="decisions" className="scroll-mt-36 border-b bg-surface py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="04 / 06" eyebrow="Engineering decisions" title="The reasoning lives beside the code." description="These choices are visible in the current implementation, its history, and its documented limitations." /></Reveal>
          <div className="mt-14 border-t lg:ml-[11rem]">
            {relayworksDecisions.map((decision, index) => (
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

      <section id="results" className="scroll-mt-36 border-b py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="05 / 06" eyebrow="Inspect outputs" title="One parse. Multiple ways to use it." description="Explore sanitized excerpts and extracted images from the real five-page sample package." /></Reveal>
          <div className="mt-14 md:mt-20"><OutputInspector /></div>
        </Container>
      </section>

      <section id="reflection" className="scroll-mt-36 py-20 md:py-32">
        <Container>
          <Reveal><ExperienceHeading index="06 / 06" eyebrow="Reflection" title="What the implementation taught me." description="The useful lessons are in the gaps between a working local kit and a system ready for broader operating conditions." /></Reveal>
          <div className="mt-14 border-t lg:ml-[11rem]">
            {reflections.map((reflection, index) => (
              <Reveal key={reflection.label}>
                <article className="grid gap-5 border-b py-8 md:grid-cols-[3rem_0.65fr_1.35fr] md:gap-8 md:py-10">
                  <span className="font-mono text-[0.62rem] text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <div><p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">{reflection.label}</p><h3 className="mt-3 text-xl font-medium tracking-[-0.025em] md:text-2xl">{reflection.title}</h3></div>
                  <p className="text-sm leading-relaxed text-muted md:text-base">{reflection.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t bg-[#121314] py-20 text-[#f4f1ea] md:py-28">
        <Container className="grid gap-10 md:grid-cols-[8rem_1fr] md:gap-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f4f1ea]/50">Walkthrough complete</p>
          <div>
            <h2 className="max-w-4xl text-balance text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-5xl md:text-6xl">Return to the exhibition and choose the next system.</h2>
            <ArrowLink href="/experience" className="mt-9 border-[#f4f1ea] text-[#f4f1ea] hover:border-[#ff654d] hover:text-[#ff654d]">Experience hub</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function ExperienceHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-[8rem_1fr] md:gap-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{index}</p>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mt-5 max-w-5xl text-balance text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-7xl">{title}</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
      </div>
    </div>
  );
}
