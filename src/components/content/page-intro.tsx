import { Container } from "@/components/ui/container";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="border-b py-20 md:py-32"><Container><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p><h1 className="mt-6 max-w-5xl text-balance text-5xl font-medium leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{description}</p></Container></section>;
}

