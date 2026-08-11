import { Link } from "@opentf/web";
import { Navbar } from "@opentf/web-docs";
import Icon from "./components/Icon.jsx";
import MobileNav from "./components/MobileNav.jsx";
import config from "../otfw.config.js";

const GITHUB = "https://github.com/Open-Tech-Foundation";
const YEAR = new Date().getFullYear();

const FOOTER_NAV = [
  {
    title: "Foundation",
    links: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Site-wide SEO defaults — least-specific in the metadata merge, so every route
// inherits these and overrides only what it needs. `titleTemplate` brands child pages
// ("Projects — Open Tech Foundation"); the home page opts out with an absolute title.
export const metadata = {
  titleTemplate: "%s — Open Tech Foundation",
  description:
    "We are a community-driven, non-profit initiative advancing open technologies — including open source, open data, open standards, and open protocols — for the public good.",
  openGraph: {
    siteName: "Open Tech Foundation",
    type: "website",
    image: "/img/Logo.svg",
  },
  twitter: {
    card: "summary",
    image: "/img/Logo.svg",
  },
  links: [
    { rel: "icon", href: "/img/Logo.svg" },
    { rel: "apple-touch-icon", href: "/img/Logo.svg" },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Open Tech Foundation",
    url: "https://opentechf.org/",
    logo: "https://opentechf.org/img/Logo.svg",
    description:
      "We are a community-driven, non-profit initiative advancing open technologies — including open source, open data, open standards, and open protocols — for the public good.",
    slogan: "Advocacy • Collaboration • Open Innovation",
    email: "contact@opentechf.org",
    sameAs: [GITHUB],
  },
};

export default function RootLayout(props) {
  return (
    <div class="min-h-screen flex flex-col bg-[var(--otfw-bg)] text-[var(--otfw-text)]">
      <a href="#main" class="skip-link">
        Skip to content
      </a>

      <Navbar config={config.docs} />
      <MobileNav links={config.docs.nav} />

      <main id="main" class="flex-1 flex flex-col">
        {props.children}
      </main>

      <footer class="site-footer mt-auto">
        <div class="max-w-6xl mx-auto w-full px-6 py-14 grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div class="space-y-3">
            <Link href="/" class="inline-flex items-center gap-2.5">
              <img
                src="/img/Logo.svg"
                alt=""
                width="28"
                height="28"
                loading="lazy"
              />
              <span class="font-bold text-[var(--footer-text)]">
                Open Tech Foundation
              </span>
            </Link>
            <p class="text-sm text-[var(--footer-muted)] leading-relaxed max-w-xs">
              Advocacy • Collaboration • Open Innovation
            </p>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Tech Foundation on GitHub"
              class="inline-flex items-center gap-2 text-sm text-[var(--footer-muted)] hover:text-[var(--footer-accent)] transition-colors"
            >
              <Icon name="github" size={16} />
              GitHub
            </a>
          </div>

          {FOOTER_NAV.map((group) => (
            <nav class="space-y-3">
              <h2 class="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--footer-text)]">
                {group.title}
              </h2>
              <ul class="space-y-2">
                {group.links.map((l) => (
                  <li>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        class="text-sm text-[var(--footer-muted)] hover:text-[var(--footer-accent)] transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        class="text-sm text-[var(--footer-muted)] hover:text-[var(--footer-accent)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div class="border-t border-[var(--footer-border)]">
          <div class="max-w-6xl mx-auto w-full px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--footer-muted)]">
            <span>© {YEAR} Open Tech Foundation</span>
            <span>
              Built with{" "}
              <a
                href="https://web.opentechf.org"
                target="_blank"
                rel="noreferrer"
                class="font-semibold text-[var(--footer-accent)] hover:underline"
              >
                OTF Web
              </a>
              {" "}· No trackers, no analytics.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
