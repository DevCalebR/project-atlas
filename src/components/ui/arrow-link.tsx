import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <Link href={href} className={cn("group inline-flex min-h-12 items-center gap-3 border-b border-foreground text-sm font-medium transition-colors hover:border-accent hover:text-accent", className)}>{children}<ArrowUpRight size={18} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>;
}

