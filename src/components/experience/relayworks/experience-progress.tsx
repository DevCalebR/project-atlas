"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { relayworksProgress } from "@/lib/relayworks";
import { cn } from "@/lib/utils";

export function ExperienceProgress() {
  const [activeId, setActiveId] = useState<(typeof relayworksProgress)[number]["id"]>("problem");
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = relayworksProgress
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
        const activeSection = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= marker) ?? sections[0];
        setActiveId(activeSection.id as (typeof relayworksProgress)[number]["id"]);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const activeLink = linkRefs.current[activeId];
    if (!track || !activeLink || track.scrollWidth <= track.clientWidth) return;

    const gutter = 20;
    const visibleLeft = track.scrollLeft;
    const visibleRight = visibleLeft + track.clientWidth;
    const linkLeft = activeLink.offsetLeft;
    const linkRight = linkLeft + activeLink.offsetWidth;
    let nextLeft = visibleLeft;

    if (linkLeft < visibleLeft + gutter) nextLeft = linkLeft - gutter;
    else if (linkRight > visibleRight - gutter) nextLeft = linkRight - track.clientWidth + gutter;

    if (nextLeft !== visibleLeft) {
      track.scrollTo({ left: Math.max(0, nextLeft), behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [activeId, reduceMotion]);

  return (
    <nav ref={navRef} aria-label="RelayWorks experience progress" className="sticky top-[var(--header-height)] z-40 border-b bg-background/95 backdrop-blur-xl">
      <div ref={trackRef} className="mx-auto flex max-w-[90rem] overflow-x-auto px-5 md:px-10">
        {relayworksProgress.map((step, index) => {
          const active = step.id === activeId;
          return (
            <a
              key={step.id}
              ref={(node) => { linkRefs.current[step.id] = node; }}
              href={`#${step.id}`}
              onClick={() => setActiveId(step.id)}
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
