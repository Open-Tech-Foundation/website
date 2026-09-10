import { onMount } from "@opentf/web";
import CountCard from "./CountCard.jsx";
import Icon from "./Icon.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {
  categories,
  categoriesIn,
  categoryById,
  divisions,
  DOC_KINDS,
  docCount,
  projects,
  STATUS,
  STATUS_ORDER,
} from "../data/projects.js";

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
const PROJECT_LANGUAGES = [...new Set(projects.map((p) => p.lang).filter(Boolean))].sort();
const PROJECT_LICENSES = [...new Set(projects.map((p) => p.license).filter(Boolean))].sort();

const FILTER_SECTIONS = [
  { key: "status", label: "Status", options: STATUS_ORDER.map((key) => ({ value: key, label: STATUS[key].label })) },
  { key: "category", label: "Category" },
  { key: "lang", label: "Language", options: PROJECT_LANGUAGES.map((value) => ({ value, label: value })) },
  { key: "license", label: "License", options: PROJECT_LICENSES.map((value) => ({ value, label: value })) },
];

function FilterPanel(props) {
  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-bold text-[var(--otfw-text)]">Filter projects</p>
          <p class="mt-1 text-xs text-[var(--otfw-text-muted)]">
            Narrow the list by project details.
          </p>
        </div>
        <button
          type="button"
          onclick={props.onClear}
          disabled={!props.hasActiveFilters}
          class="shrink-0 text-xs font-semibold text-[var(--accent-text)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
        >
          Clear
        </button>
      </div>

      <div class="space-y-2">
        <label for={`project-search-${props.idPrefix}`} class="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--otfw-text-muted)]">
          Search
        </label>
        <input
          id={`project-search-${props.idPrefix}`}
          type="search"
          value={props.search}
          placeholder="Search projects"
          aria-label="Search projects"
          oninput={props.onSearch}
          class="w-full px-3 py-2 rounded-lg border border-[var(--otfw-border)] bg-[var(--otfw-bg)] text-sm text-[var(--otfw-text)] placeholder:text-[var(--otfw-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
        />
      </div>

      {props.sections.map((section) => (
        <fieldset key={section.key} class="space-y-3">
          <legend class="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--otfw-text-muted)]">
            {section.label}
          </legend>
          <div class="space-y-2.5">
            {section.options.map((option) => {
              const inputId = `project-filter-${props.idPrefix}-${section.key}-${option.value}`;

              return (
                <label key={option.value} for={inputId} class="flex items-center gap-2.5 text-sm text-[var(--otfw-text)] cursor-pointer">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={props.filters[section.key].includes(option.value)}
                    onchange={() => props.onToggle(section.key, option.value)}
                    class="size-4 accent-[var(--otfw-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] focus-visible:ring-offset-2"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default function DivisionTabs(props) {
  const groups = props.groups || [];
  // Software is index 0 in `divisions`, so it is the default active tab.
  let active = $state(0);
  let search = $state("");
  let filters = $state({ status: [], category: [], lang: [], license: [] });
  let filterBottom = $state(24);

  onMount(() => {
    function keepFilterAboveFooter() {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      filterBottom = 24 + overlap;
    }

    keepFilterAboveFooter();
    window.addEventListener("scroll", keepFilterAboveFooter, { passive: true });
    window.addEventListener("resize", keepFilterAboveFooter);

    return () => {
      window.removeEventListener("scroll", keepFilterAboveFooter);
      window.removeEventListener("resize", keepFilterAboveFooter);
    };
  });

  const activeDivision = () => divisions[active]?.id;

  function toggleFilter(key, value) {
    const selected = filters[key];
    filters = {
      ...filters,
      [key]: selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    };
  }

  function clearFilters() {
    search = "";
    filters = { status: [], category: [], lang: [], license: [] };
  }

  function filterOptions(section) {
    if (section.key !== "category") return section.options;

    return categories
      .filter((category) => category.division === activeDivision())
      .map((category) => ({ value: category.id, label: category.name }));
  }

  function hasActiveFilters() {
    return Boolean(search.trim()) || Object.values(filters).some((values) => values.length > 0);
  }

  function filterSections() {
    return FILTER_SECTIONS.map((section) => ({
      ...section,
      options: filterOptions(section) || [],
    })).filter((section) => section.options.length > 0);
  }

  function matchesProject(p) {
    const query = search.trim().toLowerCase();
    if (query) {
      const text = [
        p.name,
        p.tagline,
        p.detail,
        p.lang,
        p.license,
        categoryById[p.category]?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (!text.includes(query)) return false;
    }

    return Object.entries(filters).every(([key, values]) =>
      values.length === 0 || values.includes(p[key]),
    );
  }

  function onKeyDown(e, i) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + divisions.length) % divisions.length;
      active = next;
      document.getElementById(`division-tab-${divisions[next].id}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      active = 0;
      document.getElementById(`division-tab-${divisions[0].id}`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      active = divisions.length - 1;
      document.getElementById(`division-tab-${divisions[divisions.length - 1].id}`)?.focus();
    }
  }

  function scrollFilter(e) {
    const panel = e.currentTarget;
    if (panel.scrollHeight <= panel.clientHeight) return;

    panel.scrollTop += e.deltaY;
    e.preventDefault();
  }

  return (
    <div
      class={
        props.grouped
          ? "space-y-8 xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-10 xl:space-y-0"
          : "space-y-8"
      }
    >
      {props.grouped ? (
        <aside aria-label="Project filters" class="hidden xl:block">
          <div
            onwheel={scrollFilter}
            style={`bottom: ${filterBottom}px;`}
            class="fixed left-6 top-24 z-20 w-56 overflow-y-auto overscroll-contain rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-5 shadow-sm"
          >
            <FilterPanel
              idPrefix="desktop"
              sections={filterSections()}
              filters={filters}
              search={search}
              hasActiveFilters={hasActiveFilters()}
              onToggle={toggleFilter}
              onClear={clearFilters}
              onSearch={(e) => (search = e.currentTarget.value)}
            />
          </div>
        </aside>
      ) : null}

      {props.grouped ? (
        <details class="xl:hidden rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-5">
          <summary class="cursor-pointer text-sm font-bold text-[var(--otfw-text)]">
            Filter projects
          </summary>
          <div
            onwheel={scrollFilter}
            class="pt-5 max-h-[60vh] overflow-y-auto overscroll-contain"
          >
            <FilterPanel
              idPrefix="mobile"
              sections={filterSections()}
              filters={filters}
              search={search}
              hasActiveFilters={hasActiveFilters()}
              onToggle={toggleFilter}
              onClear={clearFilters}
              onSearch={(e) => (search = e.currentTarget.value)}
            />
          </div>
        </details>
      ) : null}

      <div class={props.grouped ? "min-w-0 space-y-8" : "contents"}>
      <div
        class="flex justify-center gap-2"
        role="tablist"
        aria-label="Project divisions"
      >
        {divisions.map((d, i) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`division-tab-${d.id}`}
            aria-selected={active === i}
            aria-controls={`division-panel-${d.id}`}
            tabindex={active === i ? 0 : -1}
            onkeydown={(e) => onKeyDown(e, i)}
            class={
              active === i
                ? "px-5 py-2 rounded-full border border-[var(--otfw-accent)] bg-[var(--otfw-accent-soft)] text-[var(--accent-text)] text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] focus-visible:ring-offset-2"
                : "px-5 py-2 rounded-full border border-[var(--otfw-border)] text-[var(--otfw-text-muted)] text-sm font-bold hover:border-[var(--otfw-accent)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] focus-visible:ring-offset-2"
            }
            onclick={() => (active = i)}
          >
            <span class="inline-flex items-center gap-2">
              <Icon name={d.icon} size={15} weight={2} />
              {d.name}
            </span>
          </button>
        ))}
      </div>

      {groups.map((g, i) => (
        <div
          key={g.division.id}
          id={`division-panel-${g.division.id}`}
          role="tabpanel"
          aria-labelledby={`division-tab-${g.division.id}`}
          hidden={active !== i}
          class={
            active === i
                ? "space-y-16 js-tabs"
                : "hidden js-tabs"
          }
        >
          {/* Documents lead the division: proposals, then specifications. */}
          <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {DOC_KIND_LIST.map((kind) => (
            <CountCard
                key={kind.id}
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
                .map((c) => ({
                  ...c,
                  items: c.items.filter(matchesProject),
                }))
                .filter((c) => c.items.length > 0)
                .map((c) => (
                  <section key={c.id} id={c.id} class="space-y-6 scroll-mt-24" aria-labelledby={`${c.id}-heading`}>
                    <div class="space-y-1.5">
                      <h3 id={`${c.id}-heading`} class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                        {c.name}
                      </h3>
                      <p class="text-sm text-[var(--otfw-text-muted)]">{c.blurb}</p>
                    </div>

                    <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                      {c.items.map((p, idx) => (
                        <ProjectCard key={p.id} item={p} banner={props.banner} eager={idx < 2 && g.division.id === divisions[0].id} />
                      ))}
                    </div>
                  </section>
                ))
            : (
              <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p, idx) => (
                  <ProjectCard
                    key={p.id}
                    item={p}
                    banner={props.banner}
                    category={true}
                    eager={idx < 3}
                  />
                ))}
              </div>
            )}

          {props.grouped && g.items.length > 0 && !g.items.some(matchesProject) ? (
            <p class="text-center text-sm text-[var(--otfw-text-muted)] py-4">
              No projects match “{search}”.
            </p>
          ) : null}

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
    </div>
  );
}
