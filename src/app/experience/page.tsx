import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/content/page-intro";
import { Container } from "@/components/ui/container";
import { experiences } from "@/lib/site";

export const metadata: Metadata = { title: "Experience", description: "Explore software systems designed and built by Caleb Rogers.", alternates: { canonical: "/experience" } };

export default function ExperiencePage() {
  return <><PageIntro eyebrow="Experience index" title="Software you can explore, not just read about." description="Each experience will open a real system—its decisions, constraints, and working parts. The first releases are now being prepared." /><section className="py-14 md:py-24"><Container>{experiences.map((item) => <Link key={item.slug} href={`/experience/${item.slug}`} className="group grid min-h-36 items-center gap-4 border-b py-8 sm:grid-cols-[4rem_1fr_auto]"><span className="font-mono text-xs text-muted">{item.index}</span><div><h2 className="text-3xl font-medium tracking-[-0.04em] md:text-5xl">{item.name}</h2><p className="mt-2 text-sm text-muted">{item.discipline}</p></div><ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" aria-hidden /></Link>)}</Container></section></>;
}

