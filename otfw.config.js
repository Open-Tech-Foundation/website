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
      { label: "Blog", href: "/blog" },
      { label: "Get Involved", href: "/get-involved" },
    ],
  },

  // Blog generator: posts live under app/blog/<slug>/page.mdx. The toolchain reads each
  // post's frontmatter into `@opentf/web-docs/posts` for the index and the banners, and
  // emits /blog/rss.xml and /blog/atom.xml at build time (which is why site.url above
  // is required).
  blog: {
    dir: "blog",
    title: "Open Tech Foundation Blog",
    description:
      "Technical writing from the Open Tech Foundation's projects, and news from the Foundation itself.",
    // Show a "Last updated" line when a post is edited after it was published.
    lastUpdated: true,
  },
});
