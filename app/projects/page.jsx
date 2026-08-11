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
          <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
            {projects.length} open projects across software and hardware — each one open
            source and developed in public. Licences vary by project and are shown on
            every card.
          </p>

          {/* Status legend — the badges on each card are meaningless without it. */}
          <ul class="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2 text-xs text-[var(--otfw-text-muted)]">
            {STATUS_ORDER.map((key) => (
              <li class="inline-flex items-center gap-2">
                <span
                  class={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STATUS[key].cls}`}
                >
                  {STATUS[key].label}
                </span>
                {STATUS[key].hint}
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
