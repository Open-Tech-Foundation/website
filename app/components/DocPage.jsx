import { Link, router, RawHtml } from "@opentf/web";
import Icon from "./Icon.jsx";
import {
  DOC_KINDS,
  DOC_STATUS,
  proposalsIn,
  specificationsIn,
} from "../data/projects.js";
import { fetchDocSource, parseDoc, renderMarkdown } from "../lib/docs.js";

// The detail page for a single proposal or specification. The route is dynamic
// (`/proposals/[division]/[id]`), so it produces no static HTML at build time —
// the component renders client-side: metadata comes instantly from the manifest,
// and the markdown body is fetched from the upstream repository on mount.
export default function DocPage() {
  const kindId = () =>
    router.pathname.startsWith("/proposals") ? "proposals" : "specifications";
  const kind = () => DOC_KINDS[kindId()];
  const doc = () => {
    const { division, id } = router.params;
    const list = kindId() === "proposals" ? proposalsIn(division) : specificationsIn(division);
    return list.find((p) => p.id === id) || null;
  };

  let bodyHtml = $state("");
  let loading = $state(true);
  let error = $state("");

  $effect(() => {
    const d = doc();
    if (!d) {
      loading = false;
      bodyHtml = "";
      return;
    }

    const controller = new AbortController();
    loading = true;
    error = "";
    bodyHtml = "";

    (async () => {
      try {
        const src = await fetchDocSource(d.href, { signal: controller.signal });
        const { body } = parseDoc(src);
        bodyHtml = renderMarkdown(body);
      } catch (e) {
        if (e.name !== "AbortError") error = e?.message || "Failed to load";
      } finally {
        if (!controller.signal.aborted) loading = false;
      }
    })();

    return () => controller.abort();
  });

  return (
    <div class="w-full">
      {() =>
        doc() ? (
          <div>
            <section class="hero-glow px-6 border-b border-[var(--otfw-border)]">
              <div class="max-w-3xl mx-auto py-16 space-y-6">
                <nav class="flex flex-wrap items-center gap-2 text-xs text-[var(--otfw-text-muted)]">
                  <Link
                    href="/"
                    class="font-semibold hover:text-[var(--accent-text)] transition-colors"
                  >
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link
                    href={`${kind().route}/${doc().division}`}
                    class="font-semibold hover:text-[var(--accent-text)] transition-colors"
                  >
                    {kind().label}
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span>{doc().division}</span>
                </nav>

                <div class="flex flex-wrap items-center gap-3">
                  <h1 class="text-3xl md:text-4xl font-black tracking-tight text-[var(--otfw-text)]">
                    {doc().title}
                  </h1>
                  <span
                    class={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${DOC_STATUS[doc().status]?.cls || ""}`}
                    title={DOC_STATUS[doc().status]?.hint}
                  >
                    {doc().status}
                  </span>
                </div>

                <p class="text-lg text-[var(--otfw-text-muted)] leading-relaxed">
                  {doc().summary}
                </p>

                <div class="flex flex-wrap items-center gap-3 text-sm">
                  <a
                    href={doc().href}
                    target="_blank"
                    rel="noreferrer noopener"
                    class="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-text)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded"
                  >
                    <Icon name="github" size={15} />
                    Source on GitHub
                  </a>

                  {doc().site ? (
                    <a
                      href={doc().site}
                      target="_blank"
                      rel="noreferrer noopener"
                      class="inline-flex items-center gap-1.5 font-semibold text-[var(--otfw-text-muted)] hover:text-[var(--accent-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--otfw-accent)] rounded transition-colors"
                    >
                      <Icon name="globe" size={15} />
                      Website
                    </a>
                  ) : null}
                </div>
              </div>
            </section>

            <section class="px-6 py-14">
              <div class="max-w-3xl mx-auto">
                {() =>
                  loading ? (
                    <div class="animate-pulse space-y-4 py-10" role="status" aria-live="polite">
                      <div class="h-4 rounded bg-[var(--otfw-border)] w-3/4"></div>
                      <div class="h-4 rounded bg-[var(--otfw-border)] w-full"></div>
                      <div class="h-4 rounded bg-[var(--otfw-border)] w-5/6"></div>
                      <div class="h-4 rounded bg-[var(--otfw-border)] w-2/3"></div>
                    </div>
                  ) : error ? (
                    <div class="p-10 rounded-2xl border border-dashed border-red-300 dark:border-red-500/30 text-center space-y-3">
                      <p class="font-bold text-red-600 dark:text-red-400">
                        Failed to load content
                      </p>
                      <p class="text-sm text-[var(--otfw-text-muted)]">{error}</p>
                      <p class="text-sm text-[var(--otfw-text-muted)]">
                        You can{" "}
                        <a
                          href={doc().href}
                          target="_blank"
                          rel="noreferrer noopener"
                          class="text-[var(--accent-text)] hover:underline"
                        >
                          read it on GitHub
                        </a>{" "}
                        instead.
                      </p>
                    </div>
                  ) : (
                    <article class="otfw-prose">
                      <RawHtml html={bodyHtml} />
                    </article>
                  )
                }
              </div>
            </section>
          </div>
        ) : (
          <section class="px-6 py-32 text-center space-y-5">
            <h1 class="text-2xl font-bold text-[var(--otfw-text)]">
              {kind().itemLabel} not found
            </h1>
            <Link
              href={kind().route}
              class="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-text)] hover:underline mt-6"
            >
              All {kind().plural.toLowerCase()}
            </Link>
          </section>
        )
      }
    </div>
  );
}