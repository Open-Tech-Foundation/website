import { Link, router } from "@opentf/web";
import Icon from "../../components/Icon.jsx";
import LangIcon from "../../components/LangIcon.jsx";
import NpmMark from "../../components/NpmMark.jsx";
import ProjectBanner from "../../components/ProjectBanner.jsx";
import {
  categoryById,
  divisions,
  projectById,
  projects,
  STATUS,
} from "../../data/projects.js";

// One page per project at /projects/<id>. `getStaticPaths` enumerates them so
// `otfw build --ssg` pre-renders each with its own <head>; without it a dynamic route
// produces no static HTML.
export function getStaticPaths() {
  return projects.map((p) => ({ params: { slug: p.id } }));
}

export function generateMetadata({ params }) {
  const p = projectById(params.slug);
  if (!p) return { title: "Project not found", robots: "noindex" };

  return {
    title: p.name,
    description: p.tagline,
    canonical: `/projects/${p.id}`,
    openGraph: { title: p.name, description: p.tagline },
  };
}

const META_LINK =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-[var(--otfw-border)] text-[var(--otfw-text)] hover:border-[var(--otfw-accent)] transition-colors";

export default function ProjectPage() {
  // Read through a function rather than a const: navigating between two project pages
  // re-uses this same component, so the lookup has to re-run when the param changes.
  const project = () => projectById(router.params.slug);
  const category = () => categoryById[project()?.category];
  const division = () => divisions.find((d) => d.id === project()?.division);

  return (
    <div class="w-full">
      {() =>
        project() ? (
          <div>
            <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
              <div class="max-w-3xl mx-auto py-16 space-y-6">
                <nav class="flex flex-wrap items-center gap-2 text-xs text-[var(--otfw-text-muted)]">
                  <Link
                    href="/projects"
                    class="font-semibold hover:text-[var(--accent-text)] transition-colors"
                  >
                    Projects
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span>{division()?.name}</span>
                  <span aria-hidden="true">/</span>
                  <span>{category()?.name}</span>
                </nav>

                <div class="flex flex-wrap items-center gap-3">
                  <h1 class="text-4xl md:text-5xl font-black tracking-tight text-[var(--otfw-text)]">
                    {project().name}
                  </h1>
                  <span
                    class={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${STATUS[project().status].cls}`}
                  >
                    {STATUS[project().status].label}
                  </span>
                </div>

                <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
                  {project().tagline}
                </p>
              </div>
            </section>

            <section class="px-6 py-14">
              <div class="max-w-3xl mx-auto space-y-10">
                <div class="rounded-2xl border border-[var(--otfw-border)] overflow-hidden">
                  <ProjectBanner item={project()} eager={true} />
                </div>

                <p class="text-[var(--otfw-text)]/85 leading-relaxed text-lg">
                  {project().detail}
                </p>

                <dl class="grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[var(--otfw-border)] bg-[var(--otfw-border)]">
                  <div class="bg-[var(--otfw-bg-surface)] p-5">
                    <dt class="text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]">
                      Status
                    </dt>
                    <dd class="mt-1 font-semibold text-[var(--otfw-text)]">
                      {STATUS[project().status].label}
                    </dd>
                  </div>
                  <div class="bg-[var(--otfw-bg-surface)] p-5">
                    <dt class="text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]">
                      Category
                    </dt>
                    <dd class="mt-1 font-semibold text-[var(--otfw-text)]">
                      {category()?.name}
                    </dd>
                  </div>
                  <div class="bg-[var(--otfw-bg-surface)] p-5">
                    <dt class="text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]">
                      Language
                    </dt>
                    <dd class="mt-1 font-semibold text-[var(--otfw-text)] inline-flex items-center gap-2">
                      <LangIcon lang={project().lang} size={16} />
                      {project().lang || "—"}
                    </dd>
                  </div>
                  <div class="bg-[var(--otfw-bg-surface)] p-5">
                    <dt class="text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]">
                      Licence
                    </dt>
                    <dd class="mt-1 font-semibold text-[var(--otfw-text)]">
                      {project().license || "—"}
                    </dd>
                  </div>
                </dl>

                <div class="flex flex-wrap gap-3">
                  <a
                    href={project().href}
                    target="_blank"
                    rel="noreferrer noopener"
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
                  >
                    <Icon name="github" size={16} />
                    Source
                  </a>

                  {project().site ? (
                    <a
                      href={project().site}
                      target="_blank"
                      rel="noreferrer noopener"
                      class={`${META_LINK} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]`}
                    >
                      <Icon name="globe" size={16} />
                      Website
                    </a>
                  ) : null}

                  {project().npm ? (
                    <a
                      href={`https://www.npmjs.com/package/${project().npm}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      class={`${META_LINK} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]`}
                    >
                      <NpmMark size={16} />
                      <span class="font-mono text-sm">{project().npm}</span>
                    </a>
                  ) : null}
                </div>

                <div class="pt-4 border-t border-[var(--otfw-border)]">
                  <Link
                    href="/projects"
                    class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-text)] hover:underline"
                  >
                    <span aria-hidden="true">←</span>
                    All projects
                  </Link>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <section class="px-6 py-32 text-center space-y-5">
            <h1 class="text-2xl font-bold text-[var(--otfw-text)]">
              Project not found
            </h1>
            <Link
              href="/projects"
              class="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-text)] hover:underline"
            >
              All projects
            </Link>
          </section>
        )
      }
    </div>
  );
}
