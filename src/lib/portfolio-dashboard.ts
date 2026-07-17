export type SystemRecord = {
  id: string;
  name: string;
  domain: "AI systems" | "Workflow systems" | "Developer tools" | "Frontend systems";
  state: string;
  evidence: string;
  activeRisk: string;
  recentChange: string;
  nextAction: string;
  source: string;
};

export const systemRecords: readonly SystemRecord[] = [
  {
    id: "relayworks",
    name: "RelayWorks",
    domain: "AI systems",
    state: "Production product",
    evidence: "Public product identity and completed engineering exhibit document the processing and delivery architecture.",
    activeRisk: "Operational evidence remains project-specific; this control room does not ingest live service telemetry.",
    recentChange: "Mobile output inspection and walkthrough navigation were verified before publication.",
    nextAction: "Keep runtime evidence separate from portfolio narrative when future operational data is added.",
    source: "Published exhibit + repository history",
  },
  {
    id: "callbackcloser",
    name: "CallbackCloser",
    domain: "Workflow systems",
    state: "Architecture case study",
    evidence: "The exhibit documents signed webhooks, durable conversation state, SMS qualification, and owner handoff boundaries.",
    activeRisk: "No customer conversion metrics or live appointment-booking outcome is claimed.",
    recentChange: "The architecture case study was completed and published as an evidence-led event trace.",
    nextAction: "Verify provider behavior in a separately configured environment before making operational claims.",
    source: "Published exhibit + factual limitation record",
  },
  {
    id: "webhook-dashboard",
    name: "Webhook Dashboard",
    domain: "Developer tools",
    state: "Code showcase",
    evidence: "The repository-backed exhibit covers signed ingestion, deterministic dedupe, persisted evidence, alert reasoning, and failure investigation.",
    activeRisk: "Slack delivery has no durable retry mechanism and is not presented as a live integration.",
    recentChange: "The operator console and evidence inspectors passed responsive and keyboard publication QA.",
    nextAction: "Add durable delivery recovery before treating alert delivery as an operational guarantee.",
    source: "Published exhibit + implementation limits",
  },
  {
    id: "ai-content-automation",
    name: "AI Content Automation",
    domain: "AI systems",
    state: "Code + architecture case study",
    evidence: "Next.js, Prisma, schema-backed OpenAI output, explicit refinement acceptance, exports, and Google Docs adapters are documented in the public repository.",
    activeRisk: "The application deployment and provider-backed generation and delivery remain unavailable for live verification.",
    recentChange: "The eight-stage orchestration exhibit was validated and published from commit 94c3e74.",
    nextAction: "Introduce durable background execution and verify external providers before live release.",
    source: "Public repository + published exhibit",
  },
  {
    id: "portfolio-dashboard",
    name: "Portfolio Dashboard",
    domain: "Frontend systems",
    state: "Frontend demonstration",
    evidence: "React routes, typed mock services, URL-synchronized run state, validated forms, lazy charts, and release scripts are implemented.",
    activeRisk: "All run values are synthetic, browser-session only, and disconnected from any backend or trading system.",
    recentChange: "Repository discoverability now states the unavailable demo and mock-data boundary prominently.",
    nextAction: "Choose either a documented API adapter example or keep the mock boundary explicit for a template release.",
    source: "portfolio-dashboard repository · commit c9b0e36",
  },
] as const;

export const healthEvidence = [
  { id: "routes", label: "Route coverage", state: "Confirmed", fact: "Dashboard, runs, new-run, run-detail, loading, error, not-found, and SPA fallback paths exist.", source: "src/app/router.tsx" },
  { id: "validation", label: "Release checks", state: "Confirmed", fact: "Lint, TypeScript, behavior tests, production build, and generated-output smoke checks are scripted.", source: "package.json · scripts/" },
  { id: "data", label: "Data boundary", state: "Constrained", fact: "The typed mock API stores runs only in module memory and introduces simulated latency and a small random list/detail failure rate.", source: "src/features/runs/mockApi.ts" },
  { id: "deployment", label: "Deployment", state: "Unavailable", fact: "The previously published demo URL is unavailable; the repository is evaluated locally.", source: "README.md" },
  { id: "integrations", label: "External systems", state: "Not implemented", fact: "There is no broker, market feed, job runner, backend API, database, or authentication.", source: "README.md · architecture" },
] as const;

export type RunFixture = {
  id: string;
  pair: string;
  timeframe: string;
  strategy: string;
  status: "done" | "failed" | "queued" | "running";
  profitFactor: string;
  trades: number;
  maxDrawdown: string;
  risk: string;
  range: string;
  created: string;
  interpretation: string;
  followUp: string;
};

export const runFixtures: readonly RunFixture[] = [
  { id: "RUN-101", pair: "USDCAD", timeframe: "H1", strategy: "momentum", status: "done", profitFactor: "1.48", trades: 42, maxDrawdown: "6.3%", risk: "0.5%", range: "2025-01-01 → 2025-01-31", created: "2025-02-01 09:12Z", interpretation: "A completed fixture with deterministic chart input. It is not evidence of financial performance.", followUp: "Inspect the generated synthetic equity path and preserve the fixture label." },
  { id: "RUN-103", pair: "GBPUSD", timeframe: "H4", strategy: "breakout", status: "failed", profitFactor: "0.94", trades: 33, maxDrawdown: "13.1%", risk: "0.5%", range: "2024-11-01 → 2025-01-31", created: "2025-02-04 15:21Z", interpretation: "The status supports failed-state presentation, but the fixture has no stored error reason or execution log.", followUp: "A real API contract should return failure evidence rather than asking the UI to infer it from metrics." },
  { id: "RUN-109", pair: "CADJPY", timeframe: "D1", strategy: "momentum", status: "queued", profitFactor: "1.04", trades: 14, maxDrawdown: "11.7%", risk: "0.25%", range: "2024-06-01 → 2025-01-31", created: "2025-02-12 17:44Z", interpretation: "Queued is a static fixture state. No worker consumes it and no transition is scheduled.", followUp: "Only add progress semantics when a backend owns state transitions." },
  { id: "RUN-110", pair: "EURJPY", timeframe: "H1", strategy: "breakout", status: "running", profitFactor: "1.21", trades: 51, maxDrawdown: "8.8%", risk: "0.5%", range: "2025-01-20 → 2025-02-18", created: "2025-02-14 09:28Z", interpretation: "Running is representative fixture data—not a live job, timer, market connection, or background process.", followUp: "Back real-time state with a durable job model before introducing polling or activity animation." },
] as const;

export const decisions = [
  { id: "typed-boundary", title: "Hide fixture storage behind typed services", problem: "Page components should not depend directly on a data fixture that a future API must replace.", choice: "Expose listRuns, getRunById, and createRun through typed contracts.", reason: "The UI can preserve its route and component boundaries when the data source changes.", tradeoff: "The mock service still behaves globally within one browser session and cannot model durable concurrency.", evidence: "src/features/runs/mockApi.ts · types.ts", reconsider: "When a real backend contract exists, keep the function surface and replace latency, errors, and memory storage." },
  { id: "url-state", title: "Keep table state in the URL", problem: "Search, status, sorting, page, and page size should survive navigation and be shareable.", choice: "Parse and serialize query state through React Router search parameters.", reason: "The URL becomes the explicit state contract for the runs view.", tradeoff: "Every table change becomes a navigation-state update that needs normalization.", evidence: "queryState.ts · RunsPage.tsx", reconsider: "Move only ephemeral controls out of the URL if they add noise without improving reproducibility." },
  { id: "validated-form", title: "Validate before creating a run", problem: "Dates, risk limits, symbols, timeframes, and strategies need a coherent client contract.", choice: "Use React Hook Form with a Zod schema and cross-field date validation.", reason: "Errors stay near their inputs and invalid dates cannot reach the mock service.", tradeoff: "Client validation is not an authorization or server trust boundary.", evidence: "src/pages/NewRunPage.tsx", reconsider: "Duplicate the contract server-side when an API is introduced." },
  { id: "lazy-charts", title: "Load chart code only on detail routes", problem: "Recharts is unnecessary for the list and form surfaces.", choice: "Lazy-load RunDetailCharts behind Suspense.", reason: "The initial route avoids chart work until evidence requires it.", tradeoff: "The detail view needs an explicit loading state and an additional chunk.", evidence: "RunDetailPage.tsx · RunDetailCharts.tsx", reconsider: "Measure real bundle and navigation behavior before adding more chart families." },
  { id: "spa", title: "Ship as a static SPA demonstration", problem: "The template needs deep-link support without a server application.", choice: "Build with Vite and ship a _redirects fallback to index.html.", reason: "The current routes can be evaluated on static hosting.", tradeoff: "There is no server rendering, persistence, or live data boundary.", evidence: "vite.config.ts · public/_redirects · smoke-test.mjs", reconsider: "Adopt a server framework only when authentication, persistence, or data loading justifies it." },
] as const;

export const risks = [
  { id: "synthetic", title: "Synthetic performance data", severity: "Disclosure required", known: "Every metric and chart is generated from repository fixtures or deterministic mock calculations.", why: "Unqualified values could be mistaken for trading results or financial advice.", mitigation: "The README, detail view, and this exhibit label all data synthetic.", next: "Keep fixture provenance adjacent to every future visualization." },
  { id: "persistence", title: "Session-only run storage", severity: "Architecture constraint", known: "createRun mutates an in-memory module array; refreshes reset the data.", why: "A created record cannot support audit, collaboration, or durable history.", mitigation: "The UI states that new runs exist only in the current browser session.", next: "Define a versioned API and persistent run model before adding accounts." },
  { id: "random-errors", title: "Random mock failures", severity: "Demo reliability", known: "List and detail reads have a 1% random failure rate; create can be explicitly forced to fail.", why: "A showcase can fail unpredictably even though no external service is involved.", mitigation: "Pages implement retryable error states and cancel stale state updates.", next: "Use deterministic scenarios for public demos and reserve random failure for local resilience testing." },
  { id: "deployment", title: "Unavailable hosted demo", severity: "Evaluation blocker", known: "Repository documentation says the previously published URL is unavailable.", why: "Reviewers cannot verify routes without running the project locally.", mitigation: "Setup and deploy-check commands are documented and screenshots are committed.", next: "Publish a static demo only after legal/template positioning is confirmed." },
  { id: "backend", title: "No execution backend", severity: "Scope boundary", known: "Queued and running records are static fixtures; no worker, broker, market feed, or analytics service exists.", why: "The interface cannot make operational or financial claims.", mitigation: "Copy identifies the product as a frontend demonstration.", next: "Introduce a backend only with explicit job-state, provenance, and failure contracts." },
] as const;

export const improvements = [
  { priority: "Now", item: "Deterministic browser smoke test", system: "Portfolio Dashboard", evidence: "Ship audit lists browser-level route coverage as incomplete.", dependency: "Stable public fixtures", outcome: "Verify critical routes and filters without random mock failures.", status: "Proposed" },
  { priority: "Now", item: "Decide template data boundary", system: "Portfolio Dashboard", evidence: "Ship audit leaves mock-only versus API-adapter scope unresolved.", dependency: "Product positioning", outcome: "Align buyer expectations with the shipped architecture.", status: "Decision required" },
  { priority: "Next", item: "Durable AI generation worker", system: "AI Content Automation", evidence: "Generation currently runs inside the request lifecycle.", dependency: "Queue + worker hosting", outcome: "Recover work independently from request duration.", status: "Architectural recommendation" },
  { priority: "Next", item: "Durable alert delivery recovery", system: "Webhook Dashboard", evidence: "Delivery failure is recorded but not retried durably.", dependency: "Job persistence", outcome: "Separate accepted ingestion from recoverable notification work.", status: "Architectural recommendation" },
  { priority: "Later", item: "Versioning and support policy", system: "Portfolio Dashboard", evidence: "Both remain open in the ship-readiness audit.", dependency: "Commercial/legal review", outcome: "Set expectations for template updates and support boundaries.", status: "Backlog" },
] as const;

export const technologies = [
  { name: "React 19 + React Router", responsibility: "Route-level dashboard, list, creation, detail, loading, error, and not-found interfaces.", reason: "Client navigation fits the current static frontend boundary.", limitation: "No server rendering or authenticated route boundary.", evidence: "src/app/router.tsx · src/pages/" },
  { name: "TypeScript", responsibility: "Run, query, creation, list-result, and component contracts.", reason: "A replaceable data adapter needs stable shapes.", limitation: "Runtime trust still depends on validation at external boundaries.", evidence: "src/features/runs/types.ts" },
  { name: "TanStack Table", responsibility: "Manual sorting and pagination over URL-synchronized query state.", reason: "Column behavior stays declarative while the mock service owns data operations.", limitation: "The table instance triggers a documented React Compiler lint suppression.", evidence: "src/pages/RunsPage.tsx" },
  { name: "React Hook Form + Zod", responsibility: "Preset-backed form state and cross-field run validation.", reason: "Input errors remain explicit before mock creation.", limitation: "Client validation is not a server authorization boundary.", evidence: "src/pages/NewRunPage.tsx" },
  { name: "Recharts", responsibility: "Lazy-loaded equity and drawdown views derived from fixture metrics.", reason: "The detail route can communicate the charting integration surface.", limitation: "Every plotted value is synthetic and must remain labeled.", evidence: "RunDetailCharts.tsx" },
  { name: "Vite + Node scripts", responsibility: "Static production build, SPA fallback, behavior tests, and output smoke checks.", reason: "The frontend demonstration has no required server runtime.", limitation: "The previously published demo is unavailable.", evidence: "vite.config.ts · scripts/" },
] as const;
