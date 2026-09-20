import { Link } from "@opentf/web";
import Icon from "./Icon.jsx";
import { divisions, docCount } from "../data/projects.js";

// Landing page body for a document kind (proposals / specifications): a short hero
// and one card per division linking to that division's index.
export default function DocLandingSection(props) {
  const kind = props.kind;

  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Open Tech Foundation
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            {kind.label}
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            {kind.blurb}
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-3xl mx-auto grid gap-5">
          {divisions.map((d) => (
            <Link
              key={d.id}
              href={`${kind.route}/${d.id}`}
              class="relative group flex items-center justify-between gap-4 p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] transition-colors hover:border-[var(--otfw-accent)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]/20"
            >
              <div class="space-y-2">
                <div class="flex items-center gap-2.5">
                  <Icon name={d.icon} size={18} weight={2} />
                  <h2 class="text-lg font-bold text-[var(--otfw-text)] group-hover:text-[var(--accent-text)] transition-colors">
                    {d.name} {kind.heading}
                  </h2>
                </div>
                <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                  {d.blurb}
                </p>
              </div>

              <div class="flex shrink-0 flex-col items-end gap-3">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full border border-[var(--otfw-border)] text-xs font-bold text-[var(--otfw-text-muted)]"
                >
                  {docCount(kind.id, d.id)}
                  <span class="ml-1 font-medium lowercase">
                    {kind.nounPlural}
                  </span>
                </span>
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)]">
                  {kind.readCta}
                  <Icon name="arrow" size={13} weight={2.4} />
                </span>
              </div>
            </Link>
          ))}

          <div class="flex justify-center pt-6">
            <a
              href={kind.repo}
              target="_blank"
              rel="noreferrer noopener"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
            >
              <Icon name="github" size={16} />
              {kind.submitCta}
              <span class="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}