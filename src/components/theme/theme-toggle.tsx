"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle color theme" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground">
      <SunMoon size={18} aria-hidden />
    </button>
  );
}
