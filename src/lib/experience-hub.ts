export type ExperienceHubItem = {
  slug: string;
  index: string;
  name: string;
  description: string;
  status: string;
  statusNote?: string;
  domains: readonly string[];
  technologies: readonly string[];
  disciplines: readonly string[];
  architecture: readonly string[];
  visitorExperience: readonly string[];
  explorationTime: string;
};

export const experienceHubItems: readonly ExperienceHubItem[] = [
  {
    slug: "relayworks",
    index: "01",
    name: "RelayWorks",
    description: "A document-processing system that moves source files through structured AI workflows to usable outputs.",
    status: "Production",
    domains: ["AI applications", "Backend systems"],
    technologies: ["FastAPI", "Next.js", "Python"],
    disciplines: ["AI pipelines", "Document processing", "Background jobs"],
    architecture: ["Document input", "Next.js", "FastAPI", "Background jobs", "AI pipeline", "Structured output"],
    visitorExperience: ["Complete document pipeline", "Architecture walkthrough", "Structured outputs", "Engineering trade-offs"],
    explorationTime: "6–8 minutes",
  },
  {
    slug: "callbackcloser",
    index: "02",
    name: "CallbackCloser",
    description: "A webhook-driven SaaS workflow that turns missed calls into structured SMS qualification and owner handoffs.",
    status: "Architecture case study",
    domains: ["Workflow automation", "Full-stack applications"],
    technologies: ["Next.js", "Twilio", "PostgreSQL"],
    disciplines: ["SaaS workflows", "Messaging automation", "Event processing"],
    architecture: ["Missed call", "Signed webhook", "Domain rules", "Durable state", "SMS qualification", "Owner handoff"],
    visitorExperience: ["Live event trace", "System boundaries", "Failure handling", "Engineering decisions"],
    explorationTime: "5–7 minutes",
  },
  {
    slug: "webhook-dashboard",
    index: "03",
    name: "Webhook Dashboard",
    description: "An operations interface for verifying signed webhooks, preserving event evidence, evaluating alerts, and investigating failures.",
    status: "Code showcase",
    domains: ["Developer tools", "API integrations"],
    technologies: ["Next.js", "PostgreSQL", "Clerk"],
    disciplines: ["Webhook security", "Event persistence", "Operational visibility"],
    architecture: ["Signed source", "Ingestion route", "Deterministic dedupe", "Event ledger", "Rule evaluation", "Operator dashboard"],
    visitorExperience: ["Event ledger", "Evidence inspector", "Alert reasoning", "Failure investigation"],
    explorationTime: "5–7 minutes",
  },
  {
    slug: "ai-content-automation",
    index: "04",
    name: "AI Content Automation",
    description: "A workflow-orchestration case study spanning structured briefs, schema-backed AI transformation, human review, deterministic exports, and Google Docs delivery architecture.",
    status: "Code + architecture case study",
    statusNote: "Code and architecture case study — live deployment currently unavailable.",
    domains: ["AI applications", "Workflow automation"],
    technologies: ["Next.js", "PostgreSQL + Prisma", "OpenAI + Google APIs"],
    disciplines: ["Workflow orchestration", "Structured generation", "Review and delivery boundaries"],
    architecture: ["Structured brief", "Safety + instructions", "Schema-backed generation", "Persisted output", "Human review", "Export + delivery"],
    visitorExperience: ["Eight-stage orchestration canvas", "Transformation contracts", "Review boundaries", "Google Docs architecture"],
    explorationTime: "7–9 minutes",
  },
  {
    slug: "portfolio-dashboard",
    index: "05",
    name: "Portfolio Dashboard",
    description: "A React dashboard study focused on interactive data views and maintainable component architecture.",
    status: "Code showcase",
    domains: ["Full-stack applications", "Frontend systems"],
    technologies: ["React", "Data visualization", "Component architecture"],
    disciplines: ["Dashboard UI", "Application state", "Interface architecture"],
    architecture: ["UI interaction", "React components", "Application state", "Data visualization", "Dashboard view"],
    visitorExperience: ["Dashboard interaction", "UI architecture", "Component organization"],
    explorationTime: "4–6 minutes",
  },
] as const;
