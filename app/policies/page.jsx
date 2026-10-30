import { Link } from "@opentf/afw";

export const metadata = {
  title: "Policies",
  description:
    "Policies that apply to projects and operations of the Open Tech Foundation.",
  canonical: "/policies",
};

const POLICIES = [
  {
    title: "AI Policy",
    body: "Requirements for AI-assisted development across OTF projects — permitted usage, human decision-making and approval, verification, and human-controlled releases.",
    href: "/policies/ai-policy",
  },
  {
    title: "Open Source Policy",
    body: "Requirements for software projects developed, maintained, or officially published by OTF — licensing, dependencies, security and privacy, releases, and project independence.",
    href: "/policies/open-source",
  },
  {
    title: "Privacy Policy",
    body: "Privacy requirements for all OTF websites, applications, software projects, and services — including the zero-data-collection principle.",
    href: "/policies/privacy",
  },
  {
    title: "Security Policy",
    body: "Security requirements for software projects, websites, applications, and services developed, maintained, or operated by OTF.",
    href: "/policies/security-policy",
  },
];

export default function PoliciesPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--afw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--afw-text)]">
            Policies
          </h1>
          <p class="text-lg text-[var(--afw-text-muted)] leading-relaxed">
            The rules that guide how our projects are developed, maintained,
            funded, and governed.
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-3xl mx-auto space-y-4">
          {POLICIES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              class="block p-6 rounded-2xl border border-[var(--afw-border)] bg-[var(--afw-bg-surface)] space-y-1.5 hover:border-[var(--afw-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--afw-accent)]"
            >
              <h2 class="text-lg font-bold text-[var(--afw-text)]">
                {p.title}
              </h2>
              <p class="text-sm text-[var(--afw-text-muted)] leading-relaxed">
                {p.body}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
