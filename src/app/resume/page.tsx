import type { Metadata } from "next";
import { PageIntro } from "@/components/content/page-intro";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = { title: "Resume", description: "Professional experience and capabilities of Caleb Rogers.", alternates: { canonical: "/resume" } };

const capabilities = ["Product-minded engineering", "Full-stack systems", "Workflow automation", "Applied AI", "Interface architecture", "Production delivery"];

export default function ResumePage() {
  return <><PageIntro eyebrow="Resume" title="Building useful systems, end to end." description="A concise view of the capabilities behind the work." /><section className="py-20 md:py-28"><Container><div className="grid border-t md:grid-cols-2">{capabilities.map((item, index) => <div key={item} className="flex min-h-24 items-center gap-6 border-b py-5 md:odd:border-r md:odd:pr-8 md:even:pl-8"><span className="font-mono text-xs text-muted">0{index + 1}</span><h2 className="text-xl font-medium tracking-[-0.025em]">{item}</h2></div>)}</div><ArrowLink href="/contact" className="mt-10">Request full resume</ArrowLink></Container></section></>;
}

