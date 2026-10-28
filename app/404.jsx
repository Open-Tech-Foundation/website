import { Link } from "@opentf/afw";

// The root layout wraps the 404 fallback in AFW (the router applies the layout chain
// to `notFound`), so this page is content only — no navbar, footer, or own metadata
// chrome. The layout's `titleTemplate` brands the title below.
export const metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
  robots: "noindex",
};

export default function NotFoundPage() {
  return (
    <div class="flex-1 flex items-center justify-center px-6 py-24">
      <div class="max-w-md text-center space-y-5">
        <p class="font-mono text-5xl font-black text-[var(--accent-text)]">404</p>
        <h1 class="text-2xl font-bold tracking-tight text-[var(--afw-text)]">
          Page not found
        </h1>
        <p class="text-[var(--afw-text-muted)] leading-relaxed">
          That page does not exist — it may have moved, or the link may be wrong.
        </p>
        <div class="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity"
          >
            Back home
          </Link>
          <Link
            href="/projects"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-[var(--afw-border)] text-[var(--afw-text)] hover:border-[var(--afw-accent)] transition-colors"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
