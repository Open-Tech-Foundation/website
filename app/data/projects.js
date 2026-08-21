// Curated project index, hand-maintained on purpose: the GitHub API would give us star
// counts and one-line blurbs, but not the framing — which projects are ready to use,
// what each one is *for*, and how they group. Star counts are deliberately absent.
//
// ── Adding or promoting a project ──────────────────────────────────────────────
//   featured: true   → shows on the home page, inside its division's tab
//   banner: "/img/banners/<name>.svg"
//                    → optional artwork on the home-page card. Omit it and the card
//                      draws a generated monogram panel instead, so a project never
//                      looks unfinished for want of an image.
//   division:        → "software" | "hardware" (which home/index tab it lives under)
//   category:        → must match a `categories` id belonging to that same division
//   license:         → SPDX id as published on the repository — verify it there rather
//                      than assuming; the projects are not on a single licence
//   status:          → "draft"             specified on paper, not yet implemented
//                      "under-development" actively being built, nothing released yet
//                      "alpha"             early; the API can still change without notice
//                      "beta"              published and usable, API still settling
//                      "stable"            API committed, safe to depend on

const GH = "https://github.com/Open-Tech-Foundation";

// Top-level split shown as tabs on the home page and the project index. Software leads
// because it is where nearly all the work currently is; hardware is a newer strand that
// so far exists as proposals rather than repositories.
export const divisions = [
  {
    id: "software",
    name: "Software",
    icon: "code",
    blurb:
      "Runtimes, frameworks, libraries, and tools — open source, developed in public.",
  },
  {
    id: "hardware",
    name: "Hardware",
    icon: "chip",
    blurb:
      "Open standards for the physical devices we all use, starting with the ones nobody has revisited in decades.",
  },
];

export const categories = [
  {
    id: "web",
    division: "software",
    name: "Web",
    blurb: "The browser and what runs inside it — software people use directly.",
  },
  {
    id: "web-development",
    division: "software",
    name: "Web Development",
    blurb: "Frameworks, runtimes, and libraries for building on the web.",
  },
  {
    id: "developer-tools",
    division: "software",
    name: "Developer Tools",
    blurb: "Command-line tools for building, releasing, and maintaining code.",
  },
  {
    id: "data",
    division: "software",
    name: "Data",
    blurb: "Storage and query engines.",
  },
  {
    id: "media",
    division: "software",
    name: "Media",
    blurb: "Image and media processing.",
  },
];

export const projects = [
  // ── Web ─────────────────────────────────────────────────────────────────────
  {
    id: "web-browser",
    name: "Web Browser",
    division: "software",
    category: "web",
    status: "under-development",
    lang: "Rust",
    license: "AGPL-3.0",
    featured: true,
    banner: "/img/banners/web-browser.svg",
    tagline: "A fast, privacy-focused browser powered by our own rendering engine.",
    detail:
      "A browser built around an in-house rendering engine, designed from first principles — privacy protection and resource frugality are starting requirements, not extensions bolted on later. No Chromium base, no inherited code the foundation does not control.",
    href: `${GH}/Web-Browser`,
    site: "https://browser.opentechf.org",
  },
  {
    id: "es-runtime",
    name: "ES Runtime",
    division: "software",
    category: "web-development",
    status: "alpha",
    lang: "Rust",
    license: "Apache-2.0",
    featured: true,
    banner: "/img/banners/es-runtime.svg",
    tagline: "A V8-based ECMAScript runtime — WinterTC-compliant and I/O-injectable.",
    detail:
      "A server-side JavaScript runtime whose I/O layer is supplied by the embedder rather than baked in, so the same code can run against different host capabilities.",
    href: `${GH}/ES-Runtime`,
    site: "https://esrun.opentechf.org",
  },
  {
    id: "workeros",
    name: "WorkerOS",
    division: "software",
    category: "web",
    status: "under-development",
    lang: "JavaScript",
    license: "Apache-2.0",
    featured: false,
    banner: "/img/banners/workeros.svg",
    tagline: "A real kernel that runs JS and WASM as a native executable format.",
    detail:
      "Processes, scheduling, and isolation in the browser — treating JavaScript and WebAssembly modules the way an operating system treats binaries.",
    href: `${GH}/WorkerOS`,
  },
  {
    id: "office-docs-viewer",
    name: "Office Docs Viewer",
    division: "software",
    category: "web",
    status: "under-development",
    lang: "Rust",
    license: "AGPL-3.0",
    featured: false,
    banner: "/img/banners/office-docs-viewer.svg",
    tagline: "A high-fidelity viewer for documents, spreadsheets, and presentations.",
    detail:
      "Renders office formats faithfully without a proprietary runtime, so archived documents stay readable independently of the software that produced them.",
    href: `${GH}/office-docs-viewer`,
  },

  // ── Web Development ─────────────────────────────────────────────────────────
  {
    id: "web-app-framework",
    name: "OTF Web",
    division: "software",
    category: "web-development",
    status: "alpha",
    lang: "Rust",
    license: "MIT",
    featured: true,
    banner: "/img/banners/otf-web.svg",
    tagline: "A high-performance, zero-VDOM framework that compiles JSX to native DOM.",
    detail:
      "Components compile to standard Custom Elements and a state change updates only the DOM node bound to it — no virtual tree, no reconciliation pass. File-based routing, SSR, static generation, and MDX included. This site is built with it.",
    href: `${GH}/Web-App-Framework`,
    site: "https://web.opentechf.org",
    npm: "@opentf/web",
  },
  {
    id: "js-std",
    name: "JS Standard Library",
    division: "software",
    category: "web-development",
    status: "beta",
    lang: "TypeScript",
    license: "MIT",
    featured: true,
    banner: "/img/banners/js-std.svg",
    tagline: "The modern JavaScript standard library.",
    detail:
      "A lightweight, high-accuracy, runtime-agnostic collection of the utilities JavaScript never shipped with — strings, arrays, objects, dates, types, and async helpers.",
    href: `${GH}/js-std`,
    site: "https://js-std.opentechf.org/",
    npm: "@opentf/std",
  },
  {
    id: "obj-diff",
    name: "obj-diff",
    division: "software",
    category: "web-development",
    status: "beta",
    lang: "TypeScript",
    license: "MIT",
    featured: false,
    banner: "/img/banners/obj-diff.svg",
    tagline: "Fast, accurate JavaScript object diffing and patching.",
    detail:
      "Computes a minimal diff between two object graphs and applies it back as a patch — handling circular references, Maps, Sets, and typed arrays correctly.",
    href: `${GH}/obj-diff`,
    site: "https://obj-diff.opentechf.org/",
    npm: "@opentf/obj-diff",
  },
  {
    id: "syntax-highlighter",
    name: "Syntax Highlighter",
    division: "software",
    category: "web-development",
    status: "under-development",
    lang: "JavaScript",
    license: "MIT",
    featured: false,
    tagline: "A JavaScript syntax highlighter built on the CSS Custom Highlight API.",
    detail:
      "Highlights code without injecting a single wrapper element — the CSS Custom Highlight API does the painting, so the DOM stays exactly as authored and large documents stay fast.",
    href: `${GH}/Syntax-Highlighter`,
  },
  {
    id: "immutate",
    name: "immutate",
    division: "software",
    category: "web-development",
    status: "beta",
    lang: "TypeScript",
    license: "MIT",
    featured: false,
    banner: "/img/banners/immutate.svg",
    tagline: "Lightweight, high-performance immutability for JavaScript.",
    detail:
      "Write plain mutable code against a draft and get an immutable result, with structural sharing so unchanged subtrees keep their identity.",
    href: `${GH}/immutate`,
    npm: "@opentf/immutate",
  },

  // ── Developer Tools ─────────────────────────────────────────────────────────
  {
    id: "tsr",
    name: "tsr",
    division: "software",
    category: "developer-tools",
    status: "alpha",
    lang: "Rust",
    license: "MIT",
    featured: true,
    banner: "/img/banners/tsr.svg",
    tagline: "A lightweight, polyglot, repo-aware task runner.",
    detail:
      "One task runner across languages and package managers — it reads what the repository already declares instead of asking you to restate it.",
    href: `${GH}/tsr`,
    site: "https://tsr.opentechf.org",
  },
  {
    id: "regex-compiler",
    name: "regex-compiler",
    division: "software",
    category: "developer-tools",
    status: "under-development",
    lang: "JavaScript",
    license: "MIT",
    featured: false,
    banner: "/img/banners/regex-compiler.svg",
    tagline: "A regex builder that turns a human-friendly DSL into optimized expressions.",
    detail:
      "Describe a pattern in readable terms and get a correct, optimized regular expression out — so the intent stays legible long after the pattern is written.",
    href: `${GH}/regex-compiler`,
    npm: "@opentf/regex-compiler",
  },
  {
    id: "release",
    name: "release",
    division: "software",
    category: "developer-tools",
    status: "alpha",
    lang: "Rust",
    license: "MIT",
    featured: true,
    banner: "/img/banners/release.svg",
    tagline: "A manual-bump, changelog-aware release CLI for single projects and monorepos.",
    detail:
      "Versioning stays an explicit decision, not a side effect of commit-message parsing. Generates changelogs and coordinates releases across a workspace.",
    href: `${GH}/release`,
  },

  // ── Data ────────────────────────────────────────────────────────────────────
  {
    id: "edb",
    name: "edb",
    division: "software",
    category: "data",
    status: "under-development",
    lang: "Rust",
    license: "Apache-2.0",
    featured: false,
    banner: "/img/banners/edb.svg",
    tagline: "An embedded, single-file relational database with a structured query interface.",
    detail:
      "Relational storage in one file, queried through a structured (non-SQL) interface rather than string parsing — removing a whole class of injection and parsing overhead.",
    href: `${GH}/edb`,
  },

  // ── Media ───────────────────────────────────────────────────────────────────
  {
    id: "pixels",
    name: "Pixels",
    division: "software",
    category: "media",
    status: "under-development",
    lang: "Rust",
    license: "Apache-2.0",
    featured: false,
    banner: "/img/banners/pixels.svg",
    tagline: "A streaming, demand-driven image processing engine.",
    detail:
      "Processes images as a pull-based stream, so only the pixels actually needed are decoded and transformed — bounded memory regardless of source size.",
    href: `${GH}/Pixels`,
  },
  {
    id: "2d-engine",
    name: "2D Engine",
    division: "software",
    category: "media",
    status: "under-development",
    lang: "Rust",
    license: "Apache-2.0",
    featured: false,
    tagline: "A 2D vector graphics engine with immutable scenes.",
    detail:
      "Scenes are immutable values that render to raster or vector targets — build once, draw many times, and never mutate a scene graph that is already on screen.",
    href: `${GH}/2D-Engine`,
  },
];

export const STATUS = {
  draft: {
    label: "Draft",
    hint: "specified on paper, not yet implemented",
    cls: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25",
  },
  "under-development": {
    label: "Under Development",
    hint: "actively being built, nothing released yet",
    cls: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
  },
  alpha: {
    label: "Alpha",
    hint: "early — the API can still change without notice",
    cls: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25",
  },
  beta: {
    label: "Beta",
    hint: "published and usable, API still settling",
    cls: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  stable: {
    label: "Stable",
    hint: "API committed, safe to depend on",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
};

// The scale in progression order — the index legend renders straight from this, so the
// badge styling and its explanation can never drift apart.
export const STATUS_ORDER = [
  "draft",
  "under-development",
  "alpha",
  "beta",
  "stable",
];

// Category lookup by id — the cards use it to show a category tag where there is no
// category heading above them (the home page grid).
export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

export const projectById = (id) => projects.find((p) => p.id === id);

export const projectsIn = (division) =>
  projects.filter((p) => p.division === division);

export const featuredIn = (division) =>
  projects.filter((p) => p.division === division && p.featured);

export const categoriesIn = (division) =>
  categories
    .filter((c) => c.division === division)
    .map((c) => ({ ...c, items: projects.filter((p) => p.category === c.id) }));

// ── Proposals ─────────────────────────────────────────────────────────────────
// Mirrored by hand from the Open-Tech-Foundation/Proposals repository (it has no API
// surface beyond its file tree) so the site can show a count per division and a
// readable index without a build-time fetch. Add a proposal here with the same id and
// status it has upstream.
//
// Statuses are the Proposals repository's own scale, shared with specifications below:
// Draft · Review · Accepted · Rejected · Superseded.

export const PROPOSALS_REPO = "https://github.com/Open-Tech-Foundation/Proposals";

export const DOC_STATUS = {
  Draft: {
    label: "Draft",
    hint: "Initial proposal open for discussion",
    cls: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  Review: {
    label: "Review",
    hint: "Under active feedback and revision",
    cls: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25",
  },
  Accepted: {
    label: "Accepted",
    hint: "Considered stable by maintainers",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
  Rejected: {
    label: "Rejected",
    hint: "Not currently recommended",
    cls: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
  },
  Superseded: {
    label: "Superseded",
    hint: "Replaced by a newer proposal",
    cls: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/25",
  },
};

export const proposals = [
  {
    id: "0001",
    division: "hardware",
    title: "Modernizing the Standard PC Keyboard Utility Cluster",
    status: "Draft",
    summary:
      "Repurposes two keys almost nobody uses — Scroll Lock and Pause/Break — as dedicated microphone-mute and media play/pause controls. No keys are added or removed, and the physical layout is unchanged; the proposal specifies conformance requirements so the behaviour is identical across vendors.",
    href: `${PROPOSALS_REPO}/blob/main/proposals/0001-standard-keyboard-media-keys/README.md`,
  },
];

export const proposalsIn = (division) =>
  proposals.filter((p) => p.division === division);

export const proposalCount = (division) => proposalsIn(division).length;

// ── Open specifications ───────────────────────────────────────────────────────
// Formats and standards the foundation specifies in public. Listed per division and
// surfaced beside proposals on the home page and the project index. A specification is
// a document with its own repository, not a project entry — it graduates into
// `projects` if and when it grows an implementation worth listing on its own.

export const specifications = [
  {
    id: "stf",
    division: "software",
    title: "STF — Structured Text Format",
    status: "Draft",
    summary:
      "A human-readable, structured data format for configuration: unambiguous to parse, forgiving to edit, and readable in a diff. Designed to be written and reviewed by people rather than generated and regretted.",
    license: "CC0-1.0",
    href: "https://github.com/Open-Tech-Foundation/STF",
    site: "https://stf.opentechf.org/",
  },
];

export const specificationsIn = (division) =>
  specifications.filter((s) => s.division === division);

export const specificationCount = (division) => specificationsIn(division).length;

// ── Document kinds ────────────────────────────────────────────────────────────
// Proposals and specifications are the same thing structurally — a numbered document
// with a status, summarised and linked. This table holds everything that differs
// between them, so both get identical cards, routes, and index pages from one
// implementation.

export const DOC_KINDS = {
  proposals: {
    id: "proposals",
    label: "Proposals",
    heading: "proposals",
    plural: "proposals",
    itemLabel: "Proposal",
    icon: "doc",
    route: "/proposals",
    repo: PROPOSALS_REPO,
    noun: "open proposal",
    nounPlural: "open proposals",
    cta: "Read the proposals",
    emptyCta: "Read how to propose",
    readCta: "Read the proposal",
    submitCta: "Submit a proposal",
    blurb:
      "Practical, implementation-oriented proposals written in standards-style language — compatible with existing systems where possible, and open to discussion, revision, and community feedback.",
    emptyBody:
      "This is where proposals for this division will appear. If you have one, the repository takes submissions — a numbered folder and a clear README is the whole process.",
    items: proposalsIn,
  },
  specifications: {
    id: "specifications",
    label: "Open Specification",
    heading: "specifications",
    plural: "specifications",
    itemLabel: "Specification",
    icon: "spec",
    route: "/specifications",
    repo: "https://github.com/Open-Tech-Foundation",
    noun: "open specification",
    nounPlural: "open specifications",
    cta: "Read the specifications",
    emptyCta: "How specifications work",
    readCta: "Read the specification",
    submitCta: "Propose a specification",
    blurb:
      "Formats and standards specified in public, for anyone to implement. Each one is versioned in its own repository and open to revision through the same public review as everything else we publish.",
    emptyBody:
      "This is where specifications for this division will appear. Specifications start life as proposals — once one is accepted and stable enough to implement against, it graduates here.",
    items: specificationsIn,
  },
};

// Count for a kind within a division — what the lead cards display.
export const docCount = (kindId, division) =>
  DOC_KINDS[kindId].items(division).length;
