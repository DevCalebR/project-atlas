import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageIntro } from "@/components/content/page-intro";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with software engineer Caleb Rogers.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <><PageIntro eyebrow="Contact" title="Bring the hard problem." description="If you’re building something that needs clarity, strong systems, and thoughtful execution, I’d like to hear about it." /><section className="py-20 md:py-32"><Container><a href="mailto:hello@calebrogers.dev" className="group flex min-h-28 items-center justify-between border-y text-xl font-medium tracking-[-0.02em] transition-colors hover:text-accent sm:text-3xl"><span>hello@calebrogers.dev</span><Mail className="transition-transform group-hover:-translate-y-1" aria-hidden /></a><p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">Typical response within two business days</p></Container></section></>;
}

