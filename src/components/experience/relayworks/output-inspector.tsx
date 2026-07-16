"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { relayworksOutputs } from "@/lib/relayworks";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "markdown", label: "Markdown" },
  { id: "json", label: "JSON" },
  { id: "html", label: "HTML" },
  { id: "images", label: "Images" },
  { id: "report", label: "Processing report" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const images = [
  { src: "/relayworks/nist-update-check.jpeg", alt: "Extracted NIST update-check graphic", width: 163, height: 111, filename: "_page_0_Picture_0.jpeg", size: "3.2 KB" },
  { src: "/relayworks/nist-wordmark.jpeg", alt: "Extracted National Institute of Standards and Technology wordmark", width: 694, height: 98, filename: "_page_0_Picture_4.jpeg", size: "14.1 KB" },
  { src: "/relayworks/commerce-seal.jpeg", alt: "Extracted United States Department of Commerce seal", width: 229, height: 226, filename: "_page_1_Picture_4.jpeg", size: "13.2 KB" },
] as const;

export function OutputInspector() {
  const [activeTab, setActiveTab] = useState<TabId>("markdown");

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    document.getElementById(`relayworks-tab-${tabs[nextIndex].id}`)?.focus();
  }

  return (
    <div className="border-y">
      <div className="grid border-b lg:grid-cols-[17rem_1fr]">
        <div className="border-b p-5 lg:border-b-0 lg:border-r lg:p-7">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">Authentic sample package</p>
          <p className="mt-4 text-sm font-medium">NIST.AI.600-1-sample.pdf</p>
          <dl className="mt-6 grid grid-cols-2 gap-5 text-sm lg:grid-cols-1">
            <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Source pages</dt><dd className="mt-1">5</dd></div>
            <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Conversion</dt><dd className="mt-1">120.76 seconds</dd></div>
            <div><dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Extracted</dt><dd className="mt-1">10 headings / 3 images</dd></div>
          </dl>
        </div>

        <div className="min-w-0">
          <div role="tablist" aria-label="RelayWorks sample outputs" className="flex overflow-x-auto border-b">
            {tabs.map((tab, index) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  id={`relayworks-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`relayworks-panel-${tab.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn("relative min-h-14 shrink-0 px-4 text-xs transition-colors sm:px-5", active ? "text-foreground" : "text-muted hover:text-foreground")}
                >
                  {tab.label}
                  {active && <motion.span layoutId="output-tab" className="absolute inset-x-4 bottom-0 h-0.5 bg-accent" />}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            id={`relayworks-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`relayworks-tab-${activeTab}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[28rem]"
          >
            {activeTab === "images" ? <ImageOutput /> : <CodeOutput value={relayworksOutputs[activeTab]} language={activeTab} />}
          </motion.div>
        </div>
      </div>
      <p className="px-5 py-4 text-xs leading-relaxed text-muted lg:ml-[17rem] lg:border-l lg:px-7">These excerpts and metrics come from a real local RelayWorks package. Private paths and job identifiers are intentionally omitted.</p>
    </div>
  );
}

function CodeOutput({ value, language }: { value: string; language: string }) {
  return (
    <div className="p-5 lg:p-7">
      <div className="flex items-center justify-between gap-4 border-b pb-4">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted">document.{language === "markdown" ? "md" : language === "report" ? "report.md" : language}</span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">Representative excerpt</span>
      </div>
      <pre className="mt-5 max-h-[25rem] overflow-auto whitespace-pre-wrap font-mono text-xs leading-7 text-foreground"><code>{value}</code></pre>
    </div>
  );
}

function ImageOutput() {
  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.filename} className="flex min-h-56 flex-col justify-between bg-background p-5">
          <div className="grid min-h-32 place-items-center bg-white p-4">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized className="max-h-28 w-auto object-contain" />
          </div>
          <figcaption className="mt-5">
            <p className="break-all font-mono text-[0.62rem]">{image.filename}</p>
            <p className="mt-2 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">{image.width}×{image.height} · {image.size}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
