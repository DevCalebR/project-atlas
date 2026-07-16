export const relayworksProgress = [
  { id: "problem", label: "The Problem" },
  { id: "pipeline", label: "The Pipeline" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Engineering Decisions" },
  { id: "results", label: "Results" },
  { id: "reflection", label: "Reflection" },
] as const;

export const relayworksPipeline = [
  {
    label: "Upload accepted",
    detail: "FastAPI validates that the file is a PDF, enforces the configured local upload limit, and writes it to local storage.",
    signal: "POST /jobs/convert",
  },
  {
    label: "Queued",
    detail: "The API creates JSON job metadata and immediately returns HTTP 202 with a status URL instead of holding the request open.",
    signal: "202 Accepted",
  },
  {
    label: "Preparing",
    detail: "A bounded local worker claims the job. The default concurrency is one conversion at a time for a developer machine.",
    signal: "worker: 1 slot",
  },
  {
    label: "Parsing with Marker",
    detail: "RelayWorks invokes the separately installed Marker CLI, reads the generated Markdown, and collects extracted images.",
    signal: "marker_single",
  },
  {
    label: "Transforming",
    detail: "The parser normalizes headings, paragraphs, tables, lists, code blocks, footnotes, and sections into one document model.",
    signal: "normalized model",
  },
  {
    label: "Exporting",
    detail: "One transformed document fans out to Markdown, clean HTML, structured JSON, plain text, a goal output, and a processing report.",
    signal: "6 artifacts",
  },
  {
    label: "Packaging",
    detail: "The exporter adds the artifacts and any extracted images to a predictably named ZIP package while preserving individual downloads.",
    signal: "relayworks-package.zip",
  },
  {
    label: "Ready",
    detail: "The job becomes completed, the status response exposes available downloads, and the interface stops polling.",
    signal: "status: completed",
  },
] as const;

export const relayworksArchitecture = [
  {
    name: "Next.js workspace",
    responsibility: "Owns goal selection, PDF upload, two-second status polling, output review, and downloads.",
    why: "The document workflow needs persistent interface state while a separate process performs conversion.",
    alternative: "The backend still has a legacy blocking endpoint, but the current frontend uses the background job API.",
    tradeoff: "Running a separate frontend and API adds local setup and an explicit CORS/API URL boundary.",
  },
  {
    name: "FastAPI boundary",
    responsibility: "Validates uploads, bounds file size, creates jobs, exposes status, and serves generated artifacts.",
    why: "File handling, subprocess work, and download responses stay behind a typed Python application boundary.",
    alternative: "A blocking /convert route remains for compatibility and small-document checks; it is not the recommended UI path.",
    tradeoff: "The frontend and backend must be started and configured as separate local services.",
  },
  {
    name: "Local job store",
    responsibility: "Persists one JSON metadata file per job using a temporary-file replacement before each update.",
    why: "It keeps the source-code kit inspectable and avoids requiring a database for local evaluation.",
    alternative: "A database-backed durable queue is intentionally not included in the current kit.",
    tradeoff: "The design is single-machine. Interrupted active jobs are marked failed instead of being resumed after restart.",
  },
  {
    name: "Bounded worker",
    responsibility: "Runs conversion outside the request lifecycle through a ThreadPoolExecutor with configurable concurrency.",
    why: "The real sample took 120.76 seconds to convert; keeping that work inside an HTTP request would make the interface brittle.",
    alternative: "The synchronous endpoint demonstrates the simpler path, but the primary workflow moved away from it.",
    tradeoff: "This is a local worker, not a distributed queue, so it does not provide horizontal scaling or job resumption.",
  },
  {
    name: "Marker CLI",
    responsibility: "Converts the PDF to Markdown and extracts images through a separately installed subprocess.",
    why: "RelayWorks wraps the conversion engine instead of rebuilding PDF layout and extraction logic.",
    alternative: "The parser command is configurable, but the current product does not bundle a second conversion engine.",
    tradeoff: "Installation and extraction quality depend on Marker, the source PDF, and the local runtime.",
  },
  {
    name: "Transformer + exporter",
    responsibility: "Normalizes content, applies goal templates, writes four base formats, and generates the report and goal output.",
    why: "A shared document model lets every artifact describe the same parse instead of running conversion repeatedly.",
    alternative: "The earliest baseline was PDF-to-Markdown only; the current implementation keeps Markdown while adding inspectable derivatives.",
    tradeoff: "Rule-based transforms preserve parser output—including extraction mistakes—so generated files still require review.",
  },
  {
    name: "Download package",
    responsibility: "Collects document.md, document.html, document.json, document.txt, the report, goal output, and images into one ZIP.",
    why: "A complete handoff is easier to archive or move into another workflow than a series of manual downloads.",
    alternative: "Every core format remains individually downloadable for workflows that need only one artifact.",
    tradeoff: "Packaging duplicates generated files in local ZIP storage and requires an explicit cleanup strategy outside the current kit.",
  },
] as const;

export const relayworksDecisions = [
  {
    title: "Background jobs instead of synchronous requests",
    question: "Why move conversion out of the request-response cycle?",
    answer: "The real five-page sample took 120.76 seconds in Marker. The current endpoint saves the upload, creates a job, returns HTTP 202, and lets the frontend poll honest lifecycle stages.",
    tradeoff: "The local JSON store and thread worker are understandable, but they are not a durable distributed queue. A restart marks active work interrupted rather than resuming it.",
  },
  {
    title: "Structured outputs, not one opaque conversion",
    question: "Why keep Markdown, JSON, HTML, and text?",
    answer: "Markdown is readable and model-friendly, JSON preserves programmatic structure, HTML supports rendered review, and text provides a low-friction search or ingestion format. All four come from the same normalized document.",
    tradeoff: "More artifacts increase testing and packaging work, and none of the formats can correct errors already present in the parser output.",
  },
  {
    title: "Local and self-hosted processing",
    question: "Why keep documents in the buyer's environment?",
    answer: "The source PDF, job metadata, generated outputs, and packages stay under the operator's control. The current workflow requires no API keys and does not depend on hosted storage.",
    tradeoff: "The operator owns Python, Node.js, Marker, filesystem permissions, capacity, upgrades, and cleanup. This is not a hosted multi-user service.",
  },
  {
    title: "One package containing multiple artifacts",
    question: "Why package the result instead of returning one file?",
    answer: "The same conversion can feed review, retrieval, display, search, or archival work. A fixed package layout makes the handoff predictable while individual download routes remain available.",
    tradeoff: "The package adds another stored artifact and may include outputs a particular downstream workflow does not need.",
  },
] as const;

export const relayworksOutputs = {
  markdown: `# Artificial Intelligence Risk Management Framework\n\n## Generative Artificial Intelligence Profile\n\nThis publication is available free of charge from:\nhttps://doi.org/10.6028/NIST.AI.600-1\n\nJuly 2024`,
  json: `{
  "metadata": {
    "filename": "NIST.AI.600-1-sample.pdf",
    "page_count": 5
  },
  "summary": {
    "word_count": 1006,
    "heading_count": 10,
    "table_count": 1,
    "image_count": 3
  },
  "content": {
    "headings": [
      "NIST Trustworthy and Responsible AI NIST AI 600-1",
      "Artificial Intelligence Risk Management Framework"
    ]
  }
}`,
  html: `<h2><strong>NIST Trustworthy and Responsible AI NIST AI 600-1</strong></h2>
<h1><strong>Artificial Intelligence Risk Management Framework</strong></h1>
<p>Generative Artificial Intelligence Profile</p>
<p>This publication is available free of charge from:
  https://doi.org/10.6028/NIST.AI.600-1
</p>`,
  report: `# RelayWorks Processing Report

## Processing Summary

- Successfully processed
- 5 pages
- 10 headings
- 1 tables
- 3 images
- 1064 words

## Generated Outputs

- Markdown generated
- Structured JSON generated
- Clean HTML generated
- Plain text generated
- Selected goal output generated
- Ready for AI workflows`,
} as const;
