import Icon from "../components/Icon.jsx";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the Open Tech Foundation — general enquiries at contact@opentechf.org, project support at support@opentechf.org.",
  canonical: "/contact",
};

// Two addresses, deliberately separated: one for the foundation, one for the software.
const CHANNELS = [
  {
    icon: "mail",
    title: "General enquiries",
    body: "Questions, feedback, or collaboration ideas.",
    email: "contact@opentechf.org",
  },
  {
    icon: "spark",
    title: "Project support",
    body: "Need help with one of the projects?",
    email: "support@opentechf.org",
    note: "For bugs and feature requests, an issue on the project's repository will get a faster and more useful answer than email.",
  },
];

export default function ContactPage() {
  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Contact
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            We are a distributed, volunteer-run foundation — email is the front
            door.
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <div class="h-full flex flex-col gap-3 p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
              <span class="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--otfw-accent-soft)] text-[var(--accent-text)]">
                <Icon name={c.icon} size={20} />
              </span>

              <h2 class="text-base font-bold text-[var(--otfw-text)]">
                {c.title}
              </h2>

              <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                {c.body}
              </p>

              <a
                href={`mailto:${c.email}`}
                class="font-semibold text-[var(--accent-text)] hover:underline break-all"
              >
                {c.email}
              </a>

              {c.note ? (
                <p class="text-xs text-[var(--otfw-text-muted)] leading-relaxed border-t border-[var(--otfw-border)] pt-3 mt-auto">
                  {c.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section class="px-6 py-16 border-t border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
        <div class="max-w-2xl mx-auto text-center space-y-4">
          <h2 class="text-xl font-bold tracking-tight text-[var(--otfw-text)]">
            Security disclosures
          </h2>
          <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
            Found a vulnerability? Report it privately to{" "}
            <a
              href="mailto:security@opentechf.org"
              class="font-semibold text-[var(--accent-text)] hover:underline"
            >
              security@opentechf.org
            </a>{" "}
            rather than in a public issue, and we will coordinate a fix and
            disclosure with you.
          </p>
        </div>
      </section>
    </div>
  );
}
