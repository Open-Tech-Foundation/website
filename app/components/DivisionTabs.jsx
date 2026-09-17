import { Link, onMount } from "@opentf/web";
import Icon from "./Icon.jsx";
import ProjectCard from "./ProjectCard.jsx";
import {
  categories,
  categoriesIn,
  categoryById,
  divisions,
  DOC_KINDS,
  DOC_STATUS,
  DOC_STATUS_ORDER,
  docCount,
  proposalsIn,
  specificationsIn,
  projects,
  STATUS,
  STATUS_ORDER,
} from "../data/projects.js";

const DOC_KIND_LIST = Object.values(DOC_KINDS);
const PROJECT_LANGUAGES = [...new Set(projects.map((p) => p.lang).filter(Boolean))].sort();
const PROJECT_LICENSES = [...new Set(projects.map((p) => p.license).filter(Boolean))].sort();
const PROJECT_STATUSES = STATUS_ORDER.map((key) => ({ value: key, label: STATUS[key].label }));
const DOC_STATUSES = DOC_STATUS_ORDER.map((key) => ({ value: key, label: DOC_STATUS[key].label }));

function FilterPanel(props) {
  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-bold text-[var(--otfw-text)]">Filter</p>
          <p class="mt-1 text-xs text-[var(--otfw-text-muted)]">Narrow the list.</p>
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
        <label for={`f-search-${props.idPrefix}`} class="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--otfw-text-muted)]">
          Search
        </label>
        <input
          id={`f-search-${props.idPrefix}`}
          type="search"
          value={props.search}
          placeholder="Search"
          aria-label="Search"
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
              const inputId = `f-${props.idPrefix}-${section.key}-${option.value}`;
              return (
                <label key={option.value} for={inputId} class="flex items-center gap-2.5 text-sm text-[var(--otfw-text)] cursor-pointer">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={props.filters[section.key]?.includes(option.value)}
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

function DocCard(props) {
  const p = props.item;
  const kind = props.kind;

  return (
    <div class="relative group p-4 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] transition-colors hover:border-[var(--otfw-accent)]/40 focus-within:border-[var(--otfw-accent)]/40 focus-within:ring-2 focus-within:ring-[var(--otfw-accent)]/20">
      <div class="flex items-start justify-between gap-2">
        <p class="font-mono text-[10px] text-[var(--otfw-text-muted)]">
          {kind.itemLabel} {p.id}
        </p>
        <span
          class={`shrink-0 inline-flex items-center px-1.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${DOC_STATUS[p.status].cls}`}
          title={DOC_STATUS[p.status].hint}
        >
          {p.status}
        </span>
      </div>

      <h3 class="mt-1.5 text-sm font-bold text-[var(--otfw-text)] leading-snug">
        <Link
          href={`${kind.route}/${p.division}/${p.id}`}
          class="card-link group-hover:text-[var(--accent-text)] focus-visible:outline-none focus-visible:text-[var(--accent-text)] transition-colors"
        >
          {p.title}
        </Link>
      </h3>

      <p class="mt-1.5 text-xs text-[var(--otfw-text-muted)] leading-relaxed line-clamp-2">
        {p.summary}
      </p>

      <div class="mt-2.5 flex items-center gap-3 text-[11px]">
        <span class="inline-flex items-center gap-1 font-semibold text-[var(--accent-text)]">
          {kind.readCta}
          <Icon name="arrow" size={11} weight={2.4} />
        </span>

        <a
          href={p.href}
          target="_blank"
          rel="noreferrer noopener"
          class="relative z-10 inline-flex items-center gap-1 font-semibold text-[var(--otfw-text-muted)] hover:text-[var(--accent-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded transition-colors"
        >
          <Icon name="github" size={11} />
          Source
        </a>
      </div>
    </div>
  );
}

export default function DivisionTabs(props) {
  const groups = props.groups || [];
  let active = $state(0);
  let contentTab = $state("projects");
  let search = $state("");
  let filters = $state({ status: [], category: [], lang: [], license: [], docStatus: [] });
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
    filters = { status: [], category: [], lang: [], license: [], docStatus: [] };
  }

  function hasActiveFilters() {
    return Boolean(search.trim()) || Object.values(filters).some((values) => values.length > 0);
  }

  function onKeyDown(e, i) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + divisions.length) % divisions.length;
      active = next;
      contentTab = "projects";
      document.getElementById(`division-tab-${divisions[next].id}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      active = 0;
      contentTab = "projects";
      document.getElementById(`division-tab-${divisions[0].id}`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      active = divisions.length - 1;
      contentTab = "projects";
      document.getElementById(`division-tab-${divisions[divisions.length - 1].id}`)?.focus();
    }
  }

  function scrollFilter(e) {
    const panel = e.currentTarget;
    if (panel.scrollHeight <= panel.clientHeight) return;
    panel.scrollTop += e.deltaY;
    e.preventDefault();
  }

  function matchesProject(p) {
    const q = search.trim().toLowerCase();
    if (q) {
      const text = [p.name, p.tagline, p.detail, p.lang, p.license, categoryById[p.category]?.name]
        .filter(Boolean).join(" ").toLowerCase();
      if (!text.includes(q)) return false;
    }
    return ["status", "category", "lang", "license"].every((key) =>
      filters[key].length === 0 || filters[key].includes(p[key]),
    );
  }

  function matchesDocument(p) {
    const q = search.trim().toLowerCase();
    if (q) {
      const text = [p.id, p.title, p.summary, p.status]
        .filter(Boolean).join(" ").toLowerCase();
      if (!text.includes(q)) return false;
    }
    if (filters.docStatus.length > 0 && !filters.docStatus.includes(p.status)) return false;
    return true;
  }

  // Reactive per-division lists and counts — called inside the JSX so the compiler
  // wraps them in effects that track the $state reads (contentTab, search, filters)
  // and rebuild the lists when any of them change.
  function categorySectionsFor(did) {
    return props.grouped && contentTab === "projects"
      ? categoriesIn(did)
          .map((c) => ({ ...c, items: c.items.filter(matchesProject) }))
          .filter((c) => c.items.length > 0)
      : [];
  }

  function docItemsFor(did) {
    return contentTab !== "projects"
      ? (contentTab === "proposals" ? proposalsIn(did) : specificationsIn(did)).filter(matchesDocument)
      : [];
  }

  function projectMatchCount(g) {
    return contentTab === "projects" ? g.items.filter(matchesProject).length : 0;
  }

  // Reactive getters: calling them inside the JSX lets the compiler track the
  // $state reads (contentTab, active, search, filters) so these re-compute on demand.
  function currentFilterSections() {
    if (contentTab !== "projects") {
      return [{ key: "docStatus", label: "Status", options: DOC_STATUSES }];
    }
    return [
      { key: "status", label: "Status", options: PROJECT_STATUSES },
      {
        key: "category",
        label: "Category",
        options: categories
          .filter((c) => c.division === divisions[active]?.id)
          .map((c) => ({ value: c.id, label: c.name })),
      },
      { key: "lang", label: "Language", options: PROJECT_LANGUAGES.map((v) => ({ value: v, label: v })) },
      { key: "license", label: "License", options: PROJECT_LICENSES.map((v) => ({ value: v, label: v })) },
    ].filter((s) => s.options.length > 0);
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
        <aside aria-label="Filters" class="hidden xl:block">
          <div
            onwheel={scrollFilter}
            style={`bottom: ${filterBottom}px;`}
            class="fixed left-6 top-24 z-20 w-56 overflow-y-auto overscroll-contain rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-5 shadow-sm"
          >
            <FilterPanel
              idPrefix="desktop"
              sections={currentFilterSections()}
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
            Filter
          </summary>
          <div
            onwheel={scrollFilter}
            class="pt-5 max-h-[60vh] overflow-y-auto overscroll-contain"
          >
            <FilterPanel
              idPrefix="mobile"
              sections={currentFilterSections()}
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
      {/* Heading + division tabs on same line */}
      {props.grouped ? (
        <div class="flex items-center justify-between gap-4">
          <div class="space-y-1.5">
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              What we build
            </p>
            <h1 class="text-3xl md:text-4xl font-black tracking-tight text-[var(--otfw-text)]">
              Projects
            </h1>
          </div>

          <div
            class="flex gap-2 shrink-0"
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
                onclick={() => { active = i; contentTab = "projects"; }}
              >
                <span class="inline-flex items-center gap-2">
                  <Icon name={d.icon} size={15} weight={2} />
                  {d.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
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
              onclick={() => { active = i; contentTab = "projects"; }}
            >
              <span class="inline-flex items-center gap-2">
                <Icon name={d.icon} size={15} weight={2} />
                {d.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Division panels */}
      {groups.map((g, i) => {
        const did = g.division.id;

        return (
          <div
            key={g.division.id}
            id={`division-panel-${did}`}
            role="tabpanel"
            aria-labelledby={`division-tab-${did}`}
            hidden={active !== i}
            class={active === i ? "space-y-8 js-tabs" : "hidden js-tabs"}
          >
            {/* Content tabs — the project index only; the home page lists featured projects flat */}
            {props.grouped ? (
              <div class="flex gap-1.5 p-1 mx-auto rounded-xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] w-fit">
                <button
                  type="button"
                  onclick={() => (contentTab = "projects")}
                  class={
                    contentTab === "projects"
                      ? "px-4 py-1.5 rounded-lg text-xs font-bold bg-[var(--otfw-accent-soft)] text-[var(--accent-text)] transition-colors"
                      : "px-4 py-1.5 rounded-lg text-xs font-bold text-[var(--otfw-text-muted)] hover:text-[var(--otfw-text)] transition-colors"
                  }
                >
                  Projects <span class="ml-1 text-[10px] font-semibold opacity-70">{g.items.length}</span>
                </button>
                {DOC_KIND_LIST.map((kind) => (
                  <button
                    key={kind.id}
                    type="button"
                    onclick={() => (contentTab = kind.id)}
                    class={
                      contentTab === kind.id
                        ? "px-4 py-1.5 rounded-lg text-xs font-bold bg-[var(--otfw-accent-soft)] text-[var(--accent-text)] transition-colors"
                        : "px-4 py-1.5 rounded-lg text-xs font-bold text-[var(--otfw-text-muted)] hover:text-[var(--otfw-text)] transition-colors"
                    }
                  >
                    {kind.label} <span class="ml-1 text-[10px] font-semibold opacity-70">{docCount(kind.id, did)}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {/* Projects content */}
            {contentTab === "projects" && (
              <div class="contents">
                {props.grouped
                  ? categorySectionsFor(did).map((c) => (
                      <section key={c.id} id={c.id} class="my-8 space-y-6 scroll-mt-24" aria-labelledby={`${c.id}-heading`}>
                        <div class="space-y-1.5">
                          <h3 id={`${c.id}-heading`} class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                            {c.name}
                          </h3>
                          <p class="text-sm text-[var(--otfw-text-muted)]">{c.blurb}</p>
                        </div>
                        <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                          {c.items.map((p, idx) => (
                            <ProjectCard key={p.id} item={p} banner={props.banner} eager={idx < 2 && did === divisions[0].id} />
                          ))}
                        </div>
                      </section>
                    ))
                  : (
                    <div class="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                      {g.items.map((p, idx) => (
                        <ProjectCard key={p.id} item={p} banner={props.banner} category={true} eager={idx < 3} />
                      ))}
                    </div>
                  )}

                {props.grouped && projectMatchCount(g) === 0 && categorySectionsFor(did).length === 0 && g.items.length > 0 && hasActiveFilters() ? (
                  <p class="text-center text-sm text-[var(--otfw-text-muted)] py-4">
                    No projects match your filters.
                  </p>
                ) : null}

                {g.items.length === 0 && categorySectionsFor(did).length === 0 ? (
                  <p class="text-center text-sm text-[var(--otfw-text-muted)] py-4">
                    No {g.division.name.toLowerCase()} repositories yet — this division starts
                    as proposals, and becomes code once a proposal finds enough support to build.
                  </p>
                ) : null}
              </div>
            )}

            {/* Proposals / Specifications content */}
            {contentTab !== "projects" && (
              <div class="contents">
                <div class="grid gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
                  {docItemsFor(did).map((p) => (
                    <DocCard
                      key={p.id}
                      item={p}
                      kind={DOC_KIND_LIST.find((k) => k.id === contentTab)}
                    />
                  ))}
                </div>

                {docItemsFor(did).length === 0 && hasActiveFilters() ? (
                  <p class="text-center text-sm text-[var(--otfw-text-muted)] py-4">
                    No {contentTab === "proposals" ? "proposals" : "specifications"} match your filters.
                  </p>
                ) : null}

                {docItemsFor(did).length === 0 && !hasActiveFilters() ? (
                  <div class="p-10 rounded-2xl border border-dashed border-[var(--otfw-border)] text-center space-y-3">
                    <h2 class="font-bold text-[var(--otfw-text)]">
                      No {g.division.name.toLowerCase()} {contentTab === "proposals" ? "proposals" : "specifications"} yet
                    </h2>
                    <p class="text-sm text-[var(--otfw-text-muted)] leading-relaxed max-w-md mx-auto">
                      {DOC_KIND_LIST.find((k) => k.id === contentTab)?.emptyBody}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
