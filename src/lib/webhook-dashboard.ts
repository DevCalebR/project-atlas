export type WebhookEvent = {
  id: string;
  externalId: string;
  receivedAt: string;
  source: "generic" | "stripe_like";
  type: string;
  signature: "valid";
  result: "alert fired" | "cooldown" | "no match";
  resultDetail: string;
  dedupeKey: string;
  rawBodyHash: string;
  payload: Record<string, string | number>;
  evidence: readonly { label: string; value: string }[];
  history: readonly { label: string; detail: string }[];
};

export const webhookEvents: readonly WebhookEvent[] = [
  {
    id: "evt_demo_1042",
    externalId: "demo_invoice_1042",
    receivedAt: "14:32:08.214Z",
    source: "generic",
    type: "invoice.paid",
    signature: "valid",
    result: "alert fired",
    resultDetail: "The generic invoice prefix rule matched and created a database alert run.",
    dedupeKey: "generic:demo_invoice_1042",
    rawBodyHash: "sha256:8f1b…09c2",
    payload: { id: "demo_invoice_1042", type: "invoice.paid", amount: 2500 },
    evidence: [
      { label: "Trust check", value: "HMAC matched the exact raw request body" },
      { label: "Persistence", value: "Unique dedupe key inserted once" },
      { label: "Rule result", value: "prefix invoice. → fired" },
    ],
    history: [
      { label: "Verified", detail: "Signature checked before JSON parsing or persistence." },
      { label: "Stored", detail: "Payload, source, hash, and identifiers were written to PostgreSQL." },
      { label: "Evaluated", detail: "Each applicable rule produced an inspectable AlertRun row." },
    ],
  },
  {
    id: "evt_demo_1041",
    externalId: "demo_subscription_1041",
    receivedAt: "14:31:42.903Z",
    source: "stripe_like",
    type: "subscription.failed",
    signature: "valid",
    result: "alert fired",
    resultDetail: "The wildcard contains rule matched “failed” and recorded the alert outcome.",
    dedupeKey: "stripe_like:demo_subscription_1041",
    rawBodyHash: "sha256:c6d4…2ee9",
    payload: { id: "demo_subscription_1041", type: "subscription.failed", attempt: 2 },
    evidence: [
      { label: "Trust check", value: "Timestamped signature was inside tolerance" },
      { label: "Persistence", value: "Event retained for operator inspection" },
      { label: "Rule result", value: "contains failed → fired" },
    ],
    history: [
      { label: "Verified", detail: "The timestamped signature protected the original request bytes." },
      { label: "Stored", detail: "A stable external ID became the deterministic dedupe key." },
      { label: "Alerted", detail: "The wildcard failure rule produced a database-only alert run." },
    ],
  },
  {
    id: "evt_demo_1040",
    externalId: "demo_invoice_1040",
    receivedAt: "14:31:17.116Z",
    source: "generic",
    type: "invoice.paid",
    signature: "valid",
    result: "cooldown",
    resultDetail: "The rule matched, but its 60-second cooldown was still active.",
    dedupeKey: "generic:demo_invoice_1040",
    rawBodyHash: "sha256:71a0…fd24",
    payload: { id: "demo_invoice_1040", type: "invoice.paid", amount: 1800 },
    evidence: [
      { label: "Trust check", value: "Generic HMAC valid" },
      { label: "Persistence", value: "Event stored before rule evaluation" },
      { label: "Rule result", value: "matched → skipped_cooldown" },
    ],
    history: [
      { label: "Verified", detail: "The request passed source-specific signature verification." },
      { label: "Stored", detail: "The accepted event remained visible despite no action firing." },
      { label: "Suppressed", detail: "The evaluator recorded why the matching action did not fire." },
    ],
  },
  {
    id: "evt_demo_1039",
    externalId: "demo_customer_1039",
    receivedAt: "14:30:54.771Z",
    source: "stripe_like",
    type: "customer.updated",
    signature: "valid",
    result: "no match",
    resultDetail: "No enabled source or wildcard rule matched this event type.",
    dedupeKey: "stripe_like:demo_customer_1039",
    rawBodyHash: "sha256:eb50…e122",
    payload: { id: "demo_customer_1039", type: "customer.updated", fields_changed: 2 },
    evidence: [
      { label: "Trust check", value: "Timestamped signature valid" },
      { label: "Persistence", value: "Accepted event stored once" },
      { label: "Rule result", value: "evaluated → no_match" },
    ],
    history: [
      { label: "Verified", detail: "The signed request was accepted as authentic demonstration input." },
      { label: "Stored", detail: "No alert was required for the event to remain searchable." },
      { label: "Evaluated", detail: "A no_match outcome documented the decision." },
    ],
  },
] as const;

export const webhookAlertRules = [
  {
    name: "Invoice paid events",
    source: "generic",
    condition: "prefix · invoice.",
    action: "database only",
    cooldown: "60 seconds",
    trigger: "A generic event type begins with invoice.",
    evidence: "source + event.type + lastFiredAt",
    operatorAction: "Inspect the event and its persisted AlertRun outcome.",
    limitation: "Cooldown state is stored on one rule row; evaluation is synchronous.",
  },
  {
    name: "Any failed event",
    source: "all sources",
    condition: "contains · failed",
    action: "database only",
    cooldown: "none",
    trigger: "An event type from any source contains failed.",
    evidence: "wildcard source + event.type",
    operatorAction: "Open the event detail and correlate payload evidence with the run note.",
    limitation: "String matching is intentionally simple; it is not a query language.",
  },
  {
    name: "Slack invoice alert",
    source: "generic",
    condition: "prefix · invoice.",
    action: "optional Slack webhook",
    cooldown: "configurable",
    trigger: "A matching rule is configured with slack_webhook delivery.",
    evidence: "AlertRun status + delivery note",
    operatorAction: "Use the persisted note to distinguish a rule match from delivery failure.",
    limitation: "Slack is the only external alert adapter, and failure is recorded—not retried automatically.",
  },
] as const;

export const webhookTopology = [
  { label: "Webhook source", responsibility: "Sends a raw request using the generic or timestamped demonstration signature format.", input: "Provider payload", output: "Raw bytes + signature header", signal: "source, IP, user agent", tradeoff: "Only two demonstration formats are implemented." },
  { label: "Ingestion route", responsibility: "Applies source routing, request limiting, payload parsing, and response semantics.", input: "POST /api/webhooks/[source]", output: "200, 400, 401, 404, 429, or 500", signal: "structured route logs", tradeoff: "The rate limiter is process-local and unsuitable for multi-instance coordination." },
  { label: "Signature + dedupe", responsibility: "Authenticates exact raw bytes and derives a deterministic identity from the external ID or payload hash.", input: "Raw body + source secret", output: "verified request + dedupe key", signal: "signature reason, raw-body hash", tradeoff: "Rejected signatures never enter the event ledger." },
  { label: "PostgreSQL ledger", responsibility: "Persists events, rules, and every alert evaluation for later inspection.", input: "Verified event + rule outcomes", output: "durable operator evidence", signal: "Event and AlertRun records", tradeoff: "Schema changes and migrations become operational work." },
  { label: "Rule evaluator", responsibility: "Matches exact, prefix, or contains rules and applies cooldown state.", input: "Stored event + applicable rules", output: "fired, cooldown, disabled, or no_match", signal: "one AlertRun per evaluation", tradeoff: "Evaluation currently shares the ingestion request path." },
  { label: "Operator dashboard", responsibility: "Filters events and exposes payload, dedupe identity, signature state, and alert history.", input: "Protected database reads", output: "diagnostic evidence", signal: "event detail and run notes", tradeoff: "Clerk identity and server authorization are required for real operation." },
  { label: "Slack boundary", responsibility: "Optionally sends a structured alert when a slack_webhook rule fires.", input: "Rule + event context", output: "Slack request or recorded failure", signal: "slack_failed note", tradeoff: "No durable retry queue or second external channel is implemented." },
  { label: "Admin replay", responsibility: "Re-evaluates one stored event through the same rule engine.", input: "Authorized event ID", output: "new AlertRun rows + summary", signal: "evaluatedRules, fired, runsCreated", tradeoff: "Replay is manual and can create new evaluation history." },
] as const;

export const webhookDecisions = [
  { title: "Verify before parsing", problem: "JSON can be reformatted without changing its meaning, but signatures protect bytes.", approach: "Read the raw request body and verify its source-specific HMAC before parsing or persistence.", alternative: "Parse first and verify a reconstructed payload.", cost: "The route must preserve exact raw-body semantics." },
  { title: "Give every accepted event one identity", problem: "Providers can deliver the same event more than once.", approach: "Use a source-scoped external ID, or a deterministic payload hash when no ID exists, behind a unique database key.", alternative: "Insert every delivery and reconcile later.", cost: "Payload-hash identity depends on deterministic serialization when no provider ID exists." },
  { title: "Record every rule outcome", problem: "A missing notification does not reveal whether a rule failed to match, was disabled, or hit cooldown.", approach: "Persist fired, skipped_cooldown, disabled, and no_match outcomes as AlertRun rows.", alternative: "Store only alerts that fired.", cost: "More rows are written, and retention policy is still future work." },
  { title: "Keep ingestion accepted when Slack fails", problem: "Turning an alert-channel outage into webhook retries can amplify duplicate traffic.", approach: "Record slack_failed in the run note while preserving the accepted event response.", alternative: "Return a provider-facing failure and request redelivery.", cost: "There is no automatic delivery retry in the current implementation." },
  { title: "Reuse the evaluator for replay", problem: "A separate replay implementation can drift from ingestion behavior.", approach: "Admin replay calls the same rule evaluator used by new events.", alternative: "Build a replay-only execution path.", cost: "Replay observes current rules and cooldown state, not a historical rules snapshot." },
] as const;

export const webhookTechnologies = [
  { name: "Next.js 16", role: "App Router pages, protected operations UI, webhook ingestion, health, and replay routes.", evidence: "src/app + route handlers" },
  { name: "Prisma + PostgreSQL", role: "Unique event identity, JSON payload storage, rules, cooldown state, and AlertRun history.", evidence: "prisma/schema.prisma" },
  { name: "Clerk", role: "Authenticated operator access and server-enforced admin authorization.", evidence: "requireSessionUser / requireAdminUser" },
  { name: "Zod", role: "Server-side validation for alert-rule creation and updates.", evidence: "alert action schemas" },
  { name: "Vitest", role: "Repeatable signature, ingestion, dedupe, replay, and Slack-delivery behavior.", evidence: "tests/ + smoke script" },
] as const;

export const webhookLimitations = [
  "The event stream shown here is clearly labeled representative synthetic data, not production traffic.",
  "Request limiting is held in process memory and is not shared across instances.",
  "Rule evaluation and optional Slack delivery run synchronously during ingestion.",
  "Only generic and stripe-like signature demonstrations are implemented.",
  "Slack is the only external alert adapter; failed delivery is recorded without an automatic retry queue.",
  "The repository makes no production-scale, uptime, traffic-volume, or guaranteed-delivery claim.",
] as const;
