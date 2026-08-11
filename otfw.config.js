import { defineDocsConfig } from "@opentf/web-docs/config";

// The org site is not a docs site — but it reuses the @opentf/web-docs shell for the
// navbar (brand, active-route underline, GitHub icon, theme toggle) and footer, so the
// foundation's site and the framework's own site share one visual language.
export default defineDocsConfig({
  // Required for production builds: canonical URLs, sitemap.xml and robots.txt.
  site: { url: "https://opentechf.org" },

  docs: {
    title: "Open Tech Foundation",
    logo: "/img/Logo.svg",
    homeUrl: "/",
    nav: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Get Involved", href: "/get-involved" },
      { label: "Contact", href: "/contact" },
    ],
  },
});
