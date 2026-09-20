import { Link } from "@opentf/web";
import { Navbar } from "@opentf/web-docs";
import Icon from "./components/Icon.jsx";
import MobileNav from "./components/MobileNav.jsx";
import config from "../otfw.config.js";

// The 404 route matches with `route: null`, so `layoutChain` is empty and the root
// layout does NOT wrap this page (see @opentf/web runtime/router.js). It therefore
// carries its own chrome — navbar, background, and footer line — rather than inheriting
// them. Metadata is self-contained for the same reason (no inherited titleTemplate).
export const metadata = {
  title: { absolute: "Page not found — Open Tech Foundation" },
  description: "The page you were looking for does not exist.",
  robots: "noindex",
  links: [{ rel: "icon", href: "/img/Logo.svg" }],
};

export default function NotFoundPage() {
  return (
    <div class="min-h-screen flex flex-col bg-[var(--otfw-bg)] text-[var(--otfw-text)]">
      <a href="#main-404" class="skip-link">
        Skip to content
      </a>

      <Navbar config={config.docs} />
      <MobileNav links={config.docs.nav} />

      <main id="main-404" class="flex-1 flex items-center justify-center px-6 py-24">
        <div class="max-w-md text-center space-y-5">
          <p class="font-mono text-5xl font-black text-[var(--accent-text)]">
            404
          </p>
          <h1 class="text-2xl font-bold tracking-tight text-[var(--otfw-text)]">
            Page not found
          </h1>
          <p class="text-[var(--otfw-text-muted)] leading-relaxed">
            That page does not exist — it may have moved, or the link may be
            wrong.
          </p>
          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:opacity-90 transition-opacity"
            >
              Back home
              <Icon name="arrow" size={15} weight={2.4} />
            </Link>
            <Link
              href="/projects"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold border border-[var(--otfw-border)] text-[var(--otfw-text)] hover:border-[var(--otfw-accent)] transition-colors"
            >
              Projects
            </Link>
          </div>
        </div>
      </main>

      <footer class="site-footer">
        <div class="border-t border-[var(--footer-border)]">
          <div class="max-w-6xl mx-auto w-full px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--footer-muted)]">
            <span>© {new Date().getFullYear()} Open Tech Foundation</span>
            <span>
              Built with{" "}
              <a
                href="https://web.opentechf.org"
                target="_blank"
                rel="noreferrer noopener"
                class="font-semibold text-[var(--footer-accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--footer-accent)] rounded"
              >
                OTF Web
                <span class="sr-only">(opens in new tab)</span>
              </a>
              {" "}· No trackers, no analytics.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
