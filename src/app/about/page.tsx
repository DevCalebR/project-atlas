import type { Metadata } from "next";
import { PageIntro } from "@/components/content/page-intro";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = { title: "About", description: "About Caleb Rogers and his approach to software engineering.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <><PageIntro eyebrow="About" title="I build software from the system outward." description="My work sits between product thinking, technical architecture, and the discipline required to deliver." /><section className="py-20 md:py-32"><Container className="grid gap-12 md:grid-cols-[1fr_2fr]"><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">How I work</p><div className="max-w-3xl space-y-8 text-2xl leading-snug tracking-[-0.025em] md:text-4xl"><p>Start with the real constraint. Make the behavior legible. Build the smallest durable system that solves it.</p><p className="text-muted">That approach shapes everything from interface details to deployment decisions.</p><ArrowLink href="/contact">Work with me</ArrowLink></div></Container></section></>;
}

