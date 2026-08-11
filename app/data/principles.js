// The seven principles from the foundation's mission statement. Kept as data so the
// home page renders them from one source rather than hard-coding the list in markup.
//
// `summary` is the one-line form from the org README — used verbatim. `detail` expands
// it into what the principle actually obliges a project to do.
export const principles = [
  {
    id: "accessibility",
    name: "Accessibility",
    summary: "Usable by everyone",
    detail:
      "Software that excludes people is unfinished software. Interfaces are built to work with keyboards, screen readers, and assistive technology, at any zoom level, on modest hardware and slow connections.",
    icon: "accessibility",
  },
  {
    id: "interoperability",
    name: "Interoperability",
    summary: "Works across systems without lock-in",
    detail:
      "Open formats, documented protocols, and standard interfaces. Data goes in and comes back out again. Nothing we build depends on a single vendor, runtime, or platform to stay useful.",
    icon: "link",
  },
  {
    id: "privacy",
    name: "Privacy",
    summary: "Built to respect your privacy, with zero telemetry",
    detail:
      "No tracking, no analytics beacons, no phoning home. Our tools collect nothing about the people who run them — the default is silence, not an opt-out buried in a settings pane.",
    icon: "shield",
  },
  {
    id: "security",
    name: "Security",
    summary:
      "Built in from day one, with continuous hardening and ongoing vulnerability mitigation",
    detail:
      "Security is a design constraint, not a release-checklist item. Dependencies stay minimal and audited, memory-safe languages are preferred where they fit, and reported vulnerabilities are handled in the open.",
    icon: "lock",
  },
  {
    id: "transparency",
    name: "Transparency",
    summary: "Open, auditable, and trustworthy",
    detail:
      "Source, discussion, and decisions happen in public. Anyone can read the code that runs on their machine, follow the reasoning that shaped it, and hold the result to account.",
    icon: "eye",
  },
  {
    id: "sustainability",
    name: "Sustainability",
    summary:
      "Energy-efficient, resource-conscious, and built for long-term resilience",
    detail:
      "Performance is an environmental concern. Less compute, less memory, and less bandwidth per task means software that survives on old devices and costs less to run at every scale.",
    icon: "leaf",
  },
  {
    id: "community-governance",
    name: "Community Governance",
    summary: "Shaped by contributors, not control",
    detail:
      "Direction comes from the people doing the work. Roadmaps are public, proposals are open to anyone, and no single company holds a veto over what the projects become.",
    icon: "users",
  },
];
