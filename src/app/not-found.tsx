import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="mx-auto flex min-h-[calc(100svh-var(--header-height))] max-w-[90rem] items-center px-5 md:px-10"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">404 / Off grid</p><h1 className="mt-5 text-6xl font-medium tracking-[-0.06em] md:text-8xl">No signal here.</h1><Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 border-b border-foreground text-sm font-medium hover:text-accent"><ArrowLeft aria-hidden size={18} /> Return home</Link></div></section>;
}

