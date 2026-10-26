import { Link } from "@opentf/web";

export const metadata = {
  title: "Policies",
  description:
    "Policies that apply to projects and operations of the Open Tech Foundation.",
  canonical: "/policies",
};

const POLICIES = [
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
];

export default function PoliciesPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Policies
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
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
              class="block p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] space-y-1.5 hover:border-[var(--otfw-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
            >
              <h2 class="text-lg font-bold text-[var(--otfw-text)]">
                {p.title}
              </h2>
              <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                {p.body}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
