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
      <div class="w-full px-6 py-12 md:py-14">
        <div class="mb-10 space-y-3 text-center xl:pl-[16.5rem] xl:text-left">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            What we build
          </p>
          <h1 class="text-3xl md:text-4xl font-black tracking-tight text-[var(--otfw-text)]">
            Projects
          </h1>
        </div>

        <DivisionTabs groups={ALL_GROUPS} grouped={true} banner={true} />
      </div>

      <section class="w-full px-6 pb-16 xl:pl-[18rem]" aria-label="Project status guide">
        <div class="border-t border-[var(--otfw-border)] pt-8">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
            Status guide
          </p>
          <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 text-xs text-[var(--otfw-text-muted)]">
            {STATUS_ORDER.map((key) => (
              <li class="space-y-2">
                <span
                  class={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STATUS[key].cls}`}
                >
                  {STATUS[key].label}
                </span>
                <span class="block leading-snug">{STATUS[key].hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
