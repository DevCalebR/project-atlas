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
    description: "A SaaS workflow that turns missed calls into automated SMS follow-up and booking opportunities.",
    status: "Architecture case study",
    domains: ["Workflow automation", "Full-stack applications"],
    technologies: ["Twilio", "Stripe", "Authentication"],
    disciplines: ["SaaS workflows", "Messaging automation", "Booking flows"],
    architecture: ["Missed call", "Twilio event", "Application service", "SMS workflow", "Booking flow"],
    visitorExperience: ["Missed-call workflow", "SMS automation", "Booking flow", "Architecture decisions"],
    explorationTime: "5–7 minutes",
  },
  {
    slug: "webhook-dashboard",
    index: "03",
    name: "Webhook Dashboard",
    description: "An event-operations interface for inspecting webhook delivery, processing, monitoring, and alerts.",
    status: "Code showcase",
    domains: ["Developer tools", "API integrations"],
    technologies: ["APIs", "Event processing", "Monitoring"],
    disciplines: ["Event-driven systems", "Backend workflows", "Operational visibility"],
    architecture: ["Webhook source", "API endpoint", "Event processing", "Monitoring", "Alert"],
    visitorExperience: ["Webhook lifecycle", "Event processing", "Dashboard architecture", "Backend workflow"],
    explorationTime: "5–7 minutes",
  },
  {
    slug: "ai-content-automation",
    index: "04",
    name: "AI Content Automation",
    description: "A code and architecture case study for orchestrating content generation with Google Workspace.",
    status: "Code + architecture case study",
    statusNote: "This is a code and architecture case study, not a currently deployed production service.",
    domains: ["AI applications", "Workflow automation"],
    technologies: ["AI automation", "Google Workspace", "Orchestration"],
    disciplines: ["Content workflows", "Structured generation", "Workflow orchestration"],
    architecture: ["Content brief", "Google Workspace", "Orchestration", "AI processing", "Draft output"],
    visitorExperience: ["Content generation workflow", "Automation pipeline", "Architecture overview"],
    explorationTime: "4–6 minutes",
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
