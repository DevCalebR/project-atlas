"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      dialogRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      menuButtonRef.current?.focus();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("a, button:not([disabled])");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between px-5 md:px-10">
        <Link href="/" className="relative z-[60] py-2 text-base font-medium tracking-[-0.02em]" aria-label="Caleb Rogers, home">Caleb Rogers<span className="text-accent">.</span></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href === "/experience" && pathname.startsWith("/experience/"));
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className="relative px-4 py-3 text-sm text-muted transition-colors hover:text-foreground">{item.label}{active && <motion.span layoutId="nav-active" className="absolute inset-x-4 bottom-1 h-px bg-accent" />}</Link>;
          })}
          <ThemeToggle />
        </nav>
        <button ref={menuButtonRef} type="button" className="relative z-[60] grid size-11 place-items-center md:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X aria-hidden /> : <Menu aria-hidden />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div ref={dialogRef} onKeyDown={handleDialogKeyDown} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-x-0 top-[var(--header-height)] z-40 h-[calc(100svh-var(--header-height))] bg-background px-5 py-8 md:hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35 }}>
            <nav aria-label="Mobile navigation" className="flex h-full flex-col">
              {navigation.map((item, index) => {
                const active = pathname === item.href || (item.href === "/experience" && pathname.startsWith("/experience/"));
                return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between border-b text-3xl font-medium tracking-[-0.04em]"><span>{item.label}</span><span className="font-mono text-xs text-muted">0{index + 1}</span></Link>;
              })}
              <div className="mt-auto flex items-center justify-between border-t pt-5"><span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Appearance</span><ThemeToggle /></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
