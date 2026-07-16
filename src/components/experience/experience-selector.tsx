"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { useState } from "react";
import { experienceHubItems } from "@/lib/experience-hub";
import { cn } from "@/lib/utils";

export function ExperienceSelector() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const visibleIndex = previewIndex ?? selectedIndex;
  const visibleExperience = experienceHubItems[visibleIndex];
  const isPreviewing = previewIndex !== null && previewIndex !== selectedIndex;

  function selectExperience(index: number) {
    setSelectedIndex(index);
    setPreviewIndex(null);
  }

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(21rem,0.82fr)_minmax(0,1.18fr)] lg:gap-16 xl:gap-24">
      <div role="group" aria-label="Select an engineering experience">
        <div className="flex items-center justify-between border-b pb-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          <span>Exhibition index</span>
          <span>05 systems</span>
        </div>

        {experienceHubItems.map((experience, index) => {
          const isSelected = selectedIndex === index;
          const isPreviewed = previewIndex === index && !isSelected;

          return (
            <div
              key={experience.slug}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreviewIndex(index); }}
              onPointerLeave={() => setPreviewIndex(null)}
              className={cn(
                "group grid grid-cols-[1fr_3.25rem] border-b transition-colors",
                isSelected && "bg-foreground text-background",
                isPreviewed && "bg-surface",
              )}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                aria-controls="experience-preview"
                onFocus={() => setPreviewIndex(index)}
                onBlur={() => setPreviewIndex(null)}
                onClick={() => selectExperience(index)}
                className="grid min-h-32 grid-cols-[2.5rem_1fr] gap-3 px-3 py-5 text-left sm:grid-cols-[3.5rem_1fr] sm:px-4"
              >
                <span className={cn("font-mono text-xs", isSelected ? "text-background/70" : "text-muted")}>{experience.index}</span>
                <span>
                  <span className="block text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{experience.name}</span>
                  <span className={cn("mt-3 block font-mono text-[0.62rem] uppercase tracking-[0.14em]", isSelected ? "text-background/70" : "text-muted")}>{experience.status}</span>
                </span>
              </button>
              <Link
                href={`/experience/${experience.slug}`}
                aria-label={`Enter the ${experience.name} experience`}
                onFocus={() => setPreviewIndex(index)}
                onBlur={() => setPreviewIndex(null)}
                className={cn(
                  "grid place-items-center border-l transition-colors",
                  isSelected ? "border-background/20 hover:bg-background hover:text-foreground" : "hover:bg-foreground hover:text-background",
                )}
              >
                <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={18} aria-hidden />
              </Link>
            </div>
          );
        })}
      </div>

      <div id="experience-preview" className="scroll-mt-28 border-t lg:sticky lg:top-28" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={visibleExperience.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <header className="grid gap-6 border-b py-6 sm:grid-cols-[5rem_1fr] sm:py-8">
              <p className="font-mono text-xs text-muted">{visibleExperience.index} / 05</p>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                  {isPreviewing ? "Previewing exhibit" : "Selected exhibit"}
                </p>
                <h3 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">{visibleExperience.name}</h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{visibleExperience.description}</p>
                {visibleExperience.statusNote && <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">{visibleExperience.statusNote}</p>}
              </div>
            </header>

            <div className="grid border-b sm:grid-cols-2">
              <DetailList label="Engineering disciplines" items={visibleExperience.disciplines} className="py-6 sm:border-r sm:pr-6" />
              <DetailList label="Technology stack" items={visibleExperience.technologies} className="border-t py-6 sm:border-t-0 sm:pl-6" />
            </div>

            <section className="border-b py-7" aria-labelledby="architecture-preview-title">
              <div className="flex items-center justify-between gap-4">
                <h4 id="architecture-preview-title" className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">Representative architecture</h4>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">System path</span>
              </div>
              <ol className="mt-6 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
                {visibleExperience.architecture.map((node, index) => (
                  <li key={node} className="relative min-h-24 bg-background p-4">
                    <span className="font-mono text-[0.62rem] text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-5 text-sm font-medium tracking-[-0.01em]">{node}</p>
                    {index < visibleExperience.architecture.length - 1 && <span className="absolute bottom-3 right-3 text-muted" aria-hidden>→</span>}
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-7 border-b py-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <DetailList label="What you will experience" items={visibleExperience.visitorExperience} />
              <div className="flex items-center gap-3 text-sm text-muted">
                <Clock3 size={16} aria-hidden />
                <span><span className="sr-only">Estimated exploration time: </span>{visibleExperience.explorationTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5 py-6">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Engineering domains</p>
                <p className="mt-2 text-sm">{visibleExperience.domains.join(" / ")}</p>
              </div>
              <Link href={`/experience/${visibleExperience.slug}`} className="group inline-flex min-h-12 items-center gap-4 border-b border-foreground text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                Enter experience
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailList({ label, items, className }: { label: string; items: readonly string[]; className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">{label}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><span className="mt-[0.65em] size-1 shrink-0 rounded-full bg-accent" aria-hidden />{item}</li>)}
      </ul>
    </div>
  );
}
