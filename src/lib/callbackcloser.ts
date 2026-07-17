export const callbackTimeline = [
  {
    label: "Inbound call",
    event: "Twilio Voice receives a call to the business routing number and asks the application how to handle it.",
    why: "The phone provider is the first event source; the application does not poll for call activity.",
    challenge: "Preserve provider call identifiers so later status callbacks can update the same call record.",
    signal: "POST /api/twilio/voice",
  },
  {
    label: "No answer detected",
    event: "The dial-status callback reports a no-answer, busy, failed, canceled, or unaccepted voicemail outcome.",
    why: "Recovery should begin only when the business did not actually take the call.",
    challenge: "Voicemail pickup can look completed, so the flow can require a human press-1 acceptance signal.",
    signal: "DialCallStatus → MISSED",
  },
  {
    label: "Webhook authenticated",
    event: "The Next.js route validates the Twilio request, applies a rate limit, and attaches a correlation ID.",
    why: "A public webhook is a trust boundary, not just another form submission.",
    challenge: "Production fails closed when signature validation is not configured correctly.",
    signal: "X-Twilio-Signature",
  },
  {
    label: "Call + lead persisted",
    event: "Prisma upserts the call by provider identifiers and creates or reuses the lead associated with that call.",
    why: "Durable state lets delayed or repeated callbacks converge on one business event.",
    challenge: "Unique call and lead constraints must absorb provider retries without duplicating work.",
    signal: "Call.twilioCallSid / Lead.callId",
  },
  {
    label: "Eligibility checked",
    event: "The domain flow checks automation state, subscription status, usage limits, texting setup, and SMS consent.",
    why: "A missed call should still be recorded even when automated messaging is not allowed to continue.",
    challenge: "Billing, compliance, and operational controls must suppress side effects without losing the lead.",
    signal: "eligible | suppressed + reason",
  },
  {
    label: "Recovery SMS accepted",
    event: "Twilio Messaging accepts the first follow-up and the application records its provider SID and status callback.",
    why: "The caller receives a timely path to explain what they need without waiting on a manual callback.",
    challenge: "Accepted is not delivered; later message-status events preserve the actual delivery outcome.",
    signal: "smsState → AWAITING_SERVICE",
  },
  {
    label: "Qualification advances",
    event: "Each signed inbound SMS advances persisted state through service, urgency, location, and callback preference.",
    why: "The owner receives structured context rather than an unqualified phone number.",
    challenge: "Invalid replies need a useful retry prompt, while STOP, START, and HELP must take a compliance path.",
    signal: "AWAITING_* → COMPLETED",
  },
  {
    label: "Owner handoff created",
    event: "A qualified lead is claimed once, then owner SMS, optional email, and in-app notification adapters run together.",
    why: "The operational outcome is a callback-ready lead visible where the owner can act on it.",
    challenge: "Per-channel status must remain visible when one delivery path is skipped or fails.",
    signal: "Lead.status → NOTIFIED",
  },
] as const;

export const callbackArchitecture = [
  {
    label: "Twilio Voice",
    role: "Receives the call, forwards it, and emits voice and dial-status webhooks.",
    boundary: "External event source",
    tradeoff: "Provider delivery can be duplicated, delayed, or reordered.",
  },
  {
    label: "Next.js routes",
    role: "Authenticate Twilio callbacks and translate provider payloads into domain calls.",
    boundary: "Public trust boundary",
    tradeoff: "Request handlers must stay thin while still returning provider-safe responses.",
  },
  {
    label: "Missed-call flow",
    role: "Decides whether the call was missed, creates the lead, and gates recovery automation.",
    boundary: "Business rules",
    tradeoff: "More eligibility checks improve safety but create more explicit suppression states.",
  },
  {
    label: "Prisma + Postgres",
    role: "Persist calls, leads, messages, consent, subscriptions, notifications, and operator events.",
    boundary: "Durable system state",
    tradeoff: "Strong persistence improves retry safety but makes schema evolution operational work.",
  },
  {
    label: "Twilio Messaging",
    role: "Sends recovery and owner SMS, then reports delivery-state callbacks.",
    boundary: "Outbound provider adapter",
    tradeoff: "Provider acceptance and final delivery are separate states that must both be recorded.",
  },
  {
    label: "SMS state machine",
    role: "Turns replies into service, urgency, location, and callback-preference fields.",
    boundary: "Conversation orchestration",
    tradeoff: "A constrained flow is maintainable, but it must handle free-form and invalid replies clearly.",
  },
  {
    label: "Owner adapters",
    role: "Create SMS, optional email, and in-app notifications for a qualified lead.",
    boundary: "Operational handoff",
    tradeoff: "Parallel channels add resilience while requiring per-channel delivery visibility.",
  },
  {
    label: "Protected workspace",
    role: "Uses Clerk identity and business scope to show leads, conversation history, and outcomes.",
    boundary: "Tenant-facing operations",
    tradeoff: "Every read and action must preserve the business ownership boundary.",
  },
] as const;

export const callbackDecisions = [
  {
    title: "React to webhooks instead of polling",
    question: "Why let providers push state changes?",
    answer: "Call, SMS, and delivery-status changes originate in Twilio. Signed webhooks move those events directly into the application instead of repeatedly asking whether anything changed.",
    tradeoff: "The handlers must tolerate duplication, delay, reordering, authentication failures, and provider retry rules.",
  },
  {
    title: "Persist every conversation transition",
    question: "Why not keep qualification state in memory?",
    answer: "The lead stores the current SMS state and each message is persisted. Any later request can continue the conversation after a deploy, process restart, or long pause between replies.",
    tradeoff: "Every transition becomes a database operation, and schema changes must preserve existing conversations.",
  },
  {
    title: "Make duplicate delivery a normal case",
    question: "What happens when Twilio retries an event?",
    answer: "Provider SIDs, unique call identifiers, one lead per call, and notification timestamps turn repeated callbacks into no-ops or updates to the same record.",
    tradeoff: "Idempotency has to cover both persistence and external side effects; a unique row alone is not enough.",
  },
  {
    title: "Return retryable failures deliberately",
    question: "How are transient failures surfaced?",
    answer: "Webhook failures return retryable 5xx responses and correlation IDs. Delivery status is stored separately, while suppressed messaging records an operator-visible reason.",
    tradeoff: "Retries improve recovery but make deduplication and structured observability mandatory.",
  },
  {
    title: "Keep delivery request-bound—for now",
    question: "Why is there no durable job queue?",
    answer: "The current implementation performs messaging and owner-notification work inside application request workflows. That keeps the system understandable at its present scale.",
    tradeoff: "A durable queue would be the next boundary when volume, latency, or resumability makes request-bound delivery insufficient.",
  },
] as const;

export const callbackTechnologies = [
  { name: "Next.js 14", use: "App Router UI, protected workspace, admin tools, and Twilio/Stripe route handlers.", evidence: "app/, app/api/twilio/, app/api/stripe/" },
  { name: "Twilio", use: "Voice forwarding, call status, recovery SMS, inbound replies, and delivery callbacks.", evidence: "Voice + Messaging webhooks" },
  { name: "Prisma + Postgres", use: "Durable tenant, call, lead, message, consent, notification, subscription, and audit state.", evidence: "prisma/schema.prisma" },
  { name: "Clerk", use: "User identity and protected, business-scoped dashboard access.", evidence: "Authenticated app workspace" },
  { name: "Stripe", use: "Checkout, billing portal, signed subscription webhooks, and automation gating.", evidence: "Subscription state reconciliation" },
  { name: "Resend", use: "Optional transactional owner-email delivery alongside SMS and in-app alerts.", evidence: "Owner notification adapter" },
] as const;
