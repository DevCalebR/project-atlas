import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { experiences } from "@/lib/site";

export const metadata: Metadata = { title: "Caleb Rogers — Software Engineer", alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden border-b">
        <div className="signal-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-between py-10 md:py-14">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"><span className="size-2 rounded-full bg-accent" aria-hidden /> Software engineer / Product builder</div>
          <div className="max-w-[74rem] py-16">
            <Reveal><p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-accent">Design · Systems · Delivery</p></Reveal>
            <Reveal delay={0.08}><h1 className="text-balance text-[clamp(3.5rem,10.5vw,10rem)] font-medium leading-[0.82] tracking-[-0.075em]">Engineering,<br /><span className="text-muted">made tangible.</span></h1></Reveal>
            <Reveal delay={0.16}><p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:ml-[34%] md:text-xl">I design and ship thoughtful software systems—built to work clearly, scale confidently, and earn trust.</p></Reveal>
          </div>
          <div className="flex items-end justify-between"><ArrowLink href="/experience">Explore the work</ArrowLink><a href="#selected-work" aria-label="Scroll to selected work" className="hidden size-12 place-items-center rounded-full border text-muted transition-colors hover:border-accent hover:text-accent sm:grid"><ArrowDown size={18} aria-hidden /></a></div>
        </Container>
      </section>

      <section id="selected-work" className="py-24 md:py-36">
        <Container>
          <Reveal className="grid gap-8 border-b pb-10 md:grid-cols-2"><h2 className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">Selected systems</h2><p className="max-w-md self-end text-lg leading-relaxed text-muted md:justify-self-end">Interactive project stories are being assembled. The systems below will soon be open for exploration.</p></Reveal>
          <div>
            {experiences.slice(0, 3).map((experience) => (
              <Reveal key={experience.slug}>
                <a href={`/experience/${experience.slug}`} className="group grid min-h-32 items-center gap-4 border-b py-6 transition-colors hover:text-accent sm:grid-cols-[4rem_1fr_auto]">
                  <span className="font-mono text-xs text-muted">{experience.index}</span>
                  <span className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">{experience.name}</span>
                  <span className="text-sm text-muted group-hover:text-accent">{experience.discipline}</span>
                </a>
              </Reveal>
            ))}
          </div>
          <ArrowLink href="/experience" className="mt-10">View all experiences</ArrowLink>
        </Container>
      </section>

      <section className="border-t bg-surface py-24 md:py-36">
        <Container><Reveal><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Working principles</p><div className="mt-8 grid gap-8 md:grid-cols-3"><Principle number="01" title="Clarity before cleverness" /><Principle number="02" title="Systems over patches" /><Principle number="03" title="Ship, learn, refine" /></div></Reveal></Container>
      </section>

      <section className="py-24 md:py-40"><Container><Reveal><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Have a hard problem?</p><h2 className="mt-6 max-w-4xl text-balance text-5xl font-medium leading-[0.96] tracking-[-0.06em] md:text-8xl">Let’s make the complex feel inevitable.</h2><ArrowLink href="/contact" className="mt-10">Start a conversation</ArrowLink></Reveal></Container></section>
    </>
  );
}

function Principle({ number, title }: { number: string; title: string }) {
  return <div className="border-t pt-5"><span className="font-mono text-xs text-muted">{number}</span><h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{title}</h3></div>;
}

