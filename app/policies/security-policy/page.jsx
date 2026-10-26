export const metadata = {
  title: "Security Policy",
  description:
    "Security requirements for software projects, websites, applications, and services developed, maintained, or operated by the Open Tech Foundation.",
  canonical: "/policies/security",
};

const SECTIONS = [
  {
    title: "Purpose",
    paras: [
      "The Open Tech Foundation (OTF) is committed to developing and maintaining secure, reliable, and maintainable open-source software.",
      "This policy establishes security requirements for software projects, websites, applications, and services developed, maintained, or operated by OTF.",
      "Security must be considered throughout the software lifecycle, from design and development to release, maintenance, and end of support.",
    ],
  },
  {
    title: "Secure Development",
    paras: ["OTF projects must consider security as a fundamental part of their design and implementation."],
    items: [
      "Security risks must be considered during design and development.",
      "Projects must use appropriate validation, error handling, and access controls.",
      "Security boundaries must be clearly defined and enforced.",
      "Sensitive information, including credentials and cryptographic keys, must be protected from unauthorized access.",
      "Security-relevant changes must be reviewed and tested before release.",
      "Projects should minimize unnecessary functionality and privileges that could increase the attack surface.",
    ],
  },
  {
    title: "Dependencies and Supply-Chain Security",
    paras: ["OTF aims to minimize external dependencies to reduce supply-chain risks and unnecessary complexity."],
    items: [
      "Dependencies must be necessary for the project's intended functionality.",
      "Dependencies must be reviewed for security risks, licensing, maintenance status, and suitability.",
      "Known vulnerabilities in dependencies must be assessed and addressed appropriately.",
      "Projects should avoid unnecessary dependencies and prefer simpler implementations where practical.",
      "Build and release processes must be designed to reduce the risk of unauthorized modifications or compromised artifacts.",
      "Projects must not incorporate dependencies known to introduce unacceptable security risks.",
    ],
  },
  {
    title: "Access Control and Permissions",
    paras: ["Projects must apply appropriate access controls to protect their users and operating environments."],
    items: [
      "Access must be limited to the permissions required for intended functionality.",
      "Privileged operations must be restricted and explicitly controlled where appropriate.",
      "Applications must not assume that input, files, network responses, or other external resources are trustworthy.",
      "Security boundaries must not rely solely on application-level assumptions when stronger enforcement is available.",
      "Projects should use secure defaults and avoid granting unnecessary permissions.",
    ],
  },
  {
    title: "Vulnerability Reporting and Disclosure",
    paras: [
      "OTF maintains a dedicated process for reporting and handling security vulnerabilities.",
      {
        text: "Security vulnerabilities must be reported privately through the channels documented on the official OTF Security page:",
        link: { href: "https://opentechf.org/security", label: "https://opentechf.org/security" },
      },
      "Reporters should avoid publicly disclosing unpatched vulnerabilities before coordinated disclosure.",
      {
        text: "OTF will follow the acknowledgement, assessment, remediation, and disclosure procedures published on that page. The existing reporting process remains authoritative for reporting channels and disclosure timelines.",
      },
    ],
  },
  {
    title: "Vulnerability Assessment and Remediation",
    paras: [
      "Reported and discovered vulnerabilities must be assessed according to their potential impact, severity, exploitability, and affected users.",
    ],
    items: [
      "Security issues must be investigated and prioritized appropriately.",
      "Projects must take corrective action for confirmed vulnerabilities.",
      "Fixes must be tested to verify that they address the underlying issue.",
      "Where necessary, OTF may recommend mitigations or workarounds while a complete fix is being prepared.",
      "Security fixes must be communicated to affected users when appropriate.",
      "Related code and design must be reviewed to identify similar vulnerabilities.",
    ],
  },
  {
    title: "Releases and Updates",
    paras: ["OTF emphasizes intentional releases, correctness, and maintainability."],
    items: [
      "Releases must be performed by humans; automated release publication is not permitted.",
      "Security fixes must receive appropriate review and testing before release.",
      "Release notes and changelogs must accurately describe security-relevant changes, subject to responsible disclosure considerations.",
      "Published artifacts must correspond to the intended source and release.",
      "Projects should provide users with clear instructions for obtaining and applying security updates.",
      "Known, unresolved security risks must be considered when determining whether a release is suitable for publication.",
    ],
  },
  {
    title: "Security Maintenance",
    paras: ["Project maintainers must consider security throughout the supported lifetime of their projects."],
    items: [
      "Relevant security advisories and dependency vulnerabilities must be monitored.",
      "Security issues must be addressed within a timeframe appropriate to their severity.",
      "Projects should document support status and communicate when security maintenance ends.",
      "Unsupported projects must not be represented as receiving ongoing security maintenance.",
      "Significant changes to a project's threat model or security boundaries must receive appropriate review.",
    ],
  },
  {
    title: "Security Governance",
    paras: [
      "OTF centrally reviews and approves security-related implementation decisions that require organizational approval.",
      "Project maintainers are responsible for implementing and maintaining security requirements in their projects.",
      "OTF may review projects for compliance and require corrective action when security requirements are not met. Project-specific practices may supplement this policy but must not conflict with applicable OTF security requirements.",
    ],
  },
  {
    title: "Scope and Updates",
    paras: [
      "This policy applies to software projects, websites, applications, and services developed, maintained, or operated by OTF.",
      "OTF may update this policy as its projects and security requirements evolve. The version published on the official OTF website is the authoritative version.",
    ],
  },
];

function Para({ p }) {
  if (typeof p === "string") {
    return <p class="text-[var(--otfw-text-muted)]">{p}</p>;
  }
  return (
    <p class="text-[var(--otfw-text-muted)]">
      {p.text}{" "}
      <a
        href={p.link.href}
        target="_blank"
        rel="noreferrer noopener"
        class="font-semibold text-[var(--accent-text)] hover:underline break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
      >
        {p.link.label}
        <span class="sr-only">(opens in new tab)</span>
      </a>
    </p>
  );
}

export default function SecurityPolicyPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Policy
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Security Policy
          </h1>
        </div>
      </section>

      <div class="px-6 py-16 md:py-20">
        <div class="max-w-3xl mx-auto">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              class="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[var(--otfw-border)] first:mt-0 first:pt-0 first:border-0"
            >
              <h2 class="mt-12 mb-5 text-2xl md:text-3xl font-bold tracking-tight text-[var(--otfw-text)]">
                {s.title}
              </h2>
              <div class="space-y-4 text-[var(--otfw-text-muted)] leading-relaxed">
                {s.paras ? s.paras.map((p) => <Para key={typeof p === "string" ? p : p.text} p={p} />) : null}
                {s.items ? (
                  <ul class="list-disc pl-6 space-y-1.5 text-[var(--otfw-text-muted)]">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
