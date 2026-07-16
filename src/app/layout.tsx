import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-ibm-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://calebrogers.dev"),
  title: { default: "Caleb Rogers — Software Engineer", template: "%s — Caleb Rogers" },
  description: "Software engineer designing and shipping thoughtful, production-ready digital systems.",
  applicationName: "Caleb Rogers",
  authors: [{ name: "Caleb Rogers" }],
  creator: "Caleb Rogers",
  keywords: ["Caleb Rogers", "software engineer", "full-stack engineer", "software portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Caleb Rogers",
    title: "Caleb Rogers — Software Engineer",
    description: "Software engineer designing and shipping thoughtful, production-ready digital systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f4f1ea" }, { media: "(prefers-color-scheme: dark)", color: "#0c0d0e" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <MotionProvider>
            <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-accent px-4 py-3 font-mono text-sm text-white transition-transform focus:translate-y-0">Skip to content</a>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

