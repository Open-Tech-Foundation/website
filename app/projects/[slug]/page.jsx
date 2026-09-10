import { Link, router } from "@opentf/web";
import Icon from "../../components/Icon.jsx";
import LangIcon from "../../components/LangIcon.jsx";
import NpmMark from "../../components/NpmMark.jsx";
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
  const internalDependencies = () =>
    (project()?.internalDependencies || []).map(projectById).filter(Boolean);
  const externalDependencies = () => project()?.externalDependencies || [];
  const screenshots = () => project()?.screenshots || [];
  const hasDependencies = () =>
    internalDependencies().length > 0 || externalDependencies().length > 0;
  const sectionLinks = () => [
    { href: "#overview", label: "Overview" },
    { href: "#screenshots", label: "Screenshots" },
    { href: "#description", label: "Description" },
    { href: "#project-details", label: "Details" },
    { href: "#project-links", label: "Links" },
    ...(hasDependencies()
      ? [{ href: "#project-dependencies", label: "Dependencies" }]
      : []),
  ];

  return (
    <div class="w-full">
      {() =>
        project() ? (
          <div>
            <aside
              class="fixed right-6 top-28 z-20 hidden w-52 2xl:block"
              aria-label="Project sections"
            >
              <nav class="rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-4 shadow-sm">
                <p class="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--otfw-text-muted)]">
                  On this page
                </p>
                <div class="space-y-1 border-l border-[var(--otfw-border)]">
                  {sectionLinks().map((section) => (
                    <a
                      key={section.href}
                      href={section.href}
                      class="block border-l-2 border-transparent -ml-px px-3 py-2 text-sm font-medium text-[var(--otfw-text-muted)] transition-colors hover:border-[var(--otfw-accent)] hover:text-[var(--accent-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
                    >
                      {section.label}
                    </a>
                  ))}
                </div>
              </nav>
            </aside>

            <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
              <div id="overview" class="max-w-7xl mx-auto py-16 space-y-6 scroll-mt-28 2xl:mr-[17rem]">
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
              <div class="max-w-7xl mx-auto space-y-10 2xl:mr-[17rem]">
                <p id="description" class="scroll-mt-28 text-[var(--otfw-text)]/85 leading-relaxed text-lg">
                  {project().detail}
                </p>

                <dl id="project-details" class="scroll-mt-28 grid gap-px sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-[var(--otfw-border)] bg-[var(--otfw-border)]">
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

                <section id="screenshots" class="scroll-mt-28 space-y-5" aria-labelledby="screenshots-heading">
                  <div class="space-y-1.5">
                    <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                      Product preview
                    </p>
                    <h2 id="screenshots-heading" class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                      Screenshots
                    </h2>
                  </div>

                  {screenshots().length > 0 ? (
                    <div class="grid gap-5 md:grid-cols-2">
                      {screenshots().map((screenshot) => (
                        <figure key={screenshot.src} class="overflow-hidden rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)]">
                          <img
                            src={screenshot.src}
                            alt={screenshot.alt || `${project().name} screenshot`}
                            loading="lazy"
                            decoding="async"
                            class="aspect-video w-full object-cover"
                          />
                          {screenshot.caption ? (
                            <figcaption class="px-5 py-4 text-sm text-[var(--otfw-text-muted)]">
                              {screenshot.caption}
                            </figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : (
                    <div class="rounded-2xl border border-dashed border-[var(--otfw-border)] px-6 py-10 text-sm text-[var(--otfw-text-muted)]">
                      Screenshots will be published here as they become available.
                    </div>
                  )}
                </section>

                <section id="project-links" class="scroll-mt-28 space-y-5" aria-labelledby="links-heading">
                  <div class="space-y-1.5">
                    <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                      Resources
                    </p>
                    <h2 id="links-heading" class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                      Links
                    </h2>
                  </div>

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
                </section>

              </div>
            </section>

            {hasDependencies() ? (
              <section
                id="project-dependencies"
                class="border-t border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] px-6 py-14 scroll-mt-28"
              >
                <div class="max-w-7xl mx-auto space-y-6 2xl:mr-[17rem]">
                  <div class="space-y-1.5">
                    <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                      Foundation projects
                    </p>
                    <h2 class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
                      Dependencies
                    </h2>
                    <p class="text-sm text-[var(--otfw-text-muted)]">
                      This project is built with these Open Tech Foundation projects.
                    </p>
                  </div>

                  {internalDependencies().length > 0 ? (
                    <div class="space-y-4">
                      <h3 class="text-sm font-bold text-[var(--otfw-text)]">
                        Internal dependencies
                      </h3>
                      <div class="grid gap-4 sm:grid-cols-2">
                        {internalDependencies().map((dependency) => (
                          <Link
                            key={dependency.id}
                            href={`/projects/${dependency.id}`}
                            class="group flex flex-col gap-3 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-5 transition-colors hover:border-[var(--otfw-accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
                          >
                            <div class="flex items-start justify-between gap-3">
                              <h4 class="font-bold text-[var(--otfw-text)] group-hover:text-[var(--accent-text)] transition-colors">
                                {dependency.name}
                              </h4>
                              <span class="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[var(--otfw-text-muted)]">
                                {dependency.lang}
                              </span>
                            </div>
                            <p class="text-sm leading-relaxed text-[var(--otfw-text-muted)]">
                              {dependency.tagline}
                            </p>
                            <span class="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)]">
                              View project
                              <Icon name="arrow" size={14} weight={2.2} />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {externalDependencies().length > 0 ? (
                    <div class="space-y-4">
                      <h3 class="text-sm font-bold text-[var(--otfw-text)]">
                        External dependencies
                      </h3>
                      <div class="grid gap-4 sm:grid-cols-2">
                        {externalDependencies().map((dependency) => (
                          <a
                            key={dependency.href}
                            href={dependency.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            class="group flex flex-col gap-3 rounded-2xl border border-[var(--otfw-border)] bg-[var(--otfw-bg-surface)] p-5 transition-colors hover:border-[var(--otfw-accent)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)]"
                          >
                            <h4 class="font-bold text-[var(--otfw-text)] group-hover:text-[var(--accent-text)] transition-colors">
                              {dependency.name}
                            </h4>
                            {dependency.description ? (
                              <p class="text-sm leading-relaxed text-[var(--otfw-text-muted)]">
                                {dependency.description}
                              </p>
                            ) : null}
                            <span class="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)]">
                              Visit dependency
                              <Icon name="arrow" size={14} weight={2.2} />
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}
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
