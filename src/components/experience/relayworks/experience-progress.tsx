"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { relayworksProgress } from "@/lib/relayworks";
import { cn } from "@/lib/utils";

export function ExperienceProgress() {
  const [activeId, setActiveId] = useState<(typeof relayworksProgress)[number]["id"]>("problem");

  useEffect(() => {
    const sections = relayworksProgress
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id as (typeof relayworksProgress)[number]["id"]);
      },
      { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="RelayWorks experience progress" className="sticky top-[var(--header-height)] z-40 border-b bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[90rem] overflow-x-auto px-5 md:px-10">
        {relayworksProgress.map((step, index) => {
          const active = step.id === activeId;
          return (
            <a
              key={step.id}
              href={`#${step.id}`}
              aria-current={active ? "step" : undefined}
              className={cn("relative flex min-h-14 shrink-0 items-center gap-3 px-4 text-xs transition-colors first:pl-0 md:min-h-16", active ? "text-foreground" : "text-muted hover:text-foreground")}
            >
              <span className="font-mono text-[0.6rem]">0{index + 1}</span>
              <span>{step.label}</span>
              {active && <motion.span layoutId="relayworks-progress" className="absolute inset-x-4 bottom-0 h-0.5 bg-accent first:left-0" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
