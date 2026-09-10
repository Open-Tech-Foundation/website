import { Link } from "@opentf/web";
import Icon from "./components/Icon.jsx";
import PrincipleCard from "./components/PrincipleCard.jsx";
import DivisionTabs from "./components/DivisionTabs.jsx";
import SectionHeading from "./components/SectionHeading.jsx";
import { principles } from "./data/principles.js";
import {
  divisions,
  featuredIn,
  projects,
  projectsIn,
  proposalCount,
  specificationCount,
} from "./data/projects.js";

export const metadata = {
  // Absolute: the home page keeps its own title instead of the "%s — …" template.
  title: { absolute: "Open Tech Foundation — Advocacy, Collaboration, Open Innovation" },
  description:
    "A community-driven, non-profit initiative advancing open technologies — open source, open data, open standards — for the public good.",
  canonical: "/",
};

const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-[var(--otfw-border)] text-[var(--otfw-text)] hover:border-[var(--otfw-accent)] transition-colors";

// The hero's at-a-glance table — one metric row per kind, counted per division.
// Rows are rendered inline within <tbody>: a component rooted at <tr> cannot be
// parsed as standalone HTML, so the server markup could not be hydrated.
const GLANCE_ROWS = [
  { label: "Projects", values: divisions.map((d) => projectsIn(d.id).length) },
  { label: "Proposals", values: divisions.map((d) => proposalCount(d.id)) },
  {
    label: "Specifications",
    values: divisions.map((d) => specificationCount(d.id)),
  },
];

// Home page shows only the featured projects of each division; flipping `featured` in
// app/data/projects.js is all it takes to change what appears here.
const FEATURED_GROUPS = divisions.map((division) => ({
  division,
  items: featuredIn(division.id),
}));

export default function HomePage() {
  return (
    <div class="w-full">
      {/* Hero — copy on the left, an at-a-glance count table on the right. */}
      <section class="hero-glow px-6">
        <div class="max-w-6xl mx-auto py-20 md:py-28 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div class="space-y-7 text-center lg:text-left">
            <p class="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">
              Advocacy • Collaboration • Open Innovation
            </p>

            <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-[1.08] text-[var(--otfw-text)]">
              Open technology for the{" "}
              <span class="text-[var(--accent-text)]">public good</span>.
            </h1>

            <p class="text-lg md:text-xl text-[var(--otfw-text-muted)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We are a community-driven, non-profit initiative advancing open
              technologies — including open source, open data, and open standards.
            </p>
          </div>

          {/* At-a-glance: everything the foundation publishes, counted per division. */}
          <div class="rounded-2xl border border-[var(--otfw-border)] bg-white dark:bg-[var(--otfw-bg-elevated)] p-6 w-full max-w-sm mx-auto lg:ml-auto lg:mr-0">
            <h2 class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              At a glance
            </h2>
            <table class="w-full mt-4 text-left">
              <thead>
                <tr class="text-[10px] uppercase tracking-wider text-[var(--otfw-text-muted)]">
                  <th class="py-2 font-semibold"></th>
                  {divisions.map((d) => (
                    <th
                      key={d.id}
                      class="py-2 font-bold text-right text-[var(--otfw-text)]"
                      scope="col"
                    >
                      <span class="inline-flex items-center justify-end gap-1.5">
                        <Icon name={d.icon} size={12} weight={2} />
                        {d.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody class="text-sm">
                {GLANCE_ROWS.map((row) => (
                  <tr class="border-t border-[var(--otfw-border)]">
                    <th
                      class="py-2.5 font-semibold text-[var(--otfw-text-muted)]"
                      scope="row"
                    >
                      {row.label}
                    </th>
                    {row.values.map((v) => (
                      <td class="py-2.5 text-right">
                        <span class="text-lg font-black text-[var(--accent-text)]">
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="mt-5 flex justify-center">
              <Link
                href="/projects"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity text-sm"
              >
                Explore
                <Icon name="arrow" size={14} weight={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / principles */}
      <section class="px-6 py-20 border-t border-[var(--otfw-border)]">
        <div class="max-w-6xl mx-auto space-y-12">
          <SectionHeading title="Our mission" />

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch">
            {principles.map((p) => (
              <PrincipleCard item={p} expanded={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section class="px-6 py-20 border-t border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
        <div class="max-w-6xl mx-auto space-y-12">
          <SectionHeading eyebrow="What we build" title="Featured projects" />

          <DivisionTabs groups={FEATURED_GROUPS} banner={true} />

          <div class="flex justify-center">
            <Link href="/projects" class={BTN_GHOST}>
              View all {projects.length} projects
              <Icon name="arrow" size={16} weight={2.4} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
