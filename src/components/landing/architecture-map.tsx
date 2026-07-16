"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nodes = [
  { label: "Client", detail: "Browser or application initiates the request." },
  { label: "Next.js", detail: "Handles the user interface and client-side workflow." },
  { label: "API Boundary", detail: "Defines the request and response contract between systems." },
  { label: "FastAPI Services", detail: "Validates requests and coordinates backend application logic." },
  { label: "Background jobs", detail: "Moves long-running work outside the request-response cycle." },
  { label: "AI pipelines", detail: "Transforms inputs through structured processing stages." },
  { label: "Outputs", detail: "Returns usable artifacts such as JSON, Markdown, HTML, reports, or application state." },
] as const;

export function ArchitectureMap() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const visibleIndex = previewIndex ?? selectedIndex;
  const visibleNode = nodes[visibleIndex];
  const isPreviewing = previewIndex !== null && previewIndex !== selectedIndex;

  function selectNode(index: number) {
    setSelectedIndex(index);
    setPreviewIndex(null);
  }

  return (
    <div className="relative flex h-full min-h-[32rem] flex-col border-l pl-5 sm:pl-8 lg:min-h-[36rem]" aria-label="Interactive request architecture">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Trace a request</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Input → output</p>
        </div>
        <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted">A representative architecture assembled from patterns used across Caleb&apos;s real work.</p>
      </div>

      <div className="relative flex flex-1 flex-col justify-between py-5">
        <div className="absolute bottom-7 left-2 top-7 w-px bg-line sm:left-3" aria-hidden>
          <motion.span
            className="absolute left-1/2 size-3 -translate-x-1/2 rounded-full border-2 border-background bg-accent shadow-[0_0_0_1px_var(--accent)]"
            animate={{ top: `${(selectedIndex / (nodes.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>

        {nodes.map((node, index) => {
          const isSelected = selectedIndex === index;
          const isPreviewed = previewIndex === index && !isSelected;

          return (
            <button
              key={node.label}
              type="button"
              aria-pressed={isSelected}
              aria-controls="architecture-detail"
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreviewIndex(index); }}
              onPointerLeave={() => setPreviewIndex(null)}
              onFocus={() => setPreviewIndex(index)}
              onBlur={() => setPreviewIndex(null)}
              onClick={() => selectNode(index)}
              className={cn(
                "group relative ml-7 grid min-h-12 w-[calc(100%-1.75rem)] grid-cols-[1fr_auto] items-center gap-4 border-b px-3 text-left transition-[background-color,border-color,color] sm:ml-10 sm:w-[calc(100%-2.5rem)]",
                isSelected && "border-foreground bg-foreground text-background",
                isPreviewed && "border-foreground text-foreground",
                !isSelected && !isPreviewed && "text-muted hover:text-foreground",
              )}
            >
              <span className={cn("text-base tracking-[-0.02em] sm:text-lg", isSelected ? "font-semibold" : "font-medium")}>
                {node.label}
              </span>
              <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.12em]", isSelected ? "text-background" : "text-muted")}>
                {isSelected ? `Active · 0${index + 1}` : `0${index + 1}`}
              </span>
            </button>
          );
        })}
      </div>

      <div id="architecture-detail" className="min-h-32 border-y bg-surface/70 px-4 py-4" role="status" aria-live="polite" aria-atomic="true">
        <motion.div
          key={`${isPreviewing ? "preview" : "selected"}-${visibleNode.label}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            {isPreviewing ? "Preview · activate to select" : `Selected node · 0${selectedIndex + 1} of 07`}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">{visibleNode.label}</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">{visibleNode.detail}</p>
        </motion.div>
      </div>
    </div>
  );
}
