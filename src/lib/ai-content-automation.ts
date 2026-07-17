export type WorkflowStage = {
  id: string;
  index: string;
  label: string;
  owner: string;
  input: string;
  work: string;
  output: string;
  failure: string;
  boundary: string;
  evidence: string;
  status: "implemented" | "provider boundary";
};

export const workflowStages: readonly WorkflowStage[] = [
  {
    id: "brief",
    index: "01",
    label: "Structured brief",
    owner: "ContentBrief + briefFormSchema",
    input: "Workspace, business context, audience, voice, themes, platforms, cadence, goals, calls to action, and notes.",
    work: "A server action validates the submitted fields, checks workspace access, normalizes the values, and stores a brief snapshot.",
    output: "A workspace-scoped brief marked ready for generation.",
    failure: "Invalid fields remain at the intake boundary; missing workspace access stops the mutation.",
    boundary: "The model never receives an unstructured form dump. Product intent is made explicit before generation begins.",
    evidence: "app/(app)/app/actions.ts · lib/validations/brief.ts · prisma/schema.prisma",
    status: "implemented",
  },
  {
    id: "safety",
    index: "02",
    label: "Safety preflight",
    owner: "lib/ai/safety.ts",
    input: "The compiled brief text.",
    work: "A small deterministic check rejects configured high-risk terms before any provider request.",
    output: "Approved input, or an explicit manual-review error.",
    failure: "A matched blocked term throws before the OpenAI adapter is called.",
    boundary: "This is a basic preflight—not a claim of comprehensive content safety or factual verification.",
    evidence: "lib/ai/safety.ts",
    status: "implemented",
  },
  {
    id: "instructions",
    index: "03",
    label: "Instruction assembly",
    owner: "lib/ai/prompts.ts",
    input: "System rules, an optional preset, and the structured user brief.",
    work: "The orchestration layer separates system, developer, and user instructions before invoking the model.",
    output: "A role-separated request for a campaign summary, calendar, captions, hashtags, and image prompts.",
    failure: "Missing or contradictory source data can still produce an unusable request even when its shape is valid.",
    boundary: "Prompt composition stays in a server module instead of being embedded in the interface.",
    evidence: "lib/ai/generate.ts · lib/ai/prompts.ts",
    status: "implemented",
  },
  {
    id: "model",
    index: "04",
    label: "Model boundary",
    owner: "OpenAI Responses API adapter",
    input: "Role-separated instructions and the configured server-side model.",
    work: "The official SDK requests a schema-backed response with zodTextFormat.",
    output: "A parsed GenerationOutput when provider configuration and the request both succeed.",
    failure: "Provider errors or an empty parsed response mark the persisted run failed. There is no automatic retry.",
    boundary: "Provider credentials and SDK initialization remain server-only. Live provider success is not asserted in this exhibit.",
    evidence: "lib/ai/client.ts · lib/ai/generate.ts",
    status: "provider boundary",
  },
  {
    id: "validation",
    index: "05",
    label: "Output contract",
    owner: "generationOutputSchema",
    input: "The provider response.",
    work: "Zod constrains required sections and collection sizes while the SDK parses the structured response.",
    output: "Typed campaignSummary, calendarEntries, sampleCaptions, hashtags, and imagePrompts.",
    failure: "Malformed or empty structured output cannot advance as a successful result.",
    boundary: "Shape validation makes data usable; it does not prove factual accuracy or editorial quality.",
    evidence: "lib/validations/generation.ts",
    status: "implemented",
  },
  {
    id: "persistence",
    index: "06",
    label: "Persisted result",
    owner: "Prisma + PostgreSQL",
    input: "Validated output plus the run, brief, workspace, model, and initiator context.",
    work: "StructuredOutput is stored separately, then GenerationRun becomes SUCCEEDED; caught failures become FAILED with an error message.",
    output: "A durable, workspace-scoped source of truth for results, history, exports, refinement, and delivery.",
    failure: "A database failure prevents the workflow from presenting transient model output as durable work.",
    boundary: "Generation and delivery are decoupled by persisted state, even though generation itself still runs inside the request lifecycle.",
    evidence: "prisma/schema.prisma · app/(app)/app/actions.ts",
    status: "implemented",
  },
  {
    id: "review",
    index: "07",
    label: "Human review",
    owner: "Results workspace + refinement actions",
    input: "A saved structured result and an optional section-specific refinement instruction.",
    work: "The app can propose a revision for four supported sections; a user must explicitly accept it before persistence changes.",
    output: "Reviewed saved content, or an unchanged original when a proposal is not accepted.",
    failure: "Invalid section data, missing authorization, or provider failure returns a visible error without overwriting the saved result.",
    boundary: "Automation proposes; the human commits. Calendar entries are not currently refinable through this action.",
    evidence: "lib/results/refinement.ts · components/results/section-refinement-panel.tsx",
    status: "implemented",
  },
  {
    id: "delivery",
    index: "08",
    label: "Export + delivery",
    owner: "Results formatters + Google Docs adapter",
    input: "The current persisted StructuredOutput and workspace delivery configuration.",
    work: "One normalized formatter feeds Markdown, text, DOCX, PDF, and Google Docs blocks. Delivery uses owner OAuth or a service-account shared-folder path.",
    output: "Deterministic files, or a RunDelivery record with external document metadata when configured provider delivery succeeds.",
    failure: "Missing configuration, authorization, permissions, or API failure records delivery failure without deleting the saved run.",
    boundary: "The delivery code and tests exist; a successful live Google Docs delivery is not represented here.",
    evidence: "lib/results/* · lib/google-docs/* · tests/google-docs/*",
    status: "provider boundary",
  },
] as const;

export const transformationViews = [
  {
    id: "source",
    label: "Source brief",
    note: "Representative synthetic data derived from the opt-in repository seed.",
    content: {
      businessName: "North Star Media",
      audience: "Seed to Series B SaaS marketers",
      brandVoice: "Strategic, grounded, concise, operator-first",
      platforms: ["LinkedIn", "X", "Email"],
      goals: ["Book discovery calls", "Grow warm pipeline"],
    },
  },
  {
    id: "request",
    label: "Request contract",
    note: "A concise representation of the implemented role and output boundaries—not a captured provider request.",
    content: {
      roles: ["system", "developer", "user"],
      responseFormat: "campaign_plan / Zod schema",
      requestedSections: ["campaignSummary", "calendarEntries", "sampleCaptions", "hashtags", "imagePrompts"],
      modelSource: "OPENAI_MODEL (server environment)",
    },
  },
  {
    id: "result",
    label: "Saved shape",
    note: "Sanitized representative shape. No live model response or customer content is displayed.",
    content: {
      campaignSummary: "Reviewable campaign direction",
      calendarEntries: "3–10 typed entries",
      captions: "2–8 typed entries",
      hashtags: "1–5 sets",
      imagePrompts: "2–8 typed prompts",
      sourceOfTruth: "StructuredOutput",
    },
  },
  {
    id: "metadata",
    label: "Run metadata",
    note: "Representative identifiers and states; no live execution is occurring.",
    content: {
      runId: "run_demo_006a",
      status: "SUCCEEDED | FAILED",
      schemaVersion: 1,
      promptVersion: "phase1-v1",
      deliveryStatus: "PENDING | DELIVERED | FAILED",
    },
  },
] as const;

export const reviewStates = [
  {
    id: "automatic",
    label: "Automatic",
    classification: "Implemented",
    title: "Deterministic structure checks",
    detail: "Input schemas, output schemas, workspace authorization, and export normalization can be evaluated without editorial judgment.",
    next: "Advance only when the contract is valid.",
  },
  {
    id: "review",
    label: "Needs review",
    classification: "Implemented boundary",
    title: "Meaning and presentation remain human work",
    detail: "The repository supports section-level refinement proposals and requires explicit acceptance before the saved result changes.",
    next: "Inspect accuracy, voice, claims, formatting, and destination intent.",
  },
  {
    id: "blocked",
    label: "Blocked",
    classification: "Implemented failure state",
    title: "Failure stops forward progress",
    detail: "Safety rejection, malformed output, model failure, missing configuration, or a Google API failure cannot be presented as a completed delivery.",
    next: "Correct the input or configuration; retry is a new user action, not an automated mechanism.",
  },
  {
    id: "ready",
    label: "Ready for delivery",
    classification: "Architectural recommendation",
    title: "Make approval explicit before an external write",
    detail: "The code requires a completed saved run and owner action, but it does not persist a dedicated editorial approval status today.",
    next: "A production iteration should store reviewer, approval time, and destination confirmation.",
  },
] as const;

export const deliveryBoundaries = [
  { id: "authorization", label: "Authorization", title: "Owner-controlled connection", detail: "Workspace owners configure delivery. The preferred path stores encrypted OAuth tokens for a connected Google account; the fallback uses server-side service-account credentials.", evidence: "Google OAuth routes + owner-only server actions", state: "Implemented code" },
  { id: "formatting", label: "Document preparation", title: "One normalized formatter", detail: "Persisted output becomes readable title, subtitle, heading, and body blocks. The same source also feeds text, Markdown, DOCX, and PDF exports.", evidence: "lib/results/format.ts", state: "Implemented and tested" },
  { id: "creation", label: "Docs + Drive APIs", title: "Create, write, then record", detail: "The adapter creates a Google Doc in the authorized folder or follows the shared-folder service-account path, then stores external metadata on RunDelivery.", evidence: "lib/google-docs/service.ts + delivery.ts", state: "Implemented; live result unverified" },
  { id: "failure", label: "Failure containment", title: "Delivery cannot erase generation", detail: "A failed external write updates the delivery state and preserves the previously saved StructuredOutput. No automatic delivery retry is implemented.", evidence: "RunDelivery status + action tests", state: "Implemented and tested" },
] as const;

export const representativeRuns = [
  { id: "run_demo_006a", goal: "Pipeline acceleration", result: "Saved output", review: "Needs review", delivery: "Not attempted", stage: "Human review", warning: "Provider-backed result shown only as representative data.", recovery: "Review content, then initiate an owner-controlled export or delivery action." },
  { id: "run_demo_005f", goal: "Weekly repurposing", result: "Failed", review: "Blocked", delivery: "Not started", stage: "Model boundary", warning: "Representative provider failure; no automatic retry exists.", recovery: "Correct configuration or input, then start a new run manually." },
  { id: "run_demo_004c", goal: "Launch calendar", result: "Saved output", review: "Accepted revision", delivery: "Failed", stage: "Docs delivery", warning: "Representative permission failure; no document URL is claimed.", recovery: "Reconnect authorization or confirm folder access before another owner-initiated attempt." },
] as const;

export const engineeringDecisions = [
  { decision: "Persist before delivery", evidence: "StructuredOutput is independent from RunDelivery.", tradeoff: "More state transitions and records to coordinate.", consequence: "A Google API failure cannot destroy the generated result." },
  { decision: "Schema-backed provider output", evidence: "Responses API parsing uses generationOutputSchema.", tradeoff: "The output contract limits free-form variation.", consequence: "Downstream renderers receive predictable sections, not arbitrary prose." },
  { decision: "Explicit refinement acceptance", evidence: "Proposal and acceptance are separate server actions.", tradeoff: "Review requires an additional user step.", consequence: "A model suggestion cannot silently replace persisted content." },
  { decision: "Two delivery authorization modes", evidence: "USER_OAUTH and SERVICE_ACCOUNT metadata are supported.", tradeoff: "Configuration and testing surface area increase.", consequence: "My Drive and shared-folder deployments have explicit, separate boundaries." },
  { decision: "Request-lifecycle generation", evidence: "generateRunAction awaits the provider call directly.", tradeoff: "Long requests lack durable worker recovery.", consequence: "A background queue is the clearest requirement before dependable live operation." },
] as const;

export const technologies = [
  { name: "Next.js 16 + React 19", role: "App Router interface, protected layouts, server actions, and route handlers.", evidence: "package.json · app/" },
  { name: "Prisma + PostgreSQL", role: "Workspace tenancy, briefs, run status, structured output, security events, and delivery records.", evidence: "prisma/schema.prisma" },
  { name: "OpenAI Responses API", role: "Server-only schema-backed campaign-plan generation and section refinement.", evidence: "lib/ai/" },
  { name: "Zod", role: "Contracts at form, generation, refinement, authentication, and integration boundaries.", evidence: "lib/validations/" },
  { name: "Google APIs SDK", role: "OAuth, Drive-folder validation, Docs creation, content insertion, and delivery metadata.", evidence: "lib/google-docs/" },
  { name: "Vitest", role: "Coverage across auth, tenancy, generation actions, exports, refinement, OAuth, and delivery services.", evidence: "tests/" },
] as const;

export const limitations = [
  "Code and architecture case study — live deployment currently unavailable.",
  "Provider-backed generation requires evaluator-supplied OpenAI configuration; successful live generation is not asserted.",
  "Google delivery requires OAuth or service-account configuration and separate manual verification; successful live delivery is not asserted.",
  "Generation runs in the request lifecycle. There is no durable background queue or automatic retry.",
  "The database schema records run and delivery states, but there is no dedicated persisted editorial-approval entity.",
  "Public repository screenshots use opt-in seeded data and intentionally omit provider-success and delivered-document states.",
] as const;
