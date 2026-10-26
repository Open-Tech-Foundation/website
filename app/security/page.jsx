export const metadata = {
  title: "Security",
  description:
    "Security policy, disclosure guidelines, and contact for reporting vulnerabilities in Open Tech Foundation projects.",
  canonical: "/security",
};

const TIMELINE = [
  { label: "Acknowledgement", value: "Within 3 business days" },
  { label: "Initial assessment", value: "Within 1 week" },
  { label: "Fix or mitigation", value: "90-day coordinated disclosure window" },
];

export default function SecurityPage() {
  return (
    <div class="w-full flex-1 flex flex-col">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Security
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            How to report vulnerabilities in OTF projects, and how we handle
            them.
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-3xl mx-auto space-y-12">
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-[var(--otfw-text)]">
              Reporting a vulnerability
            </h2>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              Please report vulnerabilities privately to{" "}
              <a
                href="mailto:security@opentechf.org"
                class="font-semibold text-[var(--accent-text)] hover:underline break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
              >
                security@opentechf.org
              </a>{" "}
              rather than in a public issue. Include a description of the issue,
              the affected project and version, and steps to reproduce it if
              possible.
            </p>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-[var(--otfw-text)]">
              What to expect
            </h2>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              We practise coordinated disclosure. A maintainer will acknowledge
              your report, investigate, and work on a fix; you are welcome to
              coordinate a public disclosure once a release is available.
            </p>
            <div class="grid gap-4 sm:grid-cols-3">
              {TIMELINE.map((t) => (
                <div
                  key={t.label}
                  class="p-5 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] space-y-1.5"
                >
                  <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--otfw-text-muted)]">
                    {t.label}
                  </p>
                  <p class="text-sm font-semibold text-[var(--otfw-text)] leading-relaxed">
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-[var(--otfw-text)]">
              Scope
            </h2>
            <p class="text-[var(--otfw-text-muted)] leading-relaxed">
              This process covers the open source projects published under the{" "}
              <a
                href="https://github.com/Open-Tech-Foundation"
                target="_blank"
                rel="noreferrer noopener"
                class="font-semibold text-[var(--accent-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
              >
                Open Tech Foundation
                <span class="sr-only">(opens in new tab)</span>
              </a>{" "}
              organization on GitHub. For anything else, reach out through the{" "}
              <a
                href="/contact"
                class="font-semibold text-[var(--accent-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
              >
                contact
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </section>

      <div class="mt-auto px-6 pb-12 flex items-center justify-center">
        <p class="text-xs text-[var(--otfw-text-muted)]">
          We appreciate responsible disclosure and will credit reporters by
          name unless they prefer to remain anonymous.
        </p>
      </div>
    </div>
  );
}
