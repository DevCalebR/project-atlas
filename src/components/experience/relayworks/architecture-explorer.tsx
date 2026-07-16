"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { relayworksArchitecture } from "@/lib/relayworks";
import { cn } from "@/lib/utils";

export function ArchitectureExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = relayworksArchitecture[selectedIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
      <div role="group" aria-label="RelayWorks architecture nodes" className="border-t">
        {relayworksArchitecture.map((node, index) => {
          const active = index === selectedIndex;
          return (
            <button
              key={node.name}
              type="button"
              aria-pressed={active}
              aria-controls="relayworks-architecture-detail"
              onClick={() => setSelectedIndex(index)}
              className={cn("grid min-h-16 w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b px-3 text-left transition-colors", active ? "bg-foreground text-background" : "hover:bg-surface")}
            >
              <span className={cn("font-mono text-[0.62rem]", active ? "text-background/70" : "text-muted")}>{String(index + 1).padStart(2, "0")}</span>
              <span className={cn("text-sm", active && "font-semibold")}>{node.name}</span>
              <span className={cn("font-mono text-[0.56rem] uppercase tracking-[0.12em]", active ? "text-background/70" : "text-muted")}>{active ? "Selected" : "Inspect"}</span>
            </button>
          );
        })}
      </div>

      <div id="relayworks-architecture-detail" className="border-t" aria-live="polite" aria-atomic="true">
        <motion.article key={selected.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-7">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">Node {String(selectedIndex + 1).padStart(2, "0")} / {String(relayworksArchitecture.length).padStart(2, "0")}</p>
          <h3 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-5xl">{selected.name}</h3>
          <dl className="mt-9 divide-y border-y">
            <ArchitectureFact term="Responsibility" detail={selected.responsibility} />
            <ArchitectureFact term="Why it exists" detail={selected.why} />
            <ArchitectureFact term="Alternative boundary" detail={selected.alternative} />
            <ArchitectureFact term="Tradeoff" detail={selected.tradeoff} />
          </dl>
        </motion.article>
      </div>
    </div>
  );
}

function ArchitectureFact({ term, detail }: { term: string; detail: string }) {
  return <div className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr]"><dt className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">{term}</dt><dd className="text-sm leading-relaxed">{detail}</dd></div>;
}
