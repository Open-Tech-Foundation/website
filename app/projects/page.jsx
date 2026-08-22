import DivisionTabs from "../components/DivisionTabs.jsx";
import {
  divisions,
  projects,
  projectsIn,
  STATUS,
  STATUS_ORDER,
} from "../data/projects.js";

export const metadata = {
  title: "Projects",
  description:
    "Open Tech Foundation projects across software and hardware — web runtimes and frameworks, data formats, developer tooling, systems software, and open hardware proposals.",
  canonical: "/projects",
};

// The index lists every project in a division, not just the featured ones.
const ALL_GROUPS = divisions.map((division) => ({
  division,
  items: projectsIn(division.id),
}));

export default function ProjectsPage() {
  return (
    <div class="w-full">
      <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
        <div class="max-w-3xl mx-auto py-20 text-center space-y-5">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            What we build
          </p>
          <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
            Projects
          </h1>

          {/* Status legend — the badges on each card are meaningless without it.
              The list is one shared grid, so every hint starts on the same edge
              while each chip keeps its natural width. */}
          <ul class="mx-auto grid w-fit gap-x-4 gap-y-2 pt-3 text-left text-xs text-[var(--otfw-text-muted)] [grid-template-columns:auto_auto]">
            {STATUS_ORDER.map((key) => (
              <li class="contents">
                <span
                  class={`inline-flex items-center justify-self-start px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STATUS[key].cls}`}
                >
                  {STATUS[key].label}
                </span>
                <span class="self-center leading-snug">{STATUS[key].hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div class="max-w-6xl mx-auto w-full px-6 py-16">
        <DivisionTabs groups={ALL_GROUPS} grouped={true} banner={true} />
      </div>

    </div>
  );
}
