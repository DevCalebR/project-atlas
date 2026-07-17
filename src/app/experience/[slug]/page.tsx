import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock3 } from "lucide-react";
import { PageIntro } from "@/components/content/page-intro";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { experiences } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return experiences.filter(({ slug }) => !["relayworks", "callbackcloser"].includes(slug)).map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) return {};
  return { title: experience.name, description: `${experience.name} interactive engineering experience by Caleb Rogers.`, alternates: { canonical: `/experience/${slug}` } };
}

export default async function ExperiencePlaceholder({ params }: Props) {
  const { slug } = await params;
  const experience = experiences.find((item) => item.slug === slug);
  if (!experience) notFound();
  return <><PageIntro eyebrow={`${experience.index} / ${experience.discipline}`} title={experience.name} description="This interactive engineering experience is currently being assembled." /><section className="py-20 md:py-28"><Container className="grid gap-12 md:grid-cols-2"><div><Clock3 className="text-accent" aria-hidden /><h2 className="mt-6 text-3xl font-medium tracking-[-0.04em]">The signal is coming online.</h2></div><div className="max-w-lg"><p className="text-lg leading-relaxed text-muted">The finished experience will reveal the architecture, tradeoffs, and product thinking behind this system. For now, the route and presentation framework are ready.</p><ArrowLink href="/experience" className="mt-8">Return to experience index</ArrowLink></div></Container></section></>;
}
