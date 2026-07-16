export const navigation = [
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const experiences = [
  { slug: "relayworks", name: "RelayWorks", discipline: "Document intelligence", index: "01" },
  { slug: "callbackcloser", name: "CallbackCloser", discipline: "Workflow engineering", index: "02" },
  { slug: "webhook-dashboard", name: "Webhook Dashboard", discipline: "Developer tooling", index: "03" },
  { slug: "ai-content-automation", name: "AI Content Automation", discipline: "Applied AI systems", index: "04" },
  { slug: "portfolio-dashboard", name: "Portfolio Dashboard", discipline: "Data products", index: "05" },
] as const;

export const experienceSlugs = experiences.map(({ slug }) => slug);

