import CountCard from "./CountCard.jsx";
import Icon from "./Icon.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { categoriesIn, divisions, DOC_KINDS, docCount } from "../data/projects.js";

// Software / Hardware switcher.
//
// Both panels are rendered and the inactive one is hidden, rather than swapped in on
// click: `otfw build --ssg` pre-renders whatever the markup contains, so this keeps
// every project in the static HTML for crawlers and for readers without JavaScript,
// while the tab itself stays a one-signal client-side toggle.
//
// Two layouts:
//   grouped   the full index — projects split into their categories, each with a heading
//   flat      the home page — a single grid of the division's featured projects
// The document kinds — proposals and specifications — always lead the division, above
// either layout.
//
// `groups` is [{ division, items }]; `items` is only read in flat mode, since grouped
// mode derives its sections from the category table.
const DOC_KIND_LIST = Object.values(DOC_KINDS);

export default function DivisionTabs(props) {
  const groups = props.groups || [];
  // Software is index 0 in `divisions`, so it is the default active tab.
  let active = $state(0);

  return (
    <div class="space-y-8">
      <div
        class="flex justify-center gap-2"
        role="tablist"
        aria-label="Project divisions"
      >
        {divisions.map((d, i) => (
          <button
            type="button"
            role="tab"
            id={`division-tab-${d.id}`}
            aria-selected={active === i}
            aria-controls={`division-panel-${d.id}`}
            class={
              active === i
                ? "px-5 py-2 rounded-full border border-[var(--otfw-accent)] bg-[var(--otfw-accent-soft)] text-[var(--accent-text)] text-sm font-bold transition-colors"
                : "px-5 py-2 rounded-full border border-[var(--otfw-border)] text-[var(--otfw-text-muted)] text-sm font-bold hover:border-[var(--otfw-accent)]/50 transition-colors"
            }
            onclick={() => (active = i)}
          >
            <span class="inline-flex items-center gap-2">
              <Icon name={d.icon} size={15} />
              {d.name}
            </span>
          </button>
        ))}
      </div>

      {groups.map((g, i) => (
        <div
          id={`division-panel-${g.division.id}`}
          role="tabpanel"
          aria-labelledby={`division-tab-${g.division.id}`}
          class={active === i ? "space-y-16" : "hidden"}
        >
          {/* Documents lead the division: proposals, then specifications. */}
          <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {DOC_KIND_LIST.map((kind) => (
              <CountCard
                icon={kind.icon}
                label={kind.label}
                href={`${kind.route}/${g.division.id}`}
                count={docCount(kind.id, g.division.id)}
                noun={kind.noun}
                nounPlural={kind.nounPlural}
                cta={kind.cta}
                emptyCta={kind.emptyCta}
              />
            ))}
          </div>

          {props.grouped
            ? categoriesIn(g.division.id)
                .filter((c) => c.items.length > 0)
                .map((c) => (
                  <section id={c.id} class="space-y-6 scroll-mt-24">
                    <div class="space-y-1.5">
                      <h2 class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                        {c.name}
                      </h2>
                      <p class="text-sm text-[var(--otfw-text-muted)]">{c.blurb}</p>
                    </div>

                    <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                      {c.items.map((p) => (
                        <ProjectCard item={p} compact={props.compact} banner={props.banner} />
                      ))}
                    </div>
                  </section>
                ))
            : (
              <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p) => (
                  <ProjectCard
                    item={p}
                    compact={props.compact}
                    banner={props.banner}
                    category={true}
                  />
                ))}
              </div>
            )}

          {g.items.length === 0 && categoriesIn(g.division.id).length === 0 ? (
            <p class="text-center text-sm text-[var(--otfw-text-muted)] py-4">
              No {g.division.name.toLowerCase()} repositories yet — this division starts
              as proposals, and becomes code once a proposal finds enough support to
              build.
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
