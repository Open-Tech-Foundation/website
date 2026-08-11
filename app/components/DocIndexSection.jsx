import { Link } from "@opentf/web";
import Icon from "./Icon.jsx";
import { DOC_STATUS } from "../data/projects.js";

// Index body shared by the proposals and specifications routes: same document shape
// (id, title, status, summary, href), same layout. The caller supplies the division and
// the wording.
export default function DocIndexSection(props) {
  const items = props.items || [];
  const division = props.division;
  const kind = props.kind;

  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            {division.name} · {kind.label}
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            {division.name} {kind.heading}
          </h1>
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
{kind.blurb}
          </p>
        </div>
      </section>

      <section class="px-6 py-16">
        <div class="max-w-3xl mx-auto space-y-4">
          {items.map((p) => (
            <div class="relative group p-6 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] cursor-pointer transition-colors hover:border-[var(--otfw-accent)]/40">
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-2">
                  <p class="font-mono text-xs text-[var(--otfw-text-muted)]">
                    {kind.itemLabel} {p.id}
                  </p>

                  <h2 class="text-lg font-bold text-[var(--otfw-text)]">
                    {/* Reading the document is the point, so the card leads to the
                        document's own site when it has one, and to the repository
                        otherwise. The overlay makes the whole card that link. */}
                    <a
                      href={p.site || p.href}
                      target="_blank"
                      rel="noreferrer"
                      class="card-link group-hover:text-[var(--accent-text)] transition-colors"
                    >
                      {p.title}
                    </a>
                  </h2>
                </div>
                <span
                  class={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${DOC_STATUS[p.status].cls}`}
                  title={DOC_STATUS[p.status].hint}
                >
                  {p.status}
                </span>
              </div>

              <p class="mt-3 text-sm text-[var(--otfw-text-muted)] leading-relaxed">
                {p.summary}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <span class="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-text)]">
                  {kind.readCta}
                  <Icon name="arrow" size={14} weight={2.4} />
                </span>

                {/* Raised above the overlay so the repository stays reachable when the
                    card itself points at the document's site. */}
                {p.site ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    class="relative z-10 inline-flex items-center gap-1.5 font-semibold text-[var(--otfw-text-muted)] hover:text-[var(--accent-text)] transition-colors"
                  >
                    <Icon name="github" size={14} />
                    Source
                  </a>
                ) : null}

                {p.license ? (
                  <span class="ml-auto text-[var(--otfw-text-muted)]">{p.license}</span>
                ) : null}
              </div>
            </div>
          ))}

          {items.length === 0 ? (
            <div class="p-10 rounded-2xl border border-dashed border-[var(--otfw-border)] text-center space-y-3">
              <h2 class="font-bold text-[var(--otfw-text)]">
                No {division.name.toLowerCase()} {kind.plural} yet
              </h2>
              <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed max-w-md mx-auto">
{kind.emptyBody}
              </p>
            </div>
          ) : null}

          <div class="flex flex-wrap justify-center gap-3 pt-6">
            <a
              href={kind.repo}
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-[var(--otfw-accent)] text-[var(--accent-on)] hover:opacity-90 transition-opacity"
            >
              <Icon name="github" size={16} />
              {kind.submitCta}
            </a>
            <Link
              href="/projects"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-[var(--otfw-border)] text-[var(--otfw-text)] hover:border-[var(--otfw-accent)] transition-colors"
            >
              Back to projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
