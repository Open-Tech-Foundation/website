export const metadata = {
  title: "Open Source Policy",
  description:
    "Requirements for software projects developed, maintained, or officially published by the Open Tech Foundation — licensing, dependencies, security and privacy, releases, and project independence.",
  canonical: "/policies/open-source",
};

const SECTIONS = [
  {
    title: "Purpose",
    paras: [
      "The Open Tech Foundation (OTF) develops and maintains open technologies with an emphasis on security, privacy, correctness, transparency, and long-term maintainability.",
      "This policy establishes the requirements for software projects developed, maintained, or officially published by OTF.",
    ],
  },
  {
    title: "Open Source Requirement",
    items: [
      "OTF-developed software must be released under an approved open-source license.",
      "The source code must be publicly available, subject to applicable legal and security restrictions.",
      "Users must be able to inspect, use, modify, and redistribute the software in accordance with its license.",
      "Project licenses must be clearly identified in the repository.",
      "License changes require explicit approval from the project maintainers and must comply with applicable legal obligations.",
    ],
  },
  {
    title: "Dependencies",
    paras: [
      "OTF aims to minimize external dependencies to reduce supply-chain risks, unnecessary complexity, and long-term maintenance burdens.",
    ],
    items: [
      "Dependencies must be evaluated for security, licensing, maintenance status, and necessity.",
      "Projects should prefer minimal dependencies and avoid introducing them when the required functionality can reasonably be implemented internally.",
      "Dependencies must not be added without appropriate review.",
      "Known vulnerabilities and relevant dependency updates must be assessed and addressed.",
      "External projects must not be incubated as OTF projects.",
    ],
  },
  {
    title: "Security and Privacy",
    paras: ["All projects must follow OTF's applicable security and privacy policies."],
    items: [
      "Security must be considered throughout design, development, testing, and maintenance.",
      "Software must not include undisclosed telemetry or hidden data collection.",
      "Projects must not collect usage data or transmit user information without an explicitly defined and approved justification consistent with OTF's privacy requirements.",
      "External services and network communication must be documented where applicable.",
    ],
  },
  {
    title: "Development and Releases",
    paras: [
      "OTF emphasizes correctness, intentional changes, and maintainability over pursuing speed or performance at the expense of correctness.",
    ],
    items: [
      "Releases must be performed by humans; automated release publication is not permitted.",
      "Projects must use Semantic Versioning where applicable.",
      "Release notes and changelogs must accurately describe the changes intentionally included in each release.",
      "Changes must undergo appropriate review and testing before release.",
      "Performance improvements must not compromise correctness, security, or privacy.",
    ],
  },
  {
    title: "Project Independence",
    paras: [
      "OTF welcomes technical collaboration with individuals, communities, and organizations, including enterprises.",
      "However, corporate sponsorship of individual OTF projects is not permitted. Collaboration must preserve the project's independence and comply with OTF's governance and funding policies.",
    ],
  },
  {
    title: "Compliance",
    paras: [
      "Projects maintained under OTF are expected to comply with this policy and other applicable OTF policies.",
      "Exceptions must be explicitly reviewed and approved by the appropriate OTF authority. Exceptions must not be used to bypass legal obligations or essential security and privacy requirements.",
      "OTF may review projects for compliance and require corrective action when necessary.",
    ],
  },
  {
    title: "Scope and Updates",
    paras: [
      "This policy applies to software projects developed, maintained, or officially published by the Open Tech Foundation.",
      "OTF may update this policy as its projects, technical requirements, and governance practices evolve. The published version on the official OTF website is the authoritative version.",
    ],
  },
];

function Section({ index, title, children }) {
  return (
    <section class="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[var(--otfw-border)] first:mt-0 first:pt-0 first:border-0">
      <h2 class="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-[var(--otfw-text)]">
        <span class="font-mono text-sm font-bold text-[var(--accent-text)] mr-3 align-middle">
          {index}
        </span>
        {title}
      </h2>
      <div class="space-y-4 text-[var(--otfw-text-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function OpenSourcePolicyPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Policy
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Open Source Policy
          </h1>
        </div>
      </section>

      <div class="px-6 py-16 md:py-20">
        <div class="max-w-3xl mx-auto">
          {SECTIONS.map((s, i) => (
            <Section key={s.title} index={String(i + 1).padStart(2, "0")} title={s.title}>
              {s.paras
                ? s.paras.map((p) => (
                    <p key={p} class="text-[var(--otfw-text-muted)]">
                      {p}
                    </p>
                  ))
                : null}
              {s.items ? (
                <ul class="list-disc pl-6 space-y-1.5 text-[var(--otfw-text-muted)]">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}
