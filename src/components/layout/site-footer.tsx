import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return <footer className="border-t py-8"><Container className="flex flex-col gap-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Caleb Rogers</p><div className="flex gap-6"><Link href="/contact" className="inline-flex items-center gap-1 hover:text-foreground">Start a conversation <ArrowUpRight size={14} aria-hidden /></Link><a href="#main-content" className="hover:text-foreground">Back to top</a></div></Container></footer>;
}

