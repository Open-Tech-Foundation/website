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
} from "./data/projects.js";

export const metadata = {
  // Absolute: the home page keeps its own title instead of the "%s — …" template.
  title: { absolute: "Open Tech Foundation — Advocacy, Collaboration, Open Innovation" },
  description:
    "A community-driven, non-profit initiative advancing open technologies — open source, open data, open standards, and open protocols — for the public good.",
  canonical: "/",
};

const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-[var(--otfw-border)] text-[var(--otfw-text)] hover:border-[var(--otfw-accent)] transition-colors";

// Home page shows only the featured projects of each division; flipping `featured` in
// app/data/projects.js is all it takes to change what appears here.
const FEATURED_GROUPS = divisions.map((division) => ({
  division,
  items: featuredIn(division.id),
}));

export default function HomePage() {
  return (
    <div class="w-full">
      {/* Hero */}
      <section class="hero-glow px-6">
        <div class="max-w-3xl mx-auto text-center py-24 md:py-32 space-y-7">
          <p class="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">
            Advocacy • Collaboration • Open Innovation
          </p>

          <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-[1.08] text-[var(--otfw-text)]">
            Open technology for the{" "}
            <span class="text-[var(--accent-text)]">public good</span>.
          </h1>

          <p class="text-lg md:text-xl text-[var(--otfw-text-muted)] leading-relaxed max-w-2xl mx-auto">
            We are a community-driven, non-profit initiative advancing open
            technologies — including open source, open data, open standards, and
            open protocols.
          </p>
        </div>
      </section>

      {/* Mission / principles */}
      <section class="px-6 py-20 border-t border-[var(--otfw-border)]">
        <div class="max-w-6xl mx-auto space-y-12">
          <SectionHeading title="Our mission" />

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

          <DivisionTabs groups={FEATURED_GROUPS} compact={true} banner={true} />

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
